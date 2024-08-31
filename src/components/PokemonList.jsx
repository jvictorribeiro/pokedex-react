import React, {useState} from "react";
import axios from "axios";
import './Style.css'

function PokemonList() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      setPokemon(response.data);
      setError('');
    } catch (err) {
      setError('Pokémon não encontrado!');
      setPokemon(null);
    }
  };


  return (
    <div>
      <h1>Pokédex</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          name="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite o nome de um Pokémon!"
        />
        <button type="submit">Buscar</button>
      </form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemon && (
        <div className="Card">
          <h2>{pokemon.name}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ width: '150px' }}
          />
          <p>Tipo: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
        </div>
      )}
    </div>
  )
}

export default PokemonList;