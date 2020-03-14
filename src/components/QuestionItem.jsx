import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const QuestionItem = memo(({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
));

QuestionItem.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  touchableContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuestionItem;
