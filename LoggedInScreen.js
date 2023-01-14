import Home from './src/views/Home';
import MapStack from './src/views/Maps';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Logout from './src/views/Logout';
import {IssueContextProvider} from './src/context/IssueContext';
import {createStackNavigator} from '@react-navigation/stack';
import {ISSUE_DETAIL, ISSUE_EDIT, ISSUE_LIST} from './src/consts/screens';
import IssueDetail from './src/views/IssueDetail';
import IssueEdit from './src/views/IssueEdit';

const Tab = createBottomTabNavigator();
const IssueStack = createStackNavigator();

export default () => (
  <IssueContextProvider>
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="IssueTab"
        component={IssueStackScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="MapStack"
        component={MapStack}
      />
      <Tab.Screen
        name="LogoutTab"
        component={Logout}
        options={{title: 'Close Session'}}
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
        options={{title: 'Ariha - All Issues'}}
      />
      <IssueStack.Screen
        name={ISSUE_DETAIL}
        component={IssueDetail}
        options={{title: 'Ariha - View Issue'}}
      />
      <IssueStack.Screen
        name={ISSUE_EDIT}
        component={IssueEdit}
        options={{title: 'Ariha - Edit Issue'}}
      />
    </IssueStack.Navigator>
  );
}
