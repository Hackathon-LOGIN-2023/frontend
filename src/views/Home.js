import React from 'react';
import {FlatList, Text, View} from 'react-native';
import useIssuesContext from '../hooks/useIssuesContext';
import IssueListItem from '../components/IssueListItem';

export default function Home({navigation}) {
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
