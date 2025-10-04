from concurrent import futures

import grpc
import lib.lang_extract_pb2 as lang_extract_pb2
import lib.lang_extract_pb2_grpc as lang_extract_pb2_grpc

import extract_textual_components


class LangExtractService(lang_extract_pb2_grpc.LangExtractServiceServicer):
    def ExtractedData(self, text, context):
        result = extract_textual_components.extract_details_from_text(text)

        print(result)
        return result


def serve():
    port = "50051"
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    lang_extract_pb2_grpc.add_LangExtractServiceServicer_to_server(LangExtractService(), server)
    server.add_insecure_port("[::]:" + port)
    server.start()
    print("GRPC SERVER STARTED")
    server.wait_for_termination()
