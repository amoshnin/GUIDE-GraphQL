import { gql } from "@apollo/client"

const PETS_FIELDS = gql`
  fragment PetsFields on Pet {
    id
    type
    name
    img
    vaccinated @client
    owner {
      id
      age @client
    }
  }
`

export const QUERY_GET_PETS = gql`
  query pets {
    pets(input: { type: DOG }) {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`

export const MUTATION_ADD_PET = gql`
  mutation addPet($input: NewPetInput!) {
    addPet(input: $input) {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`
