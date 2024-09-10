import React, {useState} from "react";
import axios from "axios";
import './Style.css'

// Mapeamento de cores para cada tipo de pokemon
const typeColors = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78c850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  normal: '#A8A878',
};

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
      <h1>Pokédex</h1>
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

export default PokemonList;