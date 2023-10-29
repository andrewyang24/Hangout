import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';


const InvitePage = () => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleSubmit = async (user) => {
    if (user === '') {
      alert('Invalid Username');
      return;
    }
  
    try {
      const currUserResponse = await fetch('http://10.20.20.24:3000/api/auth/curr');
      const currUserData = await currUserResponse.json();
      const currUser = currUserData.username;
  
      const hangoutResponse = await fetch(`http://10.20.20.24:3000/api/users/${currUser}/hangout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUser: user,
        }),
      });
  
      if (hangoutResponse.ok) {
        alert('Invitation Sent');
        setUsername('');
      } else {
        alert('Failed to send invitation. Please try again.');
      }
    } catch (error) {
      console.error('Error during hangout request:', error);
      alert('An error occurred during the hangout request');
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Invite a friend to meet up</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <Button title="Send Invite" onPress={() => handleSubmit(username)} />
      </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
  },
});

export default InvitePage;

