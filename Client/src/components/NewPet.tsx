// PLUGINS IMPORTS //
import React, { useState, FormEvent } from "react"
// @ts-ignore
import Select from "react-select"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const options = [
  { value: "CAT", label: "Cat" },
  { value: "DOG", label: "Dog" },
]

const NewPet = (props: any) => {
  const [type, setType] = useState("DOG")
  const [name, setName] = useState("")

  const activeOption = options.find((o) => o.value === type)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    props.onSubmit({ name, type })
  }

  const cancel = (e: FormEvent) => {
    e.preventDefault()
    props.onCancel()
  }

  return (
    <div className="new-pet page">
      <h1>New Pet</h1>
      <div className="box">
        <form onSubmit={submit}>
          <Select
            value={activeOption}
            defaultValue={options[0]}
            onChange={(e: any) => setType(e.value)}
            options={options}
          />

          <input
            className="input"
            type="text"
            placeholder="pet name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <a className="error button" onClick={cancel}>
            cancel
          </a>
          <button type="submit" name="submit">
            add pet
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewPet
