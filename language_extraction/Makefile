run:
	uv run python -m grpc_tools.protoc -I./protos --python_out=./server/ --pyi_out=./server/ --grpc_python_out=./server/ ./protos/lang_extract.proto
	uv run main.py

# gen:
# 	uv run python -m grpc_tools.protoc -I./protos --python_out=./server/ --pyi_out=./server/ --grpc_python_out=./server/ ./protos/lang_extract.proto

# dev:
# 	make gen
# 	make run
