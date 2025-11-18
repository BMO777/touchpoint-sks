// screens/JournalScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JournalScreen() {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadJournal();
  }, []);

  const loadJournal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@journal_entries');
      if (jsonValue != null) {
        setEntries(JSON.parse(jsonValue));
      }
    } catch(e) {
      console.error("Failed to load journal:", e);
    }
  };

  const addEntry = (newEntry) => {
    const updated = [newEntry, ...entries];
    setEntries(updated);
    AsyncStorage.setItem('@journal_entries', JSON.stringify(updated));
  };

  const deleteEntry = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
    AsyncStorage.setItem('@journal_entries', JSON.stringify(updated));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.entryCard}>
      <Text style={styles.entryTitle}>{item.session?.title || 'Untitled Echo'}</Text>
      <Text style={styles.entryDate}>{new Date().toLocaleDateString()}</Text>
      <Text style={styles.entryProximity}>Proximity: {'🌀'.repeat(item.proximity)}</Text>
      <Text style={styles.entryNote} numberOfLines={2}>{item.note}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteEntry(index)}
      >
        <Text style={styles.deleteText}>🗑 Delete</Text>
      </TouchableOpacity>
    </View>
  );

  // If this screen was opened with a new entry (from ReflectionScreen)
  const route = useRoute();
  if (route.params?.newEntry) {
    addEntry(route.params.newEntry);
    navigation.setParams({ newEntry: undefined }); // clear param
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Echoes</Text>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No echoes yet. Enter the Reciprocal Space to remember.</Text>
        }
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
  entryCard: {
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
  entryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5D4037',
  },
  entryDate: {
    fontSize: 14,
    color: '#8D6E63',
    marginTop: 5,
  },
  entryProximity: {
    fontSize: 16,
    color: '#D4B8A7',
    marginTop: 5,
  },
  entryNote: {
    fontSize: 14,
    color: '#5D4037',
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#EF9A9A',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: '#FFF',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#8D6E63',
    marginTop: 30,
    fontSize: 16,
  },
});