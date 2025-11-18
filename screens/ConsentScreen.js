// screens/ConsentScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, CheckBox, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ConsentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { session, relationship } = route.params;

  const [boundaries, setBoundaries] = useState({
    noFaceTouching: false,
    lightPressureOnly: false,
    canPause: true,
  });

  const handleStart = () => {
    if (!boundaries.canPause) {
      Alert.alert("Sacred Pause", "Even in unity, space is honored.");
      return;
    }
    navigation.navigate('Session', { session, relationship, boundaries });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sacred Agreement</Text>
      <Text style={styles.subtitle}>Before we enter the reciprocal space, let’s honor the space between us.</Text>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={boundaries.noFaceTouching}
          onValueChange={(value) => setBoundaries({...boundaries, noFaceTouching: value})}
        />
        <Text style={styles.label}>No face touching — preserve the mystery</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={boundaries.lightPressureOnly}
          onValueChange={(value) => setBoundaries({...boundaries, lightPressureOnly: value})}
        />
        <Text style={styles.label}>Light pressure only — reverence over force</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={boundaries.canPause}
          onValueChange={(value) => setBoundaries({...boundaries, canPause: value})}
        />
        <Text style={styles.label}>Pause anytime — even in eternity, breath exists</Text>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Enter the Reciprocal Space</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Return to Self</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6D4C41',
  },
  subtitle: {
    fontSize: 16,
    color: '#8D6E63',
    marginBottom: 30,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#5D4037',
  },
  startButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#D4B8A7',
    borderRadius: 10,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#8D6E63',
    fontSize: 16,
  },
});