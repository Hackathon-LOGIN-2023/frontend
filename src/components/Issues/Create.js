import React, {useState} from 'react';
import {useMutation} from 'react-query';

import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {Form, FormItem, Picker} from 'react-native-form-component';
import {launchCamera} from 'react-native-image-picker';
import GetLocation from 'react-native-get-location';

import {ADD_IMAGE, createPicker} from '../../constants';
import {ISSUES_URL} from '@env';

export default function CreateIssue({navigation, route}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [severity, setSeverity] = useState(0);
  const [category, setCategory] = useState(0);
  const [imageURI, setImageURI] = useState('');
  const [imageB64, setImageB64] = useState('');
  const {mutate, isPosting, isSuccess} = useMutation(postIssue);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [error, setError] = useState('');

  function launchCameraWrapper() {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.1,
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image picker error: ', response.error);
        } else {
          setImageURI(`${response.assets[0].uri}`);
          setImageB64(`${response.assets[0].base64}`);
        }
      },
    );
  }

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      setLatitude(location.latitude);
      setLongitude(location.longitude);
    })
    .catch(err => {
      const {code, message} = err;
      console.log(code, message);
    });

  async function handleSubmit() {
    console.log(
      `Title: ${title}\nDescription: ${desc}\nSeverity: ${severity}\nCategory: ${category}\nImage: ${imageB64.substring(
        0,
        20,
      )}\nDate: ${getToday()}`,
    );
    let data = {
      title,
      description: desc,
      date: getToday(),
      location: {
        latitude,
        longitude,
      },
      image: imageB64,
      status: 'pending',
      userId: '63c67991519e4f5b0c917e79',
      severity,
      category,
    };
    await mutate(data);
    if (isSuccess) {
      navigation.goBack();
    } else {
      setError('Error adding');
    }
  }

  return (
    <Form
      onButtonPress={handleSubmit}
      buttonText="Create"
      buttonStyle={{backgroundColor: '#ec8103'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={{uri: imageURI || ADD_IMAGE}} style={styles.image} />
        <Button
          onPress={launchCameraWrapper}
          title="Select Image"
          color="#ec8103"
        />
      </View>
      <FormItem
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        isRequired
        asterik
      />
      <FormItem
        label="Description"
        value={desc}
        onChangeText={setDesc}
        placeholder="Description"
        textArea
        isRequired
        asterik
      />
      <Picker
        items={createPicker('severity')}
        label="Severity"
        selectedValue={severity}
        onSelection={item => setSeverity(item.value)}
        isRequired
        asterik
      />
      <Picker
        items={createPicker('category')}
        label="Category"
        selectedValue={category}
        onSelection={item => setCategory(item.value)}
        isRequired
        asterik
      />
      {isPosting && <Text>Creating Issue...</Text>}
      {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
    </Form>
  );
}

function getToday() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  return dd + '/' + mm + '/' + yyyy;
}

async function postIssue(data) {
  console.log('Posting issue');
  const response = await fetch(`${ISSUES_URL}/issues/`, {
    method: 'POST',
    body: {data},
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(await response.text());
  // const json = await response.json();
  // console.log('Issue creation result: ', json);
  // return json;
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10,
    marginBottom: 10,
  },
});
