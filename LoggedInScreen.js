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
        name="IssueTab"
        component={IssueStackScreen}
        options={{title: 'Home page'}}
      />
      <Tab.Screen
        name="MapStack"
        component={MapStack}
        options={{title: 'Maps page'}}
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
      <IssueStack.Screen name={ISSUE_LIST} component={Home} />
      <IssueStack.Screen name={ISSUE_DETAIL} component={IssueDetail} />
      <IssueStack.Screen name={ISSUE_EDIT} component={IssueEdit} />
    </IssueStack.Navigator>
  );
}
