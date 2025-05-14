import { Text, View, StyleSheet, ImageBackground } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';

export default function Index() {
  
  const [fontsLoaded] = useFonts({
    Pokemon: require('../assets/fonts/PokemonSolid.ttf'),
    PokemonGame: require('../assets/fonts/PokemonGame.ttf'),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/logoPokemon.png')}
        style={styles.logo}
        imageStyle={{ resizeMode: 'contain' }}
      >
        {/* Logo aqui se necessário */}
      </ImageBackground>

      <Text style={styles.title}>Pokemon Quiz</Text>
      <Text style={styles.text}>Explorando o universo dos jogos</Text>

      <View style={styles.versionContainer}>
        <Ionicons size={28} name="game-controller" color="#ffcc00" />
        <Text style={styles.versionText}>Versão 1.0.0</Text>
      </View>

      <View style={styles.versionContainer}>
        <Ionicons size={28} name="people" color="#ffcc00" />
        <Text style={styles.versionText}>
          Desenvolvido por: Guilherme Camargo
        </Text>
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
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: '#FFCB05',
    fontSize: 24,
    fontFamily: 'Pokemon',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PokemonGame',
    textAlign: 'center',
    marginBottom: 20,
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  versionText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 8,
    fontFamily: 'PokemonGame',
  },
});