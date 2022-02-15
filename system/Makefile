
build-db: ./db/src
	cd db && wasm-pack build --target web

graphql-api: build-db
	deno run -A --watch graphql_api.ts