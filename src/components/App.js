/**
 * App component.
 *
 * This is first component that renders the whole application and manages the whole application state.
 */

import React from 'react';

import {QueryClient, QueryClientProvider} from 'react-query';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import MainScreen from './Main';
import LoggedOutScreen from './Login/LoggedOutScreen';
import {
  AuthContextProvider,
  LOADING,
  LOGGED_IN,
  useAuthContext,
} from '../contexts/auth';

const queryClient = new QueryClient();

function SwitchAuthScreen() {
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

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <SwitchAuthScreen />
        </NavigationContainer>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
