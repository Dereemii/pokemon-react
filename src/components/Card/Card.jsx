import { useState } from 'react'
import mockPokeData from '../../utils/mockPokeData'
import './Card.css'

const Card = () => {
  //  console.log('pokeData', mockPokeData)

  const [pokemonList] = useState(mockPokeData)

  return (
    <div className="card">
      <h2>Card</h2>
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id}>
          <h3>{pokemon.name}</h3>
          <span>{pokemon.types}</span>
        </div>
        ))}
    </div>
  )
}

export default Card
