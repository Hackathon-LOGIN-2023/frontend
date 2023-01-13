import React, {useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useIssue from '../hooks/useIssue';
import {URI_IMAGE} from '../consts/backend';

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});

export default function IssueDetail({navigation, route}) {
  const {issueId} = route.params;
  const {data: issue, isLoading, isSuccess} = useIssue({issueId});
  const [imgRatio, setImgRatio] = useState(0);
  const width = Dimensions.get('window').width;

  useLayoutEffect(function () {
    if (isSuccess) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() =>
              navigation.navigate('IssueEdit', {
                issueId: issue._id,
              })
            }
            title="Edit"
          />
        ),
        title: issue.title,
      });
    }
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Loading issue...</Text>
      </View>
    );
  }

  Image.getSize(`${URI_IMAGE}${issue.image}`, (w, h) => {
    setImgRatio(h / w);
  });

  return (
    <View>
      {/*{issue.image && <Image source={{uri: issue.image}} style={styles.image} />}*/}
      {issue.image && (
        <Image
          source={{uri: `${URI_IMAGE}${issue.image}`}}
          style={{
            ...styles.image,
            width: width,
            height: imgRatio * width,
          }}
        />
      )}
      <Text>Id: {issue._id}</Text>
      <Text>Issue: {issue.title}</Text>
      <Text>Description: {issue.description}</Text>
      <Text>Date: {issue.date}</Text>
      <Text>Status: {issue.status}</Text>
      <Text>Severity: {issue.severity}</Text>
      <Text>Category: {issue.category}</Text>
      <View>
        <Text>Votes</Text>
        {issue.votes.map(vote => (
          <Text key={`vote--${vote._id}`}>{vote._id}</Text>
        ))}
      </View>
    </View>
  );
}
