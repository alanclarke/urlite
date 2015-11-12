.PHONY: test coverage

BIN = node_modules/.bin

test:
	$(BIN)/standard
	$(BIN)/karma start --single-run
	$(BIN)/mocha test/test*
	$(BIN)/istanbul cover _mocha
