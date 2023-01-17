import React, {useState} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {Form, FormItem, Picker} from 'react-native-form-component';
import {launchImageLibrary} from 'react-native-image-picker';
import {ADD_IMAGE, createPicker} from '../../constants';

export default function CreateIssue({navigation, route}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [severity, setSeverity] = useState(0);
  const [category, setCategory] = useState(0);
  const [image, setImage] = useState('');

  function launchImagePicker() {
    launchImageLibrary(
      {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
          mediaType: 'photo',
        },
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image picker error: ', response.error);
        } else {
          setImage(`${response.assets[0].base64}`);
        }
      },
    );
  }

  return (
    <Form
      onButtonPress={() =>
        console.log(
          `Title: ${title}\nDescription: ${desc}\nSeverity: ${severity}\nCategory: ${category}\n`,
        )
      }
      buttonText="Create"
      buttonStyle={{backgroundColor: '#ec8103'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={{uri: `${ADD_IMAGE}`}} style={styles.image} />
        <Button
          onPress={launchImagePicker}
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
    </Form>
  );
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
