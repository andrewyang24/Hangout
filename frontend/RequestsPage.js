import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const RequestsPage = () => {
  const [pendingInvites, setPendingInvitations] = useState([
    { id: 1, username: 'huahua' },
    { id: 2, username: 'wemmajia' },
    { id: 3, username: 'maxp06' },
    { id: 4, username: 'andrewyang24' },
  ]);

  const [sentInvites, setSentInvitations] = useState([
    { id: 10, username: 'kimchaewon' },
    { id: 11, username: 'hongeunchae' },
  ]);

  const handleAccept = (invitationId) => {
    const updatedInvitations = pendingInvites.filter((invitation) => invitation.id !== invitationId);
    setPendingInvitations(updatedInvitations);
    //backend
  };

  const handleReject = (invitationId) => {
    const updatedInvitations = pendingInvites.filter((invitation) => invitation.id !== invitationId);
    setPendingInvitations(updatedInvitations);
    //backend
  };

  const handleRescind = (invitationId) => {
    const updatedInvitations = sentInvites.filter((invitation) => invitation.id !== invitationId);
    setSentInvitations(updatedInvitations)
    //backend
  }

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
