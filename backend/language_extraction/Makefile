PROTO_DIR := ../protos
LIB_DIR := ./lib

run:
	uv run python -m \
		grpc_tools.protoc -I$(PROTO_DIR) \
		--python_out=$(LIB_DIR)/ \
		--pyi_out=$(LIB_DIR)/ \
		--grpc_python_out=$(LIB_DIR)/ \
		$(PROTO_DIR)/lang_extract.proto
	uv run main.py

# gen:
# 	uv run python -m grpc_tools.protoc -I./protos --python_out=./server/ --pyi_out=./server/ --grpc_python_out=./server/ ./protos/lang_extract.proto

# dev:
# 	make gen
# 	make run
