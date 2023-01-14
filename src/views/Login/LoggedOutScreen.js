import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import {SCREENS} from '../../constants';

const LoggedOutStackNavigator = createStackNavigator();

export default function LoggedOutScreen() {
  return (
    <LoggedOutStackNavigator.Navigator>
      <LoggedOutStackNavigator.Screen
        name={SCREENS.LOGIN}
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
