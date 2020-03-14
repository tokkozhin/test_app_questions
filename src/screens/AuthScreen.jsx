import React, {useCallback, useContext} from 'react';
import {StyleSheet, View, Button, Alert} from 'react-native';
import * as Api from 'src/core/api';
import VKLogin from 'react-native-vkontakte-login';
// store
import {Context} from 'src/store';

const AuthScreen = () => {
  const {state, dispatch} = useContext(Context);

  const onPressAuth = useCallback(() => {
    const authVK = async () => {
      try {
        const auth = await VKLogin.login(['email']);
        if (auth) {
          const fullName = await Api.getVKFullName(
            auth.user_id,
            auth.access_token,
          );
          dispatch({
            type: 'SET_USER',
            payload: {...fullName.data.response[0], ...auth},
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    authVK();
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
