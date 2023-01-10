import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import SwitchAuthScreen from './SwitchAuthScreen';
import {AuthContextProvider} from './src/context/AuthContext';

const queryClient = new QueryClient();

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
