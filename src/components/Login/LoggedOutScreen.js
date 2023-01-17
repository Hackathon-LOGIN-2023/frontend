import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import {SCREENS} from '../../constants';
import CreateUser from '../User/CreateUser';

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
      <LoggedOutStackNavigator.Screen
        name={SCREENS.CREATE_USER}
        component={CreateUser}
        options={{
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
    </LoggedOutStackNavigator.Navigator>
  );
}
