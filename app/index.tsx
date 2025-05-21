import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";

interface Pokemon {
  name: string;
  image: string;
}

export default function Index() {

  // Fontes
  const [fontsLoaded] = useFonts({
    Pokemon: require("../assets/fonts/PokemonSolid.ttf"),
    PokemonGame: require("../assets/fonts/PokemonGame.ttf"),
  });

  // Sets
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Encontrar Pokémon (Nome e Imagem)
  const fetchPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1; 
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const fullImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(randomId).padStart(3, '0')}.png`;
    setPokemon({ name: response.data.name, image: fullImage });
    fetchWrongOptions(response.data.name); 
  };

  // Encontrar 3 opções erradas
  const fetchWrongOptions = async (correctName: string) => {
    let wrongNames = new Set<string>();
    while (wrongNames.size < 3) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (response.data.name !== correctName) {
        wrongNames.add(response.data.name);
      }
    }

    // Adiciona o nome correto e embaralha as opções
    const allOptions = [correctName, ...Array.from(wrongNames)];
    setOptions(shuffleArray(allOptions)); 
    setLoading(false);
  };

  // Embaralhar opções
  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Carregar Pokémon
  useEffect(() => {
    fetchPokemon();
  }, []);

  // Verificar resposta
  const handleOptionPress = (selectedName: string) => {
    if (selectedName === pokemon?.name) {
      alert("Correto!");
      setLoading(true); 
      fetchPokemon(); 
    } else {
      alert("Errado!");
      setLoading(true);
      fetchPokemon();
    }
  };

  // Verifica se as fontes
  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>

      {/* Verifica se o Pokémon foi carregado */}
      {pokemon && (
        <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
      )}

      <Text style={styles.title}>Qual é esse Pokémon?</Text>

      <View style={styles.optionsContainer}>

        {/* Opções carregadas */}
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleOptionPress(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  title: {
    color: "#FFCB05",
    fontSize: 28,
    fontFamily: "Pokemon",
    marginBottom: 20,
    textAlign: "center",
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 20,
    width: "80%",
  },
  optionButton: {
    backgroundColor: "#FFCB05",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  optionText: {
    color: "#1a1a1a",
    fontSize: 18,
    fontFamily: "PokemonGame",
  },
  loadingContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1a1a1a",
  },
  loadingText: {
    color: "#FFCB05",
    fontSize: 22,
    fontFamily: "PokemonGame",
  },
});