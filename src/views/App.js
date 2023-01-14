import React from 'react';

import {QueryClient, QueryClientProvider} from 'react-query';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import MainScreen from './Main';
import LoggedOutScreen from './Login/LoggedOutScreen';
import useAuthContext from '../hooks/useAuthContext';
import {AuthContextProvider, LOADING, LOGGED_IN} from '../context/AuthContext';

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
