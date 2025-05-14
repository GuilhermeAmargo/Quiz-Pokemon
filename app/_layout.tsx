import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    Pokemon: require('../assets/fonts/PokemonSolid.ttf'),
    PokemonGame: require('../assets/fonts/PokemonGame.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#1a1a1a' },
        headerTintColor: '#ffcc00',
        headerTitleStyle: {
          color: '#ffcc00',
          fontFamily: 'Pokemon',
          fontSize: 24,
        },
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
          height: 70,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#ffcc00',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: {
          fontFamily: 'PokemonGame',
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <Ionicons size={26} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => (
            <Ionicons name="information-circle" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}