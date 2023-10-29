import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import HomePage from './HomePage';
import RequestsPage from './RequestsPage';
import InvitePage from './InvitePage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
const Tab = createBottomTabNavigator();

const updateLoginStatus = (newLoginStatus) => {
  setLogin(newLoginStatus);
};

const App = () => {
  const [login, setLogin] = useState(false);
  return (
    <NavigationContainer>
      {login ? (
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
      ) : (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Login') {
              iconName = focused ? 'md-home' : 'md-home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Register') {
              iconName = focused ? 'user-circle' : 'user-circle-o';
              return <FontAwesome name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Login">
          {() => <LoginPage updateLoginStatus={setLogin} />}
        </Tab.Screen>
        <Tab.Screen name="Register">
          {() => <RegistrationPage updateLoginStatus={setLogin} />}
        </Tab.Screen>
      </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
