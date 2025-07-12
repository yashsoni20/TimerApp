// components/ProgressBar.js
import React from 'react';
import { View } from 'react-native';

const ProgressBar = ({ progress }) => {
  return (
    <View style={{ height: 10, backgroundColor: '#ccc', borderRadius: 5 }}>
      <View style={{
        height: '100%',
        width: `${progress * 100}%`,
        backgroundColor: '#4caf50',
        borderRadius: 5,
      }} />
    </View>
  );
};

export default ProgressBar;
