import Home from './Home';
import MapStack from './Maps';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Logout from './Logout';
import {IssueContextProvider} from '../context/IssueContext';
import {createStackNavigator} from '@react-navigation/stack';
import {ISSUE_DETAIL, ISSUE_EDIT, ISSUE_LIST} from '../consts/screens';
import IssueDetail from './Issues/Detail';
import IssueUpdate from './Issues/Update';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const IssueStack = createStackNavigator();

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
        component={IssueStackScreen}
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

function IssueStackScreen() {
  return (
    <IssueStack.Navigator>
      <IssueStack.Screen
        name={ISSUE_LIST}
        component={Home}
        options={{
          title: 'Ariha - All Issues',
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
      <IssueStack.Screen
        name={ISSUE_DETAIL}
        component={IssueDetail}
        options={{
          title: 'Ariha - View Issue',
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
      <IssueStack.Screen
        name={ISSUE_EDIT}
        component={IssueUpdate}
        options={{
          title: 'Ariha - Edit Issue',
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
    </IssueStack.Navigator>
  );
}
