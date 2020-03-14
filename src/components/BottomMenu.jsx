import React, {useContext, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {Context} from 'src/store';

const BottomMenu = () => {
  const insets = useSafeArea();
  const {dispatch} = useContext(Context);
  const signOut = useCallback(() => {
    dispatch({type: 'SET_USER', payload: null});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <View style={[styles.button, styles.buttonActive]}>
        <Text style={[styles.textButton, styles.textButtonActive]}>
          Список вопросов
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.textButton}>Выход</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopColor: 'aliceblue',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'steelblue',
    borderWidth: 2,
    height: 40,
    borderRadius: 10,
    margin: 10,
  },
  textButton: {
    fontSize: 16,
    color: 'steelblue',
  },
  textButtonActive: {
    color: 'white',
  },
  buttonActive: {
    backgroundColor: 'steelblue',
  },
});

export default BottomMenu;
