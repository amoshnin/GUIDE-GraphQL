// PLUGINS IMPORTS //
const { ApolloServer } = require("apollo-server")

// COMPONENTS IMPORTS //
const typeDefs = require("./graphql/typedefs")
const resolvers = require("./graphql/resolvers")
const db = require("./db")

const { createToken, getUserFromToken } = require("./utils/auth")

/////////////////////////////////////////////////////////////////////////////

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    const token = req.headers.authorization
    const user = getUserFromToken(token)
    return { ...db, user, createToken }
  },
})

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
