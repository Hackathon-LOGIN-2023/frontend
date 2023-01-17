import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAuthContext} from '../../contexts/auth';
import {Form, FormItem} from 'react-native-form-component';
import {SCREENS} from '../../constants';
import {useMutation} from 'react-query';
import {USER_URL} from '@env';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 16,
    color: '#c00',
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
  const response = await fetch(`${USER_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  console.log('User Creation result: ', json);
  return json;
}

function Login({navigation}) {
  const {login} = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {mutate, isPosting, isSuccess} = useMutation(postData);

  async function handleSubmit() {
    let dataCheck = {
      email,
      password,
    };
    await mutate({dataCheck});
    if (isSuccess) {
      login();
    } else {
      setError('Introduce the correct password');
    }
  }

  function createUser() {
    navigation.navigate(SCREENS.CREATE_USER);
  }

  return (
    <View style={styles.container}>
      <Form
        onButtonPress={handleSubmit}
        buttonText="Sign In"
        buttonStyle={{backgroundColor: '#ec8103'}}>
        <View>
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
          <View style={styles.formRowOne}>
            <Text>Don't have a user, </Text>
            <Text style={{color: 'blue'}} onPress={() => createUser()}>
              create user
            </Text>
          </View>
        </View>
        {isPosting && <Text>Editing issue...</Text>}
        {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
      </Form>
    </View>
  );
}

export default Login;
