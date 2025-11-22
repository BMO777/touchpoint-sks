# AI Development Rules for TouchPoint App

## Tech Stack Overview

- **Core Framework**: React Native with Expo for cross-platform mobile development
- **Navigation**: React Navigation (stack navigator) for screen transitions
- **Audio Playback**: Expo AV for playing guided session audio files
- **Data Storage**: AsyncStorage for local storage with optional Firebase integration
- **UI Components**: Native React Native components with custom styling
- **State Management**: Built-in React hooks (useState, useEffect, etc.)
- **Authentication**: Firebase Auth for anonymous user authentication
- **Database**: Firestore for cloud-based journal entry storage
- **Icons**: Unicode emojis (no external icon libraries)
- **Styling**: React Native StyleSheet with minimal design principles

## Library Usage Rules

### ✅ Approved Libraries

1. **Navigation**: Only use `@react-navigation/native` and `@react-navigation/stack`
2. **Audio**: Only use `expo-av` for all audio playback needs
3. **Storage**: Use `@react-native-async-storage/async-storage` for local storage
4. **Firebase**: Use official Firebase SDK (`firebase` package) for auth and database
5. **UI**: Use built-in React Native components (View, Text, TouchableOpacity, etc.)
6. **Styling**: Use React Native's StyleSheet for all styling needs

### ⛔ Restricted Libraries

1. **No external UI libraries** - Do not add libraries like `react-native-elements`, `native-base`, or `react-native-paper`
2. **No additional state management** - Do not add Redux, MobX, or other state management libraries
3. **No external icon libraries** - Do not add `react-native-vector-icons` or similar
4. **No external audio libraries** - Do not add alternatives to `expo-av`
5. **No external navigation libraries** - Do not add alternatives to React Navigation
6. **No external storage libraries** - Do not add alternatives to AsyncStorage

### 🎨 Design Principles

1. **Minimalist Approach**: Keep UI clean and uncluttered with plenty of white space
2. **Soft Color Palette**: Use warm, earthy tones (#6D4C41, #8D6E63, #D4B8A7, #F9F5F0)
3. **Consistent Typography**: Use system fonts with clear hierarchy
4. **Intuitive Navigation**: Maintain simple back/forward navigation patterns
5. **Accessibility**: Ensure adequate contrast and touch targets for all interactive elements

### 📱 Development Guidelines

1. **Component Structure**: Create one component per file in appropriate directories
2. **State Management**: Use React hooks for local component state
3. **Data Flow**: Pass data through navigation params or context for global state
4. **Error Handling**: Implement graceful error handling with user-friendly messages
5. **Performance**: Optimize lists with FlatList and avoid unnecessary re-renders
6. **Testing**: Test on both iOS and Android simulators before suggesting changes