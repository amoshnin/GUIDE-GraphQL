import { gql } from "@apollo/client"

export const typeDefs = gql`
  extend type User {
    age: Int
  }

  extend type Pet {
    vaccinated: Boolean!
  }
`

export const resolvers = {
  User: {
    age(user: any, args: any, ctx: any, info: any) {
      return 35
    },
  },

  Pet: {
    vaccinated() {
      return true
    },
  },
}
