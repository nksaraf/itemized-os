
build-db: ./db/src
	cd db && wasm-pack build --target web --out-dir ../system/os

graphql-api: build-db
	deno run -A --watch system/main.ts