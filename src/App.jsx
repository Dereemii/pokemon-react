import  { useEffect, useState } from "react";
import axios from "axios"; // O puedes usar fetch directamente

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Consumir la PokéAPI
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20" // Obtener 20 Pokémon
        );
        const results = response.data.results;

        // Obtenemos información adicional para cada Pokémon (imagen y stats)
        const detailedData = await Promise.all(
          results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default, // Imagen del Pokémon
              types: details.data.types.map((type) => type.type.name), // Tipos
            };
          })
        );

        setPokemonList(detailedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Pokédex</h1>
      {loading ? (
        <p>Cargando Pokémon...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
          }}
        >
          {pokemonList.map((pokemon) => (
            <div
              key={pokemon.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{ width: "100px", height: "100px" }}
              />
              <h2
                style={{
                  fontSize: "16px",
                  textTransform: "capitalize",
                  margin: "10px 0",
                }}
              >
                {pokemon.name}
              </h2>
              <p style={{ fontSize: "14px", color: "#555" }}>
                Tipos: {pokemon.types.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
