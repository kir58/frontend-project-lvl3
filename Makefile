install:
	npm install

develop:
	npx webpack-dev-server

build:
	npm run-script build

lint:
	npx eslint .