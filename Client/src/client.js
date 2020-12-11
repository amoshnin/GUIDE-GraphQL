import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const link = new HttpLink({ uri: "http://localhost:3232/" })
const cache = new InMemoryCache()

const client = new ApolloClient({
  resolvers: [],
  link,
  cache,
})

export default client
