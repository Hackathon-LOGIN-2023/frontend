import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useMutation} from 'react-query';
import {Form, FormItem, Picker} from 'react-native-form-component';
import {createPicker} from '../consts/multiplechoice';
import {launchImageLibrary} from 'react-native-image-picker';
import useIssue from '../hooks/useIssue';
import {ISSUES_URL, URI_IMAGE} from '../consts/backend';

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
  const response = await fetch(`${ISSUES_URL}/issues/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  const json = await response.json();
  return json;
}

export default function BookEdit({route}) {
  const {issueId} = route.params;
  const {data: issue, isLoading} = useIssue({issueId});
  const [image, setImage] = useState(issue ? issue.image : '');
  const [severity, setSeverity] = useState(issue?.severity);
  const [category, setCategory] = useState(issue?.category);
  const [updateDesc, setUpdateDesc] = useState('');
  const {mutate, isPosting} = useMutation(putData);

  async function handleSubmit() {
    let data = {
      severity,
      category,
    };
    await mutate({id: issue._id, data, image});
  }

  function launchImagePicker() {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.error);
      } else {
        setImage(`${response.assets[0].base64}`);
      }
    });
  }

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
      <Form
        onButtonPress={handleSubmit}
        buttonText="Give Update"
        buttonStyle={{backgroundColor: '#ec8103'}}>
        <View style={styles.formRowOne}>
          <View>
            {image && (
              <Image
                source={{uri: `${URI_IMAGE}${image}`}}
                style={styles.image}
              />
            )}
            <Button
              onPress={launchImagePicker}
              title="Select Image"
              color="#ec8103"
            />
          </View>
        </View>
        <View>
          <FormItem
            label="Update Description"
            value={updateDesc}
            onChangeText={setUpdateDesc}
            placeholder="Update Description"
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
        </View>
        {isPosting && <Text>Editing issue...</Text>}
      </Form>
    </View>
  );
}
