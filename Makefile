default: help

##	make help - display the help
##
help:
	@grep "^##.*" ./Makefile

##	setup - install packages
##
setup:
	pnpm install

## run - attempt run webpack-dev-server
##
run:
	npm run dev

##	tests - run all tests
##	test NAME=name - run single test, searches thru 'describe' suite
##	To run just one test: mocha ./src/**/*.tests.js --grep FileName
##
tests:
	(export NODE_PATH=./; find ./src -name '*.tests.js' | xargs mocha --timeout 10000 $(ARGS))

test:
		(export NODE_PATH=./; find ./src -name '*.tests.js' | xargs mocha --timeout 10000 --grep=$(NAME))
