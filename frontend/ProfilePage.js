import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

user = {
  firstName: "John",
  lastName: "Doe",
  score: 2,
}

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.username}>@johndoe</Text>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png' }} // Use the actual URL or require the image source
            style={styles.profilePicture}
          />
          <TouchableOpacity style={styles.editPictureButton}>
            <Text>Edit Picture</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userInfo}>{user.firstName}</Text>
        <Text style={styles.userInfo}>{user.lastName}</Text>
        <Text style={styles.userInfo}>Score: {user.score}</Text>
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
