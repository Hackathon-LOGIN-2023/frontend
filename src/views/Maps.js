import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Dimensions, Pressable} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconAD from 'react-native-vector-icons/AntDesign';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateIssue from './Issues/Create';
import {fetchData} from '../context/IssueContext';
import IssueDetail from './Issues/Detail';

function Map({navigation}) {
  const {height, width} = Dimensions.get('window');
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const f = async () => {
      setIssues(await fetchData());
    };
    f();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{
          flex: 1,
          height: height,
          width: width,
        }}>
        {issues.map((issue, index) => (
          <Marker
            key={index}
            coordinate={issue.location}
            onPress={() =>
              navigation.navigate('IssueDetail', {issueId: issue._id})
            }
          />
        ))}
      </MapView>
      <Pressable onPress={() => navigation.navigate('CreateIssue')}>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
          }}>
          <IconFA name="circle" size={width * 0.22} color="#ec8103" />
          <View
            style={{
              position: 'absolute',
              top: '20%',
              alignSelf: 'center',
            }}>
            <IconAD name="plus" size={width * 0.12} color="#fff" />
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function Maps() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: 'Ariha - Issues Map',
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
      <Stack.Screen
        name="CreateIssue"
        component={CreateIssue}
        options={{
          title: 'Ariha - Create Issue',
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
      <Stack.Screen
        name="IssueDetail"
        component={IssueDetail}
        options={{
          title: 'Ariha - View Issue',
          headerStyle: {
            backgroundColor: '#ec8103',
          },
        }}
      />
    </Stack.Navigator>
  );
}
