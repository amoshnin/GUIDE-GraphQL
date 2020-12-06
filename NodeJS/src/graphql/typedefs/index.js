// PLUGINS IMPORTS //
const { gql } = require("apollo-server")

// COMPONENTS IMPORTS //

/////////////////////////////////////////////////////////////////////////////

module.exports = gql`
  directive @authenticated on FIELD_DEFINITION
  directive @authorized(role: RoleEnum! = ADMIN) on FIELD_DEFINITION

  directive @formatDate(format: String = "dd MMMM yyyy") on FIELD_DEFINITION

  enum ThemeEnum {
    DARK
    LIGHT
  }

  enum RoleEnum {
    ADMIN
    MEMBER
    GUEST
  }

  type UserType {
    id: ID!
    email: String!
    avatar: String!
    verified: Boolean!
    createdAt: String!
    posts: [PostType]!
    role: RoleEnum!
    settings: SettingsType!
  }

  type AuthUserType {
    token: String!
    user: UserType!
  }

  type PostType {
    id: ID!
    message: String!
    author: UserType!
    createdAt: String! @formatDate
    likes: Int!
    views: Int!
  }

  type SettingsType {
    id: ID!
    user: UserType!
    theme: ThemeEnum!
    emailNotifications: Boolean!
    pushNotifications: Boolean!
  }

  type InviteType {
    email: String!
    from: UserType!
    createdAt: String!
    role: RoleEnum!
  }

  input NewPostInput {
    message: String!
  }

  input UpdateSettingsInput {
    theme: ThemeEnum
    emailNotifications: Boolean
    pushNotifications: Boolean
  }

  input UpdateUserInput {
    email: String
    avatar: String
    verified: Boolean
  }

  input InviteInput {
    email: String!
    role: RoleEnum!
  }

  input SignupInput {
    email: String!
    password: String!
    role: RoleEnum!
  }

  input SigninInput {
    email: String!
    password: String!
  }

  type Query {
    me: UserType! @authenticated
    posts: [PostType]!
    post(id: ID!): PostType!
    userSettings: SettingsType!
    feed: [PostType]!
  }

  type Mutation {
    updateSettings(input: UpdateSettingsInput!): SettingsType!
    createPost(input: NewPostInput!): PostType!
    updateMe(input: UpdateUserInput!): UserType
    invite(input: InviteInput!): InviteType!
      @authenticated
      @authorized(role: ADMIN)
    signup(input: SignupInput!): AuthUserType!
    signin(input: SigninInput!): AuthUserType!
  }

  type Subscription {
    newPost: PostType!
  }
`
