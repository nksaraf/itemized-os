import { render } from "react-dom";
import { App } from "./app";
import { VechaiProvider, defaultTheme } from "@vechaiui/react";
import "./index.css";
import "regenerator-runtime/runtime";
import React from "react";
import { createClient, Provider } from "urql";
import { QueryClient, QueryClientProvider } from "react-query";
import { GQLClient } from "./graphql-tag/core";
import type { IPFS } from "ipfs-core";

declare global {
  var Ipfs: {
    create: () => Promise<IPFS>;
  };
}

const ipfs = await Ipfs.create();

for await (var entry of ipfs.files.read(
  "/ipfs/QmfDTynGSaBqHQDt1uVvDpBksjDfkf8PpGLaVdovRouaoa"
)) {
  console.log(new TextDecoder("utf-8").decode(entry));
}

// import * as IPFS from "ipfs-core";

// const ipfs = await IPFS.create();
// const { cid } = await ipfs.add("Hello world");
// console.info(cid);
// import OrbitDB from "orbit-db";

const regularContent = { test: "123" };
const cid1 = await ipfs.dag.put(regularContent);
const linkedContent = { link: cid1 };
const cid2 = await ipfs.dag.put(linkedContent);

const atPath = await ipfs.dag.get(cid2, { path: "/link" });
console.log(atPath);
console.log(cid2.toString());

import { importer, UserImporterOptions } from "ipfs-unixfs-importer";
import { MemoryBlockStore } from "ipfs-car/blockstore/memory";

async function makeUnixFsFile(source: { path: string; content: Uint8Array }[]) {
  const blockstore = new MemoryBlockStore();
  // taken from https://github.com/web3-storage/ipfs-car/blob/main/src/pack/constants.ts
  // but with wrapWithDirectory overriden to false
  const unixFsOptions: UserImporterOptions = {
    cidVersion: 1,
    chunker: "fixed",
    maxChunkSize: 262144,
    hasher: sha256,
    rawLeaves: true,
    wrapWithDirectory: false,
    maxChildrenPerNode: 174,
  };
  const importStream = await importer(source, blockstore, unixFsOptions);
  let root = null;
  for await (const entry of importStream) {
    root = entry;
  }
  const blocks = [];
  for await (const block of blockstore.blocks()) {
    console.log(block);
    blocks.push(block);
  }
  await blockstore.close();
  return { root, blocks };
}

// console.log(await ipfs.object.get(cid1));

// const orbitdb = await OrbitDB.createInstance(ipfs);
// const db = await orbitdb.log("hello");
import { Web3Storage } from "web3.storage";
import { CarReader } from "@ipld/car";
import { encode } from "multiformats/block";
import * as cbor from "@ipld/dag-cbor";
import { sha256 } from "multiformats/hashes/sha2";
import { CID } from "multiformats";

async function encodeCborBlock(value: object) {
  return encode({ value, codec: cbor, hasher: sha256 });
}

async function makeCar(rootCID: CID, ipldBlocks: any[]) {
  return new CarReader(1, [rootCID], ipldBlocks);
}

const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIyRmU4OTJkQzU4MmZGNTMzMzczYUM3YkM1NzA2YjhjNTAxMmE0YjIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDUzNTQyOTg2NTAsIm5hbWUiOiJ0ZXN0LTEifQ.nKW8_QSTM5E7dyXYdmHCQFx63DBiJxSPbQqL-kxOR90",
});

async function simpleCborExample() {
  // encode the value into an IPLD block and store with Web3.Storage
  const block = await encodeCborBlock({ hello: "world" });
  const car = await makeCar(block.cid, [block]);

  // upload to Web3.Storage using putCar

  console.log(`🤖 Storing simple CBOR object...`);
  const cid = await client.putCar(car);
  console.log(`🎉 Done storing simple CBOR object. CID: ${cid}`);
  console.log(`💡 If you have ipfs installed, try: ipfs dag get ${cid}\n`);
}

async function cborLinkToFileExample() {
  const source = [
    {
      path: "example.txt",
      content: new TextEncoder().encode("Some plain text, encoded to UTF-8"),
    },
  ];
  const { root, blocks } = await makeUnixFsFile(source);
  const cborBlock = await encodeCborBlock({
    description: "A CBOR object that references a UnixFS file object by CID",
    file: root!.cid,
  });

  blocks.push(cborBlock);
  const car = await makeCar(cborBlock.cid, blocks);

  console.log(`🤖 Storing a CBOR object that links to a UnixFS file by CID...`);
  const cid = await client.putCar(car);
  console.log(
    "🎉 Stored dag-cbor object that links to a unixfs file. Root CID: ",
    cid
  );
  console.log(`💡 If you have ipfs installed, try: ipfs dag get ${cid}`);
  console.log(
    `💾 You can view the linked file with ipfs: ipfs cat ${cid}/file`
  );
  console.log(
    "🔗 View linked file via IPFS gateway: ",
    `https://${cid}.ipfs.dweb.link/file`
  );
}

await simpleCborExample();
await cborLinkToFileExample();

// const client = createClient({
//   url: "http://localhost:9999/graphql",
// });

render(
  <QueryClientProvider
    client={
      new GQLClient({
        url: "https://alexandria.deno.dev/graphql",
      })
    }
  >
    <VechaiProvider
      theme={{
        ...defaultTheme,
        cursor: "pointer",
      }}
    >
      <App />
    </VechaiProvider>
  </QueryClientProvider>,
  document.getElementById("app")!
);
