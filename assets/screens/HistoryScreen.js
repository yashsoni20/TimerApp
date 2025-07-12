// screens/HistoryScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TimerContext } from '../contexts/TimerContext';

const HistoryScreen = () => {
  const { state } = useContext(TimerContext);

  if (!state.history.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noHistoryText}>No completed timers yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Timers</Text>
      <FlatList
        data={state.history.slice().reverse()} // latest first
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.timerName}>{item.name}</Text>
            <Text style={styles.timestamp}>{new Date(item.completedAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noHistoryText: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  timerName: {
    fontSize: 18,
    fontWeight: '600',
  },
  timestamp: {
    marginTop: 5,
    color: '#999',
    fontSize: 13,
  },
});

export default HistoryScreen;
