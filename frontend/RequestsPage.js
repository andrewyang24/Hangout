import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from './AuthContext';
import Constants from 'expo-constants';

const RequestsPage = () => {
  const { user } = useContext(AuthContext);
  const [pendingInvites, setPendingInvitations] = useState([]);
  const [sentInvites, setSentInvitations] = useState([]);

  const fetchData = async () => {
    try {
      const serverUrl = Constants.expoConfig.extra.serverUrl;
      const currentUserResponse = await fetch(`${serverUrl}/api/users/${user.username}`);
      const currentUserData = await currentUserResponse.json();

      setPendingInvitations(currentUserData.incoming.map((username, index) => ({ id: index + 1, username })));
      setSentInvitations(currentUserData.outgoing.map((username, index) => ({ id: index + 10, username })));
    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleAccept = async (invitationId) => {
    try {
      const targetUser = pendingInvites.find((invitation) => invitation.id === invitationId)?.username;

      if (!targetUser) {
        console.error('Invalid invitation ID');
        return;
      }

      const serverUrl = Constants.expoConfig.extra.serverUrl;
      const acceptResponse = await fetch(`${serverUrl}/api/users/${user.username}/acceptincoming`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUser,
        }),
      });

      if (acceptResponse.ok) {
        const updatedInvitations = pendingInvites.filter((invitation) => invitation.id !== invitationId);
        setPendingInvitations(updatedInvitations);
      } else {
        console.error('Failed to accept invitation. Please try again.');
      }
    } catch (error) {
      console.error('Error during accept request:', error);
    }
  };

  const handleReject = async (invitationId) => {
    try {
      const targetUser = pendingInvites.find((invitation) => invitation.id === invitationId)?.username;

      if (!targetUser) {
        console.error('Invalid invitation ID');
        return;
      }

      const serverUrl = Constants.expoConfig.extra.serverUrl;
      const rejectResponse = await fetch(`${serverUrl}/api/users/${user.username}/rejectincoming`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUser,
        }),
      });

      if (rejectResponse.ok) {
        const updatedInvitations = pendingInvites.filter((invitation) => invitation.id !== invitationId);
        setPendingInvitations(updatedInvitations);
      } else {
        console.error('Failed to reject invitation. Please try again.');
      }
    } catch (error) {
      console.error('Error during reject request:', error);
    }
  };

  const handleRescind = async (invitationId) => {
    try {
      const targetUser = sentInvites.find((invitation) => invitation.id === invitationId)?.username;

      if (!targetUser) {
        console.error('Invalid invitation ID');
        return;
      }

      const serverUrl = Constants.expoConfig.extra.serverUrl;
      const rescindResponse = await fetch(`${serverUrl}/api/users/${user.username}/rescind`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUser,
        }),
      });

      if (rescindResponse.ok) {
        // Rescind request successful
        const updatedInvitations = sentInvites.filter((invitation) => invitation.id !== invitationId);
        setSentInvitations(updatedInvitations);
      } else {
        // Handle the case when the rescind request fails
        console.error('Failed to rescind invitation. Please try again.');
      }
    } catch (error) {
      console.error('Error during rescind request:', error);
    }
  };

  const renderPendingInvite = ({ item }) => (
    <View style={styles.invitationItem}>
      <Text style={styles.username}>{item.username}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Accept" onPress={() => handleAccept(item.id)} />
        <Button title="Reject" onPress={() => handleReject(item.id)} />
      </View>
    </View>
  );

  const renderSentInvite = ({ item }) => (
    <View style={styles.invitationItem}>
      <Text style={styles.username}>{item.username}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Rescind" onPress={() => handleRescind(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Invitations</Text>
        <View style={{ flex: 1 }}>
          <FlatList
            data={pendingInvites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPendingInvite}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sent Invites</Text>
        <View style={{ flex: 1 }}>
          <FlatList
            data={sentInvites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSentInvite}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    flex: 1, 
    marginBottom: 20, 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  invitationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default RequestsPage;
