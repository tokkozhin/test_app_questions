import React, {memo, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import FlipClock from './FlipClock';
import {Value} from 'react-native-reanimated';

const AnswerItem = memo(({answer, number, close}) => {
  const open = useRef(false);
  const show = new Value(0);
  const onPressAnswer = () => {
    show.setValue(open.current ? 0 : 1);
    open.current = !open.current;
  };
  useEffect(() => {
    if (close) {
      show.setValue(0);
      open.current = false;
    }
  }, [close, show]);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressAnswer}
      activeOpacity={1}>
      <Text style={styles.answer}>{answer}</Text>
      <FlipClock {...{number, show}} />
    </TouchableOpacity>
  );
});

AnswerItem.propTypes = {
  answer: PropTypes.string,
  number: PropTypes.string,
  close: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answer: {
    fontSize: 20,
  },
});

export default AnswerItem;
