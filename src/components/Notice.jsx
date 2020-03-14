import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';

const Notice = ({children}) => <Text style={styles.notice}>{children}</Text>;

Notice.propTypes = {
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  notice: {
    padding: 40,
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
  },
});

export default Notice;
