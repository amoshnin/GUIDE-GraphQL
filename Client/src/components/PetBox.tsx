// PLUGINS IMPORTS //
import React, { FC } from "react"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { IPet } from "typings/PetTypes"

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  pet: IPet
}

const PetBox: FC<PropsType> = (props) => (
  <div className="pet">
    <figure>
      <img src={props.pet.img + `?pet=${props.pet.id}`} alt="" />
    </figure>
    <div className="pet-name">{props.pet.name}</div>
    <div className="pet-type">{props.pet.type}</div>
  </div>
)

export default PetBox
