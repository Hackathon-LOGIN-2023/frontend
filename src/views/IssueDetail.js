import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useIssue from '../hooks/useIssue';
import {URI_IMAGE} from '../consts/backend';
import {CHOICES} from '../consts/multiplechoice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    color: '#000000',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  label: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    color: '#000000',
    fontSize: 18,
  },
  votes: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  voteCount: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '10%',
  },
  editButton: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default function IssueDetail({navigation, route}) {
  const {issueId} = route.params;
  const {data: issue, isLoading} = useIssue({issueId});
  const [imgRatio, setImgRatio] = useState(0);
  const {width, height} = Dimensions.get('window');

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
    <ScrollView
      style={{
        backgroundColor: '#FFF',
        height,
      }}>
      <Text style={styles.title}>{issue.title}</Text>
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
      <View style={styles.votes}>
        <Pressable onPress={() => {}}>
          <Icon name="arrow-up-bold-box" size={width * 0.15} color="#EC8103" />
        </Pressable>
        <Text style={{...styles.label, ...styles.voteCount}}>
          {issue.votes.length}
        </Text>
        <Pressable onPress={() => {}}>
          <Icon
            name="arrow-down-bold-box"
            size={width * 0.15}
            color="#EC8103"
          />
        </Pressable>
      </View>
      <Field label="Description:" value={issue.description} />
      <Field label="Date:" value={issue.date} />
      <Field label="Severity:" value={CHOICES.severity[issue.severity - 1]} />
      <Field label="Category:" value={CHOICES.category[issue.category - 1]} />
      <View style={styles.editButton}>
        <Button
          color="#EC8103"
          onPress={() =>
            navigation.navigate('IssueEdit', {
              issueId: issue._id,
            })
          }
          title="Have an update?"
        />
      </View>
    </ScrollView>
  );
}

function Field({label, value}) {
  return (
    <View style={{paddingTop: 10}}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
