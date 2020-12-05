// PLUGINS IMPORTS //
const {
  ApolloServer,
  gql,
  PubSub,
  SchemaDirectiveVisitor,
} = require("apollo-server")
const { GraphQLString, defaultFieldResolver } = require("graphql")

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const pubsub = new PubSub()
const NEW_ITEM = "NEW_ITEM"

class LogDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const oldResolver = field.resolve || defaultFieldResolver

    field.args.push({
      type: GraphQLString,
      name: "message",
    })
    field.resolve = (root, { message, ...rest }, ctx, info) => {
      const { message: schemaMessage } = this.args

      console.log("hello", message || schemaMessage)
      return oldResolver.call(this, root, rest, ctx, info)
    }
  }
}

const typeDefs = gql`
  directive @log(message: String = "my message") on FIELD_DEFINITION

  type User {
    id: ID! @log(message: "id here")
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
  schemaDirectives: {
    log: LogDirective,
  },
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
