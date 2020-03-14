import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// screens
import AuthScreen from 'src/screens/AuthScreen';
import QuestionsListScreen from 'src/screens/QuestionsListScreen';
import QuestionScreen from 'src/screens/QuestionScreen';
// store
import {Context} from 'src/store';
// constants
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    text: 'white',
    background: '#f0f0f0',
    card: 'darkcyan',
  },
};
const screenOptions = {
  headerBackTitle: 'Назад',
  headerTintColor: theme.colors.primary,
};

const Navigator = () => {
  const {state, dispatch} = useContext(Context);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const isLoggedIn = await VKLogin.isLoggedIn();
        const result = await AsyncStorage.getItem('@user');
        if (result) {
          dispatch({type: 'SET_USER', payload: JSON.parse(result)});
        }
        // console.log(result);
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, []);
  //console.log(state);
  return (
    <NavigationContainer theme={theme}>
      {state.user ? (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name="QuestionsList"
            component={QuestionsListScreen}
            options={{title: 'Список вопросов'}}
          />
          <Stack.Screen
            name="Question"
            component={QuestionScreen}
            options={{title: 'Вопрос'}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{title: 'Авторизация'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
