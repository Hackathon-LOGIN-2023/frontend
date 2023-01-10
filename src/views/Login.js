import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import useAuthContext from '../hooks/useAuthContext';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 16,
    color: '#c00',
  },
});

function Login(props) {
  const {login} = useAuthContext();
  const [magicWord, setMagicWord] = useState('');
  const [error, setError] = useState('');

  function handlerSubmit() {
    if (magicWord === 'ariha') {
      login();
    } else {
      setError('Introduce the correct password');
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Wrote the password"
        value={magicWord}
        onChangeText={setMagicWord}
      />
      <Button title="Sign In" onPress={handlerSubmit} />
      {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default Login;