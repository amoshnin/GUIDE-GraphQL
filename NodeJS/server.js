// PLUGINS IMPORTS //
const { ApolloServer, gql } = require("apollo-server")

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    createdAt: Int!
  }

  type Settings {
    user: User!
    theme: String!
  }

  input SettingsInput {
    user: ID!
    theme: String!
  }

  type Query {
    me: User!
    settings(user: ID!): Settings!
  }

  type Mutation {
    settings(input: SettingsInput!): Settings!
  }
`

const resolvers = {
  Query: {
    me() {
      return {
        id: "12212",
        username: "coder12",
        createdAt: 23124231,
      }
    },

    settings(_, { user }) {
      return {
        user,
        theme: "Light",
      }
    },
  },

  Mutation: {
    settings(_, { input }) {
      return input
    },
  },

  Settings: {
    user(settings) {
      return {
        id: "12212",
        username: "coder12",
        createdAt: 23124231,
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => console.log(`Started server on ${url}`))
