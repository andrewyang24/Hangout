import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

dummy = [
  { id: 1, username: 'nobody', phone: '336-508-1030'},
  { id: 2, username: 'friend1', phone: '123-456-7890'},
  { id: 3, username: 'friend2', phone: '123-123-1234'},
  { id: 4, username: 'friend3', phone: '123-111-2222'},
  { id: 5, username: 'friend4', phone: '13-122-2222'},
]

function handleToday(userName) {
    alert(`You have accepted the invitation from ${userName} for today!`);
}

function handleTomorrow(userName) {
    alert(`You plan to meet up with ${userName} for tomorrow. Don't flake!`);
  }
function handleNever(userName) {
    alert(`You have declined the invitation from ${userName} and will not be notified again. :(`);
}


const invitesList = ({ item })=> (
    <View style={styles.inviteItem}> 
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <View style={styles.buttonContainer}>
            <Button title='Today!' onPress={() => handleToday(item.username)} />
            <Button title='Tomorrow?' onPress={() => handleTomorrow(item.username)} />
            <Button title='Never' onPress={() => handleNever(item.username)} />
        </View>
    </View>
);

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Invitations</Text>
      <FlatList
        data={dummy}
        keyExtractor={(item) => item.id.toString()}
        renderItem={invitesList}
      ></FlatList>
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
       flexDirection:'column',
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
