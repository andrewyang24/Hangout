import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = (props) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    if (username === 'Test' && password === 'test') {
      props.updateLoginStatus(true);
      navigation.navigate('Login');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleRegisterClick = () => {
    navigation.navigate('Register');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Welcome to MyApp!</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Log In" onPress={handleLoginClick} />
        </View>
        <View style={styles.registerContainer}>
          <Text>Don't have an account?</Text>
          <Button title="Sign Up." onPress={handleRegisterClick} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    backgroundColor: 'red',
    color: 'red',
    
  }
});

export default LoginPage;
