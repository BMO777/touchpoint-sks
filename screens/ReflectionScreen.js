// screens/ReflectionScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ReflectionScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { session, relationship } = route.params;

  const [note, setNote] = useState('');
  const [proximity, setProximity] = useState(3); // 1-5 scale: Far → Near → One

  const saveReflection = () => {
    Alert.alert("Saved!", "Your echo has been recorded in the eternal space.");
    navigation.navigate('Journal', { newEntry: { session, relationship, note, proximity } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where did you feel the distance?</Text>
      <Text style={styles.subtitle}>And where did you feel the return?</Text>

      <View style={styles.proximitySelector}>
        <Text style={styles.proximityLabel}>Proximity to the One:</Text>
        {[1,2,3,4,5].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.proximityButton,
              proximity === level && styles.proximityButtonActive
            ]}
            onPress={() => setProximity(level)}
          >
            <Text style={styles.proximityText}>{['🌌','🌫','✨','💫','🌀'][level-1]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="What did you notice in your body or heart? Where was the gap? Where was the bridge?"
        multiline
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveReflection}>
        <Text style={styles.saveButtonText}>Save & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6D4C41',
  },
  subtitle: {
    fontSize: 16,
    color: '#8D6E63',
    marginBottom: 30,
  },
  proximitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  proximityLabel: {
    marginRight: 10,
    fontSize: 16,
    color: '#5D4037',
  },
  proximityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: '#F9F5F0',
  },
  proximityButtonActive: {
    backgroundColor: '#D4B8A7',
  },
  proximityText: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  saveButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#D4B8A7',
    borderRadius: 10,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});