import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const HomePage = () => {
  const [activeInvites, setActiveInvites] = useState([]);

  const fetchData = async () => {
    try {
      const currUserResponse = await fetch('http://10.20.20.24:3000/api/auth/curr');
      const currUserData = await currUserResponse.json();
      const currUser = currUserData.username;
  
      const currentUserResponse = await fetch(`http://10.20.20.24:3000/api/users/${currUser}`);
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

  function handleToday(userName) {
    alert(`You have accepted the invitation from ${userName} for today!`);
  }

  function handleTomorrow(userName) {
    alert(`You plan to meet up with ${userName} for tomorrow. Don't flake!`);
  }

  const handleHungout = async (userName) => {
    try {
      const currUserResponse = await fetch('http://10.20.20.24:3000/api/auth/curr');
      const currUserData = await currUserResponse.json();
      const currUser = currUserData.username;

      const hungoutResponse = await fetch(`http://10.20.20.24:3000/api/users/${currUser}/hungout`, {
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
      const currUserResponse = await fetch('http://10.20.20.24:3000/api/auth/curr');
      const currUserData = await currUserResponse.json();
      const currUser = currUserData.username;

      const dipResponse = await fetch(`http://10.20.20.24:3000/api/users/${currUser}/dip`, {
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
        <Button title='Today!' onPress={() => handleToday(`${item.firstName} ${item.lastName}`)} />
        <Button title='Tomorrow?' onPress={() => handleTomorrow(`${item.firstName} ${item.lastName}`)} />
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
