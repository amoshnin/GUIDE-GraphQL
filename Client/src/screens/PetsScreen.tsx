// PLUGINS IMPORTS //
import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"

// COMPONENTS IMPORTS //
import PetBox from "../components/PetBox"
import NewPet from "../components/NewPet"
import Loader from "../components/Loader"

// EXTRA IMPORTS //
import { QUERY_GET_PETS, MUTATION_ADD_PET } from "./graphql"
import { IPet } from "typings/PetTypes"

/////////////////////////////////////////////////////////////////////////////

const PetsScreen = () => {
  const { data, loading, error } = useQuery(QUERY_GET_PETS)
  const [addPet, { error: mutationError }] = useMutation(MUTATION_ADD_PET, {
    update(cache, { data: { addPet } }) {
      const data: any = cache.readQuery({ query: QUERY_GET_PETS })
      cache.writeQuery({
        query: QUERY_GET_PETS,
        data: { pets: [addPet, ...data.pets] },
      })
    },
  })

  const [modal, setModal] = useState<boolean>(false)

  const onSubmit = (input: { type: string; name: string }) => {
    const id = `${Math.floor(Math.random() * 1000)}`
    addPet({
      variables: { input },
      optimisticResponse: {
        __typename: "Mutation",
        addPet: {
          __typename: "Pet",
          id,
          type: input.type,
          name: input.name,
          img: "https://via.placeholder.com/300",
          vaccinated: true,
          owner: {
            id,
            age: 35,
          },
        },
      },
    })
    setModal(false)
  }

  if (loading) {
    return <Loader />
  }

  if (error || mutationError) {
    return <p>Error</p>
  }

  if (modal) {
    return (
      <div className="row center-xs">
        <div className="col-xs-8">
          <NewPet onSubmit={onSubmit} onCancel={() => setModal(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        {data.pets.map((pet: IPet) => (
          <div className="col-xs-12 col-md-4 col" key={pet.id}>
            <div className="box">
              <PetBox pet={pet} />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default PetsScreen
