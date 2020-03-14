import React, {useCallback, useContext} from 'react';
import {StyleSheet, View, Button} from 'react-native';
// store
import {Context} from 'src/store';

const AuthScreen = () => {
  const {dispatch} = useContext(Context);

  const onPressAuth = useCallback(() => {
    dispatch({type: 'SET_USER', payload: {login: 'login'}});
  }, [dispatch]);

  return (
    <View style={styles.main}>
      <Button title="Войти" onPress={onPressAuth} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
