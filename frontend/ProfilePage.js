import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from './AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const serverUrl = 'http://10.20.20.24:3000';
      const responseUser = await fetch(`${serverUrl}/api/users/${user.username}`);
      const userData = await responseUser.json();
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        fetchData();
      }
    }, [user])
  );

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.username}>Username: {user.username}</Text>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: userData.profilePicture }} // Replace with the actual user's profile picture URL
            style={styles.profilePicture}
          />
          <TouchableOpacity style={styles.editPictureButton}>
            <Text>Edit Picture</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userInfo}>First Name: {userData.first}</Text>
        <Text style={styles.userInfo}>Last Name: {userData.last}</Text>
        <Text style={styles.userInfo}>Score: {userData.points}</Text>
      </View>
      <TouchableOpacity style={styles.settingsButton}>
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profilePictureContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  editPictureButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 20,
    marginTop: 10,
  },
  settingsButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
  },
});

export default ProfilePage;