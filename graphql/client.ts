import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient(process.env.HYGRAPH_ENDPOINT || "", {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
  },
})

export default client
