// PLUGINS IMPORTS //
const { ApolloServer } = require("apollo-server")

// COMPONENTS IMPORTS //
const typeDefs = require("./graphql/typedefs")
const resolvers = require("./graphql/resolvers")

const { context } = require("./utils/context")
const {
  AuthenticationDirective,
  AuthorizationDirective,
  FormatDateDirective,
} = require("./graphql/directives/index")

/////////////////////////////////////////////////////////////////////////////

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    const res = await context(req, connection)
    return res
  },
  schemaDirectives: {
    formatDate: FormatDateDirective,
    authenticated: AuthenticationDirective,
    authorized: AuthorizationDirective,
  },
})

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
