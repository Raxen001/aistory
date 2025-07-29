from typing import List
from pydantic import BaseModel, Field
from langchain_huggingface import HuggingFaceEmbeddings
from pymilvus import MilvusClient, DataType, FieldSchema, Collection, CollectionSchema

class DocSchema(BaseModel):
    chapter_number: int = Field(..., description="Chapter number")
    chapter_name: str = Field(..., description="Name of the chapter")
    page_number: int = Field(..., description="Page number")
    content: str = Field(..., description="Content as text")


class DataLoader:
    def __init__(
        self,
        uri: str = "http://localhost:19530",
        token: str = "root:Milvus",
        db_name: str = "my_database_1",
        collection_name: str = "my_collection_1",
        embedding_model: str = "sentence-transformers/all-mpnet-base-v2",
        embedding_device: str = 'cpu',
        embedding_normalize: bool = False,
        vector_dim: int = 1024
    ):
        # HuggingFace embedding model
        self.hf = HuggingFaceEmbeddings(
            model_name=embedding_model,
            model_kwargs={'device': embedding_device},
            encode_kwargs={'normalize_embeddings': embedding_normalize}
        )
        # Milvus client
        self.client = MilvusClient(uri=uri, token=token)
        self.db_name = db_name
        self.collection_name = collection_name
        self.vector_dim = vector_dim

        self.client.create_database(db_name=db_name)
        self.client.using_database(db_name)
        self._create_collection_if_not_exists()

    def _create_collection_if_not_exists(self):
        vector_field = FieldSchema(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=self.vector_dim)
        page_number = FieldSchema(field_name="page_number", datatype=DataType.INT64)
        chapter_number = FieldSchema(field_name="chapter_number", datatype=DataType.INT64)
        chapter_name = FieldSchema(field_name="chapter_name", datatype=DataType.VARCHAR, max_length=100)
        content = FieldSchema(field_name="content", datatype=DataType.VARCHAR, max_length=10000)
        schema = CollectionSchema(fields=[chapter_number, chapter_name, page_number, vector_field, content])
        self.coll = Collection(name=self.collection_name, schema=schema)

    def load_documents(self, docs: List[DocSchema]):
        """
        Insert a batch of docs (list of DocSchema) into Milvus after embedding content.
        """
        docs_list = [doc.dict() for doc in docs]
        contents = [doc["content"] for doc in docs_list]
        embeddings = self.hf.embed_documents(contents)
        to_insert = {
            'chapter_number': [doc["chapter_number"] for doc in docs_list],
            'chapter_name':   [doc["chapter_name"] for doc in docs_list],
            'page_number':    [doc["page_number"] for doc in docs_list],
            'my_vector':      embeddings,
            'content':        contents
        }
        self.coll.insert(to_insert)
        self.coll.flush() 

# --- Usage Example ---
# manager = DataLoader()
# docs = [
#     DocSchema(chapter_number=1, chapter_name="Intro", page_number=1, content="Text of the first chapter."),
#     DocSchema(chapter_number=2, chapter_name="Next", page_number=2, content="Another chapter's text!")
# ]

# manager.load_documents(docs)
