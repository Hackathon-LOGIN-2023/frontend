import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {URI_IMAGE} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 10,
    // resizeMode: 'contain',
  },
  icon: {
    color: '#000',
    marginLeft: 'auto',
  },
  label: {
    fontSize: 20,
    color: '#000000',
  },
});

export default function IssueListItem({issue, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {issue.image && (
          <Image
            source={{uri: `${URI_IMAGE}${issue.image}`}}
            style={styles.image}
          />
        )}
        <Text style={styles.label}>{issue.title}</Text>
        <Icon name="arrow-forward" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}
