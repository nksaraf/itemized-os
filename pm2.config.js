const dotenv = require("dotenv");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

module.exports = {
  apps: [
    {
      name: "Remix",
      script: "yarn vite --port 7777",
      ignore_watch: ["."],
      env: {
        ...result.parsed,
        NODE_ENV: "development",
      },
    },
    // {
    //   name: "Express",
    //   cwd: "./system",
    //   script: "make graphql-api",
    //   watch: ["./system/db/src", "./system/graphql_api.ts"],
    //   env: {
    //     ...result.parsed,
    //     NODE_ENV: "development",
    //   },
    // },
  ],
};
