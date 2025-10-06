from concurrent import futures
import extract_textual_components
import grpc
from google.protobuf.json_format import ParseDict
import lib.lang_extract_pb2 as lang_extract_pb2
import lib.lang_extract_pb2_grpc as lang_extract_pb2_grpc


class LangExtractService(lang_extract_pb2_grpc.LangExtractServiceServicer):
    def ExtractedData(self, request, context):
        # TODO: threadpool causing the return to be a generator have to wait for
        # the result to get populated
        result = extract_textual_components.extract_details_from_text(request.text)
        result = ParseDict(result, lang_extract_pb2.ExtractedDataResponse())
        result = lang_extract_pb2.ExtractedDataResponse(
            characters=result.characters,
            setting=result.setting,
            time=result.time,
            summary=result.summary,
        )

        return result


def serve():
    port = "50051"
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=2))
    lang_extract_pb2_grpc.add_LangExtractServiceServicer_to_server(
        LangExtractService(), server
    )
    server.add_insecure_port("[::]:" + port)
    server.start()
    print("GRPC SERVER STARTED")
    server.wait_for_termination()
