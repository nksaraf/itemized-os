
build-db: ./system/db/src
	cd system/db && wasm-pack build --target web

graphql-api: build-db
	deno run -A --watch system/graphql_api.ts