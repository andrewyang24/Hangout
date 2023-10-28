// HomePage.js
import React from 'react';
import { View, Text, Button } from 'react-native';

dummy = [
  {
  username: 'kc',
  phone: '123'
  },
  {
    username: 'hi',
    phone: '123'
    },
  {
    username: 'hello',
    phone: '123'
    },
]

const handleYesButton = () => {
  alert('Yes pressed')
};

const handleNoButton = () => {
  alert('No pressed')
};

const handleStopButton = () => {
  alert('Stop pressed')
};


const invites = dummy.map((user, i) => (
  <View>
    <Text>{user.username}</Text>
    <Text>{user.phone}</Text>
    <Button 
      title="Yes"
      onPress={handleYesButton}
      />
    <Button 
      title="No"
      onPress={handleNoButton}
      />
    <Button 
      title="STOP"
      onPress={handleStopButton}
      />
  </View>
));

const HomePage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Active Invitations</Text>
      {invites}
    </View>
  );
};

export default HomePage;
