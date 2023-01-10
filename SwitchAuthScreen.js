import React from 'react';
import useAuthContext from './src/hooks/useAuthContext';
import {LOADING, LOGGED_IN} from './src/context/AuthContext';
import {Text, View} from 'react-native';
import LoggedInScreen from './LoggedInScreen';
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
    return <LoggedInScreen />;
  }
  return <LoggedOutScreen />;
}

export default SwitchAuthScreen;
