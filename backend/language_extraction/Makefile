PROTO_DIR := ../protos
LIB_DIR := ./lib

# https://stackoverflow.com/questions/62818183/protobuf-grpc-relative-import-path-discrepancy-in-python
run:
	uv run python -m \
		grpc_tools.protoc -I$(PROTO_DIR) \
		--python_out=$(LIB_DIR)/ \
		--pyi_out=$(LIB_DIR)/ \
		--grpc_python_out=$(LIB_DIR)/ \
		$(PROTO_DIR)/lang_extract.proto
	# have to do a stupid hack. till if figure out a way to do this properly
	sed -i 's/^import lang_extract_pb2/import lib.lang_extract_pb2/' ./lib/lang_extract_pb2_grpc.py
	uv run main.py

# gen:
# 	uv run python -m grpc_tools.protoc -I./protos --python_out=./server/ --pyi_out=./server/ --grpc_python_out=./server/ ./protos/lang_extract.proto

# dev:
# 	make gen
# 	make run
