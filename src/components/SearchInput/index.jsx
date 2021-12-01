import React, { useContext, useEffect, useState, useRef } from 'react'
import { SearchInputContainer, errorToastStyle } from './style'
import { PokemonContext } from 'context/pokemon'
import toast, { Toaster } from 'react-hot-toast'
import IconImg from 'components/IconImg'
import searchIcon from 'assets/svg/search_icon.svg'
import Pokemon from 'api/Pokemon'

function SearchInput () {
  const {
    pokemon,
    setPokemon
  } = useContext(PokemonContext)

  const Apipokemon = new Pokemon()
  const [searchText, setSearchText] = useState('')
  const searchInputRef = useRef('')

  useEffect(() => {
    initialFetch()
  }, [])

  useEffect(() => {
    clearElement(searchInputRef)
    setSearchText('')
  }, [pokemon])

  async function handleFetchPokemon (nameOrId) {
    try {
      const response = await Apipokemon.getAllInformation(nameOrId)
      setPokemon(response)
    } catch (err) {
      notify()
    }
  }

  function notify () {
    toast('Pokemon não encontrado')
    setSearchText('')
  }

  function initialFetch () {
    const randomPokemonId = (Math.random() * 100 + 1).toFixed()
    handleFetchPokemon(randomPokemonId)
  }

  function handleSearchPokemon (event) {
    event.preventDefault()
    if (!searchText) toast('Insira um nome para pesquisa')
    if (searchText === '0') toast('Não existe pokemon com Id zero :[')

    handleFetchPokemon(searchText)
  }

  function clearElement (element) {
    element.current = ''
  }

  return (
    <SearchInputContainer>
      <Toaster
        toastOptions={{ style: errorToastStyle }}
        position={'top-center'}
      />
      <IconImg
        className='search__icon'
        img={searchIcon}
        alt='alt'
      />
      <form onSubmit={handleSearchPokemon}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder='Search...'
          className='search__input'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </form>
    </SearchInputContainer>
  )
}

export default SearchInput
