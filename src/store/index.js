import React, {useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// STORE
const initialState = {
  user: null,
};

// REDUCER
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
      AsyncStorage.setItem('@user', JSON.stringify(action.payload));
      return {...state, user: action.payload};
    default:
      return;
  }
};

export const Context = React.createContext(initialState);

export const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
  );
};
