/**
 * CreateUser component.
 *
 * Component contains form that gathers information sent to the Users Service
 * for user creation.
 */

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Form, FormItem} from 'react-native-form-component';
import {useMutation} from 'react-query';
import {USER_URL} from '@env';
import {SCREENS} from '../../constants';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 16,
    color: '#c00',
  },
  successText: {
    marginTop: 16,
    color: '#3dcc00',
  },
  container: {
    padding: 16,
  },
  formRowOne: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

async function postData({data}) {
  const response = await fetch(`${USER_URL}/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  console.log(json);
  return json;
}

function CreateUser({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const {mutate, isPosting, isSuccess} = useMutation(postData);

  async function handleSubmit() {
    console.log('Handling submit create user');
    let data = {
      name,
      email,
      password,
      confPassword,
    };
    await mutate({data});
    if (isSuccess) {
      setSuccess('User created');
      setError('');
      navigation.navigate(SCREENS.LOGIN);
    } else {
      setSuccess('');
      setError('Error creating user');
    }
  }

  return (
    <View style={styles.container}>
      <Form
        onButtonPress={handleSubmit}
        buttonText="Create User"
        buttonStyle={{backgroundColor: '#ec8103'}}>
        <View>
          <FormItem
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Name"
            isRequired
            asterik
          />
          <FormItem
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            isRequired
            asterik
          />
          <FormItem
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            isRequired
            asterik
          />
          <FormItem
            label="Confirm Password"
            value={confPassword}
            onChangeText={setConfPassword}
            placeholder="Confirm Password"
            isRequired
            asterik
          />
        </View>
        {isPosting && <Text>Creating User...</Text>}
        {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
        {success.length > 0 && (
          <Text style={styles.successText}>{success}</Text>
        )}
      </Form>
    </View>
  );
}

export default CreateUser;
