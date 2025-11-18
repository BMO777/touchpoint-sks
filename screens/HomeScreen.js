// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const relationships = [
    { name: 'The Reciprocal One', icon: '🌀', color: '#E8D8C9' },
    { name: 'Echo of the First Touch', icon: '👶', color: '#F9F5F0' },
    { name: 'Self as Reflection', icon: '🪞', color: '#D4B8A7' },
    { name: 'Elder as Memory', icon: '👵', color: '#E8D8C9' },
    { name: 'Friend as Shade', icon: '🌿', color: '#F9F5F0' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TouchPoint</Text>
      <Text style={styles.subtitle}>Where touch is not transaction — but return.</Text>

      {relationships.map((rel, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: rel.color }]}
          onPress={() => navigation.navigate('Sessions', { relationship: rel.name })}
        >
          <Text style={styles.cardText}>{rel.icon} {rel.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.journalButton}
        onPress={() => navigation.navigate('Journal')}
      >
        <Text style={styles.journalButtonText}>My Echoes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6D4C41',
  },
  subtitle: {
    fontSize: 16,
    color: '#8D6E63',
    marginBottom: 30,
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5D4037',
  },
  journalButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#D4B8A7',
    borderRadius: 10,
  },
  journalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});