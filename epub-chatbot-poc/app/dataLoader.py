import json
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility
from sentence_transformers import SentenceTransformer

class MilvusEpubLoader:
    def __init__(
        self,
        host="127.0.0.1",
        port="19530",
        collection_name="Epub",
        embedding_model="all-MiniLM-L6-v2",
        embedding_dim=384,
        json_file="golden.json"
    ):
        self.host = host
        self.port = port
        self.collection_name = collection_name
        self.embedding_dim = embedding_dim
        self.json_file = json_file
        self.embedding_model = embedding_model
        self.embedder = None
        self.collection = None

    def connect(self):
        connections.connect("default", host=self.host, port=self.port)
        print("Connected to Milvus")

    def create_collection_if_not_exists(self):
        if self.collection_name in utility.list_collections():
            print(f"Collection '{self.collection_name}' already exists.")
            self.collection = Collection(self.collection_name)
            return 
      
        chapter_number = FieldSchema(name="chapter_number", dtype=DataType.INT64, is_primary=True)
        chapter_name = FieldSchema(name="chapter_name", dtype=DataType.VARCHAR, max_length=100)
        page_number = FieldSchema(name="page_number", dtype=DataType.INT64)
        vector_field = FieldSchema(name="my_vector", dtype=DataType.FLOAT_VECTOR, dim=self.embedding_dim)
        content = FieldSchema(name="content", dtype=DataType.VARCHAR, max_length=10000)
        fields = [
            chapter_number, chapter_name, page_number, vector_field, content
        ]
        schema = CollectionSchema(fields, description="story epub collection")
        self.collection = Collection(name=self.collection_name, schema=schema)
        print(f"Collection '{self.collection_name}' created.")

    def load_json_data(self):
        with open(self.json_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        print(f"Loaded {len(data)} records from {self.json_file}")
        return data

    def setup_embedder(self):
        if self.embedder is None:
            self.embedder = SentenceTransformer(self.embedding_model)
            print(f"Loaded embedding model '{self.embedding_model}'")

    def insert_documents(self, data):
        chapter_numbers = [item["chapter_number"] for item in data]
        chapter_names = [item["chapter_name"] for item in data]
        page_numbers = [item["page_number"] for item in data]
        contents = [item["content"] for item in data]
        self.setup_embedder()
        print("Generating embeddings from content...")
        vectors = self.embedder.encode(contents, convert_to_numpy=True).tolist()
        print(f"Embeddings shape: {len(vectors)}x{len(vectors[0]) if vectors else 0}")

        entities = [
            chapter_numbers,
            chapter_names,
            page_numbers,
            vectors,
            contents
        ]
        insert_result = self.collection.insert(entities)
        print(f"Inserted {len(data)} records into '{self.collection_name}'.")

    def run(self):
        self.connect()
        self.create_collection_if_not_exists()
        data = self.load_json_data()
        self.insert_documents(data)


if __name__ == "__main__":
    loader = MilvusEpubLoader(
        host="127.0.0.1",
        port="19530",
        collection_name="Epub",             
        embedding_model="all-MiniLM-L6-v2",
        embedding_dim=384,
        json_file="golden.json"
    )
    loader.run()

#golden json file(the epub processed data) format 
