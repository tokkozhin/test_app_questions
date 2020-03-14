import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {useTransition, bInterpolate} from 'react-native-redash';
// constants
const {concat, cond, lessThan} = Animated;
const HEIGHT_FLIP = 56;
const PERSPECTIVE = {perspective: 100};

const Panel = ({position, number}) => {
  const stylePanel = {
    ...styles.darkPanel,
    [`border${position}LeftRadius`]: 5,
    [`border${position}RightRadius`]: 5,
    transform: [
      {translateY: position === 'Bottom' ? 1 : -(HEIGHT_FLIP / 2) - 1},
    ],
  };
  const styleText = {
    ...styles.answerNumber,
    ...(position === 'Bottom' ? {bottom: 0} : null),
  };
  return (
    <View style={stylePanel}>
      <Text style={styleText}>{number}</Text>
    </View>
  );
};

Panel.defaultProps = {
  position: 'Top',
};
Panel.propTypes = {
  position: PropTypes.oneOf(['Top', 'Bottom']),
  number: PropTypes.string,
};

const FlipClock = ({number, show}) => {
  const transition = useTransition(show);
  const rotate = bInterpolate(transition, 180, 0);
  return (
    <View style={styles.flipClock}>
      <View>
        <Panel position="Bottom" />
      </View>
      <View>
        <Panel number={number} />
      </View>
      <Animated.View
        style={{transform: [PERSPECTIVE, {rotateX: concat(rotate, 'deg')}]}}>
        <Panel number={number} position="Bottom" />
      </Animated.View>
      <Animated.View
        style={{
          transform: [PERSPECTIVE, {rotateX: concat(rotate, 'deg')}],
          opacity: cond(lessThan(rotate, 90), 0, 1),
        }}>
        <Panel position="Bottom" />
      </Animated.View>
    </View>
  );
};

FlipClock.propTypes = {
  show: PropTypes.instanceOf(Animated.Value),
  number: PropTypes.string,
};

const styles = StyleSheet.create({
  flipClock: {
    height: HEIGHT_FLIP,
    width: 36,
    justifyContent: 'center',
  },
  answerNumber: {
    height: HEIGHT_FLIP,
    fontSize: 46,
    lineHeight: HEIGHT_FLIP,
    color: '#ddd',
    fontWeight: 'bold',
    position: 'absolute',
  },
  darkPanelContainer: {
    position: 'absolute',
    height: HEIGHT_FLIP,
    width: 36,
  },
  darkPanel: {
    position: 'absolute',
    backgroundColor: '#222',
    height: HEIGHT_FLIP / 2,
    width: 36,
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default FlipClock;
