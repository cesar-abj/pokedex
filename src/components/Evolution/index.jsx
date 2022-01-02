import React, { useEffect, useState } from 'react'

import { usePokemon } from 'hooks/usePokemon'

import { EvolutionContainer } from './style'
import { stylingPokemonId } from 'components/UI/mixins'

function Evolution () {
  const { pokemon, setPokemon } = usePokemon()
  const [evolutions, setEvolutions] = useState([])

  useEffect(() => {
    setEvolutions(pokemon.evolutions)
  }, [pokemon.evolutions])

  function handleMainCardWithSelectedFromEvolution (data, index) {
    const newPokemonInMainCard = Object.assign(data[index], { evolutions: pokemon.evolutions })
    setPokemon(newPokemonInMainCard)
  }

  return (
    <EvolutionContainer className='evolution'>
      {evolutions.map((item, index) => {
        return (
          item
            ? <a
              key={index}
              onClick={() => handleMainCardWithSelectedFromEvolution(evolutions, index)}
              className='evolutions__container'
            >
              <div key={item.index} className='evolution__item'>
                <h4>{item.name}</h4>
                <p>{stylingPokemonId(item.id)}</p>
                <img
                  src={item.image}
                  alt={`Pokemon ${item.name}`}
                />
              </div>
            </a>
            : ''
        )
      })}
    </EvolutionContainer>
  )
}

export default Evolution
