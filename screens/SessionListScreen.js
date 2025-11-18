// screens/SessionListScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SessionListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { relationship } = route.params;

  const sessions = [
    { id: '1', title: '5-Minute Reciprocal Breath', duration: '5 min', mood: 'One' },
    { id: '2', title: 'Echo: Skin-to-Skin Lullaby', duration: '10 min', mood: 'Nurturing' },
    { id: '3', title: 'Self: Mirror of the One', duration: '7 min', mood: 'Grounding' },
    { id: '4', title: 'Elder: Hand Rub & Memory', duration: '8 min', mood: 'Comforting' },
    { id: '5', title: 'Friend: Shadow of the Light', duration: '6 min', mood: 'Playful' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() => navigation.navigate('Consent', { session: item, relationship })}
    >
      <Text style={styles.sessionTitle}>{item.title}</Text>
      <Text style={styles.sessionInfo}>{item.duration} • {item.mood}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose an Echo for {relationship}</Text>
      <FlatList
        data={sessions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#6D4C41',
  },
  sessionCard: {
    backgroundColor: '#F9F5F0',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5D4037',
  },
  sessionInfo: {
    fontSize: 14,
    color: '#8D6E63',
    marginTop: 5,
  },
});