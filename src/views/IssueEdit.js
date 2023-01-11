import React, {useState} from 'react';
import {ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useMutation} from 'react-query';
import {launchImageLibrary} from 'react-native-image-picker';
import useIssue from '../hooks/useIssue';
import {BACKEND_URL, URI_IMAGE} from '../consts/backend';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  formRowOne: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 150,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10,
    marginBottom: 10,
  },
});

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
    mediaType: 'photo',
  },
  includeBase64: true,
};

async function putData({id, data, image}) {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  // formData.append('image', image);
  const response = await fetch(`${BACKEND_URL}/issues/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  const json = await response.json();
  return json;
}

export default function BookEdit({route, navigation}) {
  const {issueId} = route.params;
  const {data: issue, isLoading, isSuccess} = useIssue({issueId});
  // const invalidateBook = useInvalidateBook({bookId}); //Missing to implement
  const [image, setImage] = useState(issue ? issue.image : '');
  const [title, setTitle] = useState(issue?.title);
  const [description, setDescription] = useState(issue?.description);
  const [date, setDate] = useState(issue?.date);
  const [status, setStatus] = useState(issue?.status);
  const [severity, setSeverity] = useState(issue?.severity);
  const [category, setCategory] = useState(issue?.category);
  const {mutate, isPosting} = useMutation(putData);

  // useEffect(
  //   function() {
  //     console.log('categoria validada');
  //     if (route.params?.selectedCategories) {
  //       setCategories(route.params?.selectedCategories);
  //     }
  //   },
  //   [route.params],
  // );

  async function handleSubmit() {
    let data = {
      title,
      description,
      date,
      status,
      severity,
      category,
    };
    await mutate({id: issue._id, data, image});
  }

  function launchImagePicker() {
    launchImageLibrary(options, response => {
      // console.log('Response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.error);
      } else {
        setImage(`${response.assets[0].base64}`);
      }
    });
  }

  // function handlePressEditCategories() {
  //   navigation.navigate(SELECT_CATEGORY_MODAL, {
  //     screen: SELECT_CATEGORY,
  //     params: {
  //       selectedCategories: categories,
  //     },
  //   });
  // }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Loading issue ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formRowOne}>
        <View>
          {/*{image && <Image source={{uri: `data:image/jpeg;base64,${image}`}} style={styles.image} />}*/}
          {image && <Image source={{uri: `${URI_IMAGE}${image}`}} style={styles.image} />}
          <Button onPress={launchImagePicker} title="Select Image" />
        </View>
      </View>
      <View>
        <View style={styles.formRowOne}>
          <Text>Title: </Text>
          <TextInput onChangeText={text => setTitle(text)} style={styles.textInput} value={title} />
        </View>
        <View style={styles.formRowOne}>
          <Text>Description: </Text>
          <TextInput onChangeText={description => setDescription(description)} style={styles.textInput} value={description} />
        </View>
        <View style={styles.formRowOne}>
          <Text>Date: </Text>
          <TextInput onChangeText={date => setDate(date)} style={styles.textInput} value={date} />
        </View>
        <View style={styles.formRowOne}>
          <Text>Status: </Text>
          <TextInput onChangeText={status => setStatus(status)} style={styles.textInput} value={status} />
        </View>
        <View style={styles.formRowOne}>
          <Text>Severity: </Text>
          <TextInput onChangeText={severity => setSeverity(severity)} style={styles.textInput} value={severity} />
        </View>
        <View style={styles.formRowOne}>
          <Text>Title: </Text>
          <TextInput onChangeText={category => setCategory(category)} style={styles.textInput} value={category} />
        </View>
      </View>
      <Button onPress={handleSubmit} title="Edit issue" />
      {isPosting && <Text>Editing issue...</Text>}
    </View>
  );
}
