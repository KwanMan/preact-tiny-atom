BIN = ./node_modules/.bin

.PHONY: build

build:
	$(BIN)/buble -i src/ -o dist/ --objectAssign
