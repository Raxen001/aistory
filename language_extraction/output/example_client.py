from __future__ import print_function

import logging

import grpc
import lang_extract_pb2
import lang_extract_pb2_grpc


def run():
    print("Will try to greet world ...")
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = lang_extract_pb2_grpc.LangExtractStub(channel)
        print(stub)
        response = stub.SayHello(lang_extract_pb2.HelloRequest(name="you"))
    print("Greeter client received: " + response.message)


if __name__ == "__main__":
    logging.basicConfig()
    run()
