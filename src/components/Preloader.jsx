import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

const DriverItem = () => {
  const {
    colors: {card},
  } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={card} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 60,
  },
});

export default DriverItem;
