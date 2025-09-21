from concurrent import futures
import logging

import grpc
import lang_extract_pb2
import lang_extract_pb2_grpc


class Greeter(lang_extract_pb2_grpc.LangExtractServicer):

    def SayHello(self, request, context):
        return lang_extract_pb2.HelloReply(message=f"Hello, {request.name}!")

    def SayHelloAgain(self, request, context):
        return lang_extract_pb2.HelloReply(message=f"Hello again, {request.name}!")


def serve():
    port = "50051"
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    lang_extract_pb2_grpc.add_LangExtractServicer_to_server(Greeter(), server)
    server.add_insecure_port("[::]:" + port)
    server.start()
    print("Server started, listening on " + port)
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    serve()
