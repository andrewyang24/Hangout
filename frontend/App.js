// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Page 1" component={Page1} />
        <Tab.Screen name="Page 2" component={Page2} />
        <Tab.Screen name="Page 3" component={Page3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
