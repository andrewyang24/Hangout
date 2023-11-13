import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AuthContext from './AuthContext';
import defaultProfilePic from './assets/default-pfp.png';
import Constants from 'expo-constants';

const ProfilePage = (props) => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const serverUrl = Constants.expoConfig.extra.serverUrl;
      const responseUser = await fetch(`${serverUrl}/api/users/${user.username}`);
      const userData = await responseUser.json();
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [user])
  );

  const handleLogout = () => {
    logout();
    props.updateLoginStatus(false);
  };

  const profilePictureUri = userData && userData.profilePicture ? { uri: userData.profilePicture } : defaultProfilePic;

  // If userData is null, render a loading text or a spinner
  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.username}>Username: {user.username}</Text>
        <View style={styles.profilePictureContainer}>
          <Image
            source={profilePictureUri}
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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text>Logout</Text>
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
  logoutButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
    marginBottom: 10,
  },
});

export default ProfilePage;
