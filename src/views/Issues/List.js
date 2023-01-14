import React from 'react';

import {FlatList, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IssueDetail from './Detail';
import IssueUpdate from './Update';
import IssueListItem from '../../components/IssueListItem';
import {ISSUE_DETAIL, ISSUE_EDIT, ISSUE_LIST} from '../../consts/screens';
import useIssuesContext from '../../hooks/useIssuesContext';

const Stack = createNativeStackNavigator();

function IssueList({navigation}) {
  function handleOnPress({issueId}) {
    navigation.navigate('IssueDetail', {
      issueId: issueId,
    });
  }

  const {isSuccess, isLoading, issues} = useIssuesContext();

  return (
    <View>
      <FlatList
        data={isSuccess ? issues : []}
        renderItem={({item}) => (
          <IssueListItem
            issue={item}
            onPress={() => handleOnPress({issueId: item._id})}
          />
        )}
        keyExtractor={item => item._id}
        ListEmptyComponent={
          <View>{isLoading && <Text>Loading issues...</Text>}</View>
        }
      />
    </View>
  );
}

export default function IssueListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ISSUE_LIST}
        component={IssueList}
        options={{
          title: 'Ariha - All Issues',
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
      <Stack.Screen
        name={ISSUE_DETAIL}
        component={IssueDetail}
        options={{
          title: 'Ariha - View Issue',
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
      <Stack.Screen
        name={ISSUE_EDIT}
        component={IssueUpdate}
        options={{
          title: 'Ariha - Give Issue Update',
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
    </Stack.Navigator>
  );
}
