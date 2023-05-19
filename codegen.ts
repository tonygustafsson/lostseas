import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clh026fol31ln01ue8jt1f9t2/master",
  documents: ["./graphql"],
  generates: {
    "graphql/codegen/": {
      preset: "client",
      plugins: [],
    },
  },
}

export default config
