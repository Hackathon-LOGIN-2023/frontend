import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

export default function CreateIssue({navigation, route}) {
  return <Text>This is {route.params.name}'s profile</Text>;
}
