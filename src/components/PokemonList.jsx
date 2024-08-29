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

  // useEffect(() => {
  //   const fetchPokemons = async () => {
  //     try {
  //       const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
  //       setPokemons(response.data.results)
  //       console.log(response.data.results);
        
  //     } catch(error){
  //       console.log(('Erro ao buscar pokemons: ', error));
  //     }
  //   };

  //   fetchPokemons();
  // }, []);

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
      {/* <Pokemon />
        { pokemons.map((item) => (
          <Pokemon key={item.name} data={item}/>
        ))}
       */}
    </div>
  )
}

// const Pokemon = ({data}) => {
//   const [details, setDetails] = useState(null);

//   const fetchIndividualPokemon = () => {
//     axios.get(data.url).then((response) => setDetails(response.data));
//     console.log(data.url);
//   };

//   useEffect(() => {
//     fetchIndividualPokemon();
//   }, []);

//   if (details === null) {
//     return <div>Carregando...</div>
//   }

//   return (
//     <div>
//       <img 
//         src={details.sprites.front_default}
//       />

//       <div style={ {display: 'flex'}}>
//         <p>Nome: {details.name} </p>
//         <p>Tipo: {details.types.map((type) => type.type.name).join(', ')}</p>
//       </div>
    
//     </div>

//   )
// };

export default PokemonList;