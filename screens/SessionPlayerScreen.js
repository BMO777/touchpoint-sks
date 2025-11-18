// screens/SessionPlayerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SessionPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { session, relationship, boundaries } = route.params;

  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  // Simulate audio playback (replace with real .mp3 later)
  useEffect(() => {
    const loadAudio = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../assets/audio/sample_session.mp3') // placeholder
      );
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          setDuration(status.durationMillis || 0);
          setPosition(status.positionMillis || 0);
          if (status.didJustFinish) {
            navigation.navigate('Reflection', { session, relationship });
          }
        }
      });
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const togglePlay = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const emergencyPause = async () => {
    if (sound) {
      await sound.stopAsync();
    }
    navigation.navigate('Home');
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.relationship}>With: {relationship}</Text>

      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(position)} / {formatTime(duration)}</Text>
      </View>

      <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
        <Text style={styles.playButtonText}>{isPlaying ? '⏸ Pause' : '▶ Play'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.emergencyButton} onPress={emergencyPause}>
        <Text style={styles.emergencyButtonText}>🛑 Return to Self</Text>
      </TouchableOpacity>

      <Text style={styles.boundaryNote}>
        Boundaries honored: {boundaries.noFaceTouching && 'Mystery • '}
        {boundaries.lightPressureOnly && 'Reverence • '}
        Pause allowed: {boundaries.canPause ? '✅' : '❌'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6D4C41',
  },
  relationship: {
    fontSize: 16,
    color: '#8D6E63',
    marginBottom: 20,
  },
  timerContainer: {
    marginBottom: 30,
  },
  timer: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5D4037',
  },
  playButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#D4B8A7',
    borderRadius: 10,
    marginBottom: 20,
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  emergencyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#EF9A9A',
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  boundaryNote: {
    marginTop: 30,
    fontSize: 14,
    color: '#8D6E63',
    textAlign: 'center',
  },
});