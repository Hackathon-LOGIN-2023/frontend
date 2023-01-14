import React, {useEffect} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import IssueList from './Issues/List';
import MapStack from './MapStack';
import useAuthContext from '../hooks/useAuthContext';
import {IssueContextProvider} from '../context/IssueContext';

const Tab = createBottomTabNavigator();

export default () => (
  <IssueContextProvider>
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: '#ec8103',
        tabBarInactiveBackgroundColor: '#ec8103',
        tabBarInactiveTintColor: '#000000',
        tabBarActiveTintColor: '#ffffff',
        tabBarLabelStyle: {fontSize: 18},
        tabBarStyle: {height: 60},
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          title: 'Issues List',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="view-list" color={color} size={32} />
          ),
        }}
        name="IssueTab"
        component={IssueList}
      />
      <Tab.Screen
        name="MapStack"
        component={MapStack}
        options={{
          headerShown: false,
          title: 'Issues Map',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="map-outline"
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LogoutTab"
        component={Logout}
        options={{
          title: 'Close Session',
          headerStyle: {
            backgroundColor: '#ec8103',
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="logout-variant"
              color={color}
              size={32}
            />
          ),
        }}
      />
    </Tab.Navigator>
  </IssueContextProvider>
);

function Logout() {
  const {logout} = useAuthContext();

  useEffect(function () {
    logout();
  });

  return null;
}
