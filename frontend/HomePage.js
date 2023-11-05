import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from './AuthContext';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [activeInvites, setActiveInvites] = useState([]);

  const fetchData = async () => {
    try {
      const currentUserResponse = await fetch(`http://10.20.20.24:3000/api/users/${user.username}`);
      const currentUserData = await currentUserResponse.json();
  
      const activeInvites = await Promise.all(currentUserData.active.map(async (username, index) => {
        const userResponse = await fetch(`http://10.20.20.24:3000/api/users/${username}`);
        const userData = await userResponse.json();
  
        return {
          id: index + 1,
          username,
          firstName: userData.first || '',
          lastName: userData.last || '',
          phone: userData.phone || '',
        };
      }));
  
      setActiveInvites(activeInvites);
    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );


  function handleTomorrow(userName, userPhone) {
    const messageBody = `Hey ${userName}, ${user.username} is not available to meet up today. Maybe tomorrow!`;
  
    // Make a request to your backend to send an SMS
    fetch('http://10.20.20.24:3000/api/users/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: userPhone,
        body: messageBody,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(`You have notified ${userName} that you're not available today!`);
        } else {
          alert('Failed to send SMS. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error sending SMS:', error);
        alert('An error occurred while sending SMS.');
      });
  }

  function handleToday(userName, userPhone) {
    const messageBody = `Hey ${userName}, ${user.username} is available to meet up today!`;
  
    // Make a request to your backend to send an SMS
    fetch('http://10.20.20.24:3000/api/users/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: userPhone,
        body: messageBody,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(`You have notified ${userName} that you're available today!`);
        } else {
          alert('Failed to send SMS. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error sending SMS:', error);
        alert('An error occurred while sending SMS.');
      });
  }
  

  const handleHungout = async (userName) => {
    try {
      const hungoutResponse = await fetch(`http://10.20.20.24:3000/api/users/${user.username}/hungout`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUser: userName,
        }),
      });

      if (hungoutResponse.ok) {
        alert(`You have hungout with ${userName} and earned a friendship point!`);
        fetchData(); // Refresh the data after making changes
      } else {
        console.error('Failed to mark as hungout. Please try again.');
      }
    } catch (error) {
      console.error('Error during hungout request:', error);
    }
  };

  const handleNever = async (userName) => {
    try {
      const dipResponse = await fetch(`http://10.20.20.24:3000/api/users/${user.username}/dip`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUser: userName,
        }),
      });

      if (dipResponse.ok) {
        alert(`You have declined the invitation from ${userName} and will not be notified again. :(`);
        fetchData();
      } else {
        console.error('Failed to dip hangout. Please try again.');
      }
    } catch (error) {
      console.error('Error during dip request:', error);
    }
  };

  const invitesList = ({ item }) => (
    <View style={styles.inviteItem}>
      <Text style={styles.username}>{`${item.firstName} ${item.lastName}`}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
      <View style={styles.buttonContainer}>
        <Button title='Hungout' onPress={() => handleHungout(item.username)} />
        <Button title='Today!' onPress={() => handleToday(item.username, item.phone)} />
        <Button title='Tomorrow?' onPress={() => handleTomorrow(item.username, item.phone)} />
        <Button title='Never' onPress={() => handleNever(item.username)} />
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Invitations</Text>
      <FlatList
        data={activeInvites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={invitesList}
      />
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inviteItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  username: {
    fontSize: 18,
  },
  phone: {
    fontSize: 18,
  },
});

export default HomePage;
