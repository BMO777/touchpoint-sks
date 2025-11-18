// screens/JournalScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firestore
import { db, auth } from '../firebase.config';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore';

export default function JournalScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [entries, setEntries] = useState([]);
  const unsubRef = useRef(null);

  // Local storage key
  const STORAGE_KEY = '@journal_entries';

  useEffect(() => {
    // Try to subscribe to Firestore if db and auth currentUser exist
    const setupFirestoreListener = () => {
      try {
        if (db && auth && auth.currentUser) {
          const uid = auth.currentUser.uid;
          const q = query(collection(db, 'journalEntries'), orderBy('createdAt', 'desc'));
          unsubRef.current = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs
              .map(d => ({ id: d.id, ...d.data() }))
              .filter(item => !item.uid || item.uid === uid); // keep entries for this user
            if (docs.length) {
              setEntries(docs);
              // Also update AsyncStorage so local copy is in sync
              AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(docs)).catch(e => console.warn(e));
            }
          }, (err) => {
            console.warn('Firestore onSnapshot error:', err.message);
            // fallback to local load
            loadJournal();
          });
          return true;
        }
      } catch (e) {
        console.warn('Firestore listener setup failed:', e.message);
      }
      return false;
    };

    const hasFirestore = setupFirestoreListener();
    if (!hasFirestore) {
      loadJournal();
    }

    return () => {
      if (unsubRef.current) unsubRef.current();
    };
  }, []);

  const loadJournal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setEntries(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Failed to load journal:", e);
    }
  };

  // New addEntry: write to Firestore (with uid) when possible, else to local storage.
  const addEntry = async (newEntry) => {
    const entryWithMeta = {
      ...newEntry,
      createdAt: new Date().toISOString(),
      uid: auth?.currentUser?.uid || null
    };

    if (db && auth && auth.currentUser) {
      try {
        await addDoc(collection(db, 'journalEntries'), entryWithMeta);
        // Firestore onSnapshot will update local state and AsyncStorage via listener
        return;
      } catch (e) {
        console.warn('Failed to add to Firestore, saving locally:', e.message);
      }
    }

    // fallback: local-only
    const updated = [entryWithMeta, ...entries];
    setEntries(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(e => console.warn(e));
  };

  const deleteEntry = async (indexOrId) => {
    // If entry has a Firestore id, delete it from Firestore
    const item = typeof indexOrId === 'number' ? entries[indexOrId] : entries.find(e => e.id === indexOrId);
    if (!item) return;

    if (item.id && db) {
      try {
        await deleteDoc(doc(db, 'journalEntries', item.id));
        return;
      } catch (e) {
        console.warn('Failed to delete from Firestore, will remove locally:', e.message);
      }
    }

    // fallback local delete
    const updated = entries.filter(e => e !== item);
    setEntries(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(e => console.warn(e));
  };

  // If opened with a new entry param (ReflectionScreen), add it
  useEffect(() => {
    if (route.params?.newEntry) {
      addEntry(route.params.newEntry);
      navigation.setParams({ newEntry: undefined });
    }
  }, [route.params?.newEntry]);

  const renderItem = ({ item, index }) => (
    <View style={styles.entryCard}>
      <Text style={styles.entryTitle}>{item.session?.title || 'Untitled Echo'}</Text>
      <Text style={styles.entryDate}>{new Date(item.createdAt || Date.now()).toLocaleDateString()}</Text>
      <Text style={styles.entryProximity}>Proximity: {'🌀'.repeat(item.proximity || 0)}</Text>
      <Text style={styles.entryNote} numberOfLines={2}>{item.note}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteEntry(item.id || index)}
      >
        <Text style={styles.deleteText}>🗑 Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Echoes</Text>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item, idx) => item.id || idx.toString()}
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
