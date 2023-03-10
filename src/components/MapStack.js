/**
 * MapStack component.
 *
 * This component handles the stack of pages that are loaded starting at the
 * main map view and all its sub-pages.
 */

import React, {useEffect, useState} from 'react';

import {Dimensions, Pressable, SafeAreaView, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetLocation from 'react-native-get-location';

import IssueCreate from './Issues/Create';
import IssueDetail from './Issues/Detail';
import IssueUpdate from './Issues/Update';
import {fetchData} from '../contexts/issues';

function Map({navigation}) {
  const {height, width} = Dimensions.get('window');
  const [issues, setIssues] = useState([]);
  const [latitude, setLatitude] = useState(47.282332);
  const [longitude, setLongitude] = useState(-1.521142);

  useEffect(() => {
    const f = async () => {
      setIssues(await fetchData());
    };
    f();
  }, []);

  let showsUserLocation = true;

  check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(resCheck => {
    if (resCheck !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(resRequest => {
        if (resCheck !== RESULTS.GRANTED) {
          showsUserLocation = false;
          console.log('Not displaying user location', resRequest);
        }
      });
    }
  });

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      setLatitude(location.latitude);
      setLongitude(location.longitude);
    })
    .catch(error => {
      const {code, message} = error;
      console.log(code, message);
    });

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0722,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation={showsUserLocation}
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
      <Pressable onPress={() => navigation.navigate('IssueCreate')}>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
          }}>
          <FontAwesome name="circle" size={width * 0.22} color="#ec8103" />
          <View
            style={{
              position: 'absolute',
              top: '20%',
              alignSelf: 'center',
            }}>
            <AntDesign name="plus" size={width * 0.12} color="#fff" />
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function MapStack() {
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
        name="IssueCreate"
        component={IssueCreate}
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
      <Stack.Screen
        name="IssueUpdate"
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
