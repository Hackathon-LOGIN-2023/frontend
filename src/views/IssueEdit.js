import React, {useState} from 'react';
import {ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useMutation} from 'react-query';
import {launchImageLibrary} from 'react-native-image-picker';
import useIssue from '../hooks/useIssue';
import {BACKEND_URL} from '../consts/backend';

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
    minWidth: 150,
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

async function putData({data, id}) {
  const response = await fetch(`${BACKEND_URL}/issues/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
}

export default function BookEdit({route, navigation}) {
  const {issueId} = route.params;
  const {data: issue, isLoading, isSuccess} = useIssue({issueId});
  // const invalidateBook = useInvalidateBook({bookId}); //Missing to implement
  const [title, setTitle] = useState(issue?.title);
  const [image, setImage] = useState(issue ? issue.image : '');
  // const [categories, setCategories] = useState(
  //   book?.categories.map(c => ({...c})),
  // );
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
    };
    if (image.includes('data:image/jpeg;base64')) {
      data = {
        ...data,
        image: image,
      };
    }
    await mutate({data, id: issue._id});
  }

  function launchImagePicker() {
    launchImageLibrary(options, response => {
      // console.log('Response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.error);
      } else {
        setImage(`data:image/jpeg;base64, ${response.assets[0].base64}`);
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
          {image && <Image source={{uri: image}} style={styles.image} />}
          <Button onPress={launchImagePicker} title="Select Image" />
        </View>
        <TextInput
          onChangeText={text => setTitle(text)}
          style={styles.textInput}
          value={title}
        />
      </View>
      <View>
        {/*{categories.map(category => (*/}
        {/*  <Text key={`category--${category.id}`}>{category.name}</Text>*/}
        {/*))}*/}
        <Text>{issueId}</Text>
      </View>
      <Button onPress={handleSubmit} title="Edit issue" />
      {isPosting && <Text>Editing issue...</Text>}
    </View>
  );
}
