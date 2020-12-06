// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
const { createToken } = require("../../utils/context")

/////////////////////////////////////////////////////////////////////////////

const NEW_POST = "NEW_POST"
module.exports = {
  Query: {
    me: (_, __, { user }) => {
      return user
    },

    posts: (_, __, { user, models }) => {
      return models.Post.findMany({ author: user.id })
    },

    post: (_, { id }, { user, models }) => {
      return models.Post.findOne({ id, author: user.id })
    },

    userSettings: (_, __, { user, models }) => {
      return models.Settings.findOne({ user: user.id })
    },

    // public resolver
    feed(_, __, { models }) {
      return models.Post.findMany()
    },
  },
  Mutation: {
    updateSettings: (_, { input }, { user, models }) => {
      return models.Settings.updateOne({ user: user.id }, input)
    },

    createPost: (_, { input }, { user, models, pubsub }) => {
      const post = models.Post.createOne({ ...input, author: user.id })
      pubsub.publish(NEW_POST, { newPost: post })
      return post
    },

    updateMe: (_, { input }, { user, models }) => {
      return models.User.updateOne({ id: user.id }, input)
    },
    // admin role
    invite: (_, { input }, { user }) => {
      console.log(input)
      return {
        from: user.id,
        role: input.role,
        createdAt: Date.now(),
        email: input.email,
      }
    },

    signup(_, { input }, { models }) {
      const existing = models.User.findOne({ email: input.email })

      if (existing) {
        throw new Error("User already exists")
      }
      const user = models.User.createOne({
        ...input,
        verified: false,
        avatar: "http",
      })
      const token = createToken(user)
      return { token, user }
    },
    signin(_, { input }, { models }) {
      const user = models.User.findOne(input)

      if (!user) {
        throw new Error("nope")
      }

      const token = createToken(user)
      return { token, user }
    },
  },

  Subscription: {
    newPost: {
      subscribe: (_, s, { pubsub }) => {
        return pubsub.asyncIterator([NEW_POST])
      },
    },
  },

  UserType: {
    posts(root, _, { user, models }) {
      if (root.id !== user.id) {
        throw new Error("nope")
      }

      return models.Post.findMany({ author: root.id })
    },
    settings(root, __, { user, models }) {
      return models.Settings.findOne({ id: root.settings, user: user.id })
    },
  },
  SettingsType: {
    user(settings, _, { user, models }) {
      return models.Settings.findOne({ id: settings.id, user: user.id })
    },
  },
  PostType: {
    author(post, _, { models }) {
      return models.User.findOne({ id: post.author })
    },
  },
}
