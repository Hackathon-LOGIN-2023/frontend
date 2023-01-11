/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Dimensions, Pressable} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconAD from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateIssue from './CreateIssue';
import {createAppContainer} from 'react-navigation';

function Map({navigation}) {
  const dims = Dimensions.get('window');
  const h = dims.height;
  const w = dims.width;
  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{
          flex: 1,
          height: h,
          width: w,
        }}>
        <Marker coordinate={{latitude: 37.78825, longitude: -122.4324}} />
      </MapView>
      <Pressable
        onPress={() => navigation.navigate('CreateIssue', {name: 'Jane'})}>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
          }}>
          <IconFA name="circle" size={w * 0.22} color="#EC8103" />
          <View
            style={{
              position: 'absolute',
              top: '20%',
              alignSelf: 'center',
            }}>
            <IconAD name="plus" size={w * 0.12} color="#fff" />
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
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="CreateIssue" component={CreateIssue} />
    </Stack.Navigator>
  );
}
