// components/CompletionModal.js
import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const CompletionModal = ({ visible, timerName, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>🎉 Timer Completed! 🎉</Text>
          <Text style={styles.modalMessage}>Great job finishing "{timerName}"!</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    width: '85%',
    padding: 25,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default CompletionModal;
