import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/views/Home';
import Maps from './src/views/Maps';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{title: 'Home page'}}
          />
          <Tab.Screen
            name="Map"
            component={Maps}
            options={{title: 'Maps page'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
