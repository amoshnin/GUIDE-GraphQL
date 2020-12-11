import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { resolvers, typeDefs } from "./store"

const link = new HttpLink({ uri: "http://localhost:3232/" })
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs,
})

export default client
