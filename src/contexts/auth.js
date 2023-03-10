/**
 * Authentication context.
 *
 * Manage login status and other requests to the Authentication Service.
 */

import React, {useContext, useEffect} from 'react';
import {createContext, useCallback, useMemo, useReducer} from 'react';
import storage from '../services/storage';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOADING = 'LOADING';

const APP_LOGGED_KEY = 'app.logged_key';

const Context = createContext();

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_STATE = 'SET_STATE';

function reducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return LOGGED_IN;
    case LOGOUT:
      return LOGGED_OUT;
    case SET_STATE:
      return action.payload;
    default:
      return state;
  }
}

export function AuthContextProvider({children}) {
  const [state, dispatch] = useReducer(reducer, LOADING);

  const login = useCallback(() => {
    storage.set(APP_LOGGED_KEY, LOGGED_IN);
    dispatch({type: 'LOGIN'});
  }, []);

  const logout = useCallback(() => {
    storage.set(APP_LOGGED_KEY, LOGGED_OUT);
    dispatch({type: 'LOGOUT'});
  }, []);

  const contextValue = useMemo(
    () => ({
      login,
      logout,
      loggedState: state,
    }),
    [login, logout, state],
  );

  useEffect(function () {
    async function fetchState() {
      const status = await storage.get(APP_LOGGED_KEY);
      dispatch({
        type: SET_STATE,
        payload: status ?? LOGGED_OUT,
      });
    }

    fetchState();
  }, []);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useAuthContext() {
  return useContext(Context);
}
