// HomePage.js
import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

dummy = [
  { id: 1, username: 'Huajing', phone: '336-508-1030'},
  { id: 2, username: 'iasdf', phone: '123'},
  { id: 3, username: 'sdfg', phone: '123'},
  { id: 4, username: 'qewr', phone: '123'},
  { id: 5, username: 'jdgh', phone: '13'},
  { id: 6, username: 'wert', phone: '12345'},
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
