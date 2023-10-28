import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import HomePage from './HomePage';
import RequestsPage from './RequestsPage';
import InvitePage from './InvitePage';
import ProfilePage from './ProfilePage';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'md-home' : 'md-home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Requests') {
            iconName = focused ? 'ios-list-sharp' : 'ios-list';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Invite') {
            iconName = focused ? 'person-add' : 'person-add-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user-circle' : 'user-circle-o';
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Requests" component={RequestsPage} />
        <Tab.Screen name="Invite" component={InvitePage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
