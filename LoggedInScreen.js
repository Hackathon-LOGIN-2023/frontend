import Home from './src/views/Home';
import Maps from './src/views/Maps';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Logout from './src/views/Logout';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} options={{title: 'Home page'}} />
    <Tab.Screen name="Map" component={Maps} options={{title: 'Maps page'}} />
    <Tab.Screen name="LogoutTab" component={Logout} options={{title: 'Close Session'}} />
  </Tab.Navigator>
);
