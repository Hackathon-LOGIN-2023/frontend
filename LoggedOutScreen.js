import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LOGIN} from './src/consts/screens';
import Login from './src/views/Login';

const LoggedOutStackNavigator = createStackNavigator();

export default function LoggedOutScreen() {
  return (
    <LoggedOutStackNavigator.Navigator>
      <LoggedOutStackNavigator.Screen
        name={LOGIN}
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
    </LoggedOutStackNavigator.Navigator>
  );
}
