import React, {useState} from "react";
import axios from "axios";
import './Style.css'

import { typeColors } from "../styles/colors";

export default function PokemonList() {
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

  const getBackgroundColor = () => {
    if(pokemon) {
      const primaryType = pokemon.types[0].type.name;
      return typeColors[primaryType] || '#fff';
    }
     return '#fff';
  };


  return (
    <div
      style={{
        backgroundColor: getBackgroundColor(),
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <h1 style={{color: 'black'}}>Pokédex</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          name="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite o nome de um Pokémon!"
          style={{padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid black'}}
        />
        <button 
          type="submit"
          style={{padding: '10px', 
            backgroundColor: "lightgreen", 
            border: 'none', 
            borderRadius: '5px',
          }}
        >
          Buscar
        </button>
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