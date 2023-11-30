import React from 'react';
import { View, StyleSheet } from 'react-native';

const Seperator = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray', // veya istediğiniz renk
  },
});

export default Seperator;