// PLUGINS IMPORTS //
const { ApolloServer, gql, PubSub } = require("apollo-server")

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const pubsub = new PubSub()
const NEW_ITEM = "NEW_ITEM"
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

  type Item {
    task: String!
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
    createItem(task: String!): Item!
  }

  type Subscription {
    newItem: Item!
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

    createItem(_, { task }) {
      const item = { task }
      pubsub.publish(NEW_ITEM, { newItem: item })
      return item
    },
  },

  Subscription: {
    newItem: {
      subscribe: () => pubsub.asyncIterator(NEW_ITEM),
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
  context({ connection }) {
    if (connection) {
      return { ...connection.context }
    }
  },
  subscriptions: {
    onConnect(params) {},
  },
})

server.listen().then(({ url }) => console.log(`Started server on ${url}`))
