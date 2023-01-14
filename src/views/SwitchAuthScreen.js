import React from 'react';
import useAuthContext from '../hooks/useAuthContext';
import {LOADING, LOGGED_IN} from '../context/AuthContext';
import {Text, View} from 'react-native';
import MainScreen from './Main';
import LoggedOutScreen from './LoggedOutScreen';

function SwitchAuthScreen(props) {
  const {loggedState} = useAuthContext();
  if (loggedState === LOADING) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (loggedState === LOGGED_IN) {
    return <MainScreen />;
  }
  return <LoggedOutScreen />;
}

export default SwitchAuthScreen;
