import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from '../screens/DashboardScreen';
import { Text, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const DummyScreen = ({ name }: any) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name}</Text>
  </View>
);

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: '#AABB5D',
        tabBarInactiveTintColor: '#999',

        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },

        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <MaterialIcons name="home" size={size} color={color} />;
          }

          if (route.name === 'Likes') {
            return <Feather name="heart" size={size} color={color} />;
          }

          if (route.name === 'Bag') {
            return <Feather name="shopping-bag" size={size} color={color} />;
          }

          if (route.name === 'Profile') {
            return <Feather name="user" size={size} color={color} />;
          }

          if (route.name === 'Setting') {
            return (
              <Ionicons name="settings-outline" size={size} color={color} />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />

      <Tab.Screen name="Likes">
        {() => <DummyScreen name="Likes Screen" />}
      </Tab.Screen>

      <Tab.Screen name="Bag">
        {() => <DummyScreen name="Bag Screen" />}
      </Tab.Screen>

      <Tab.Screen name="Profile">
        {() => <DummyScreen name="Profile Screen" />}
      </Tab.Screen>

      <Tab.Screen name="Setting">
        {() => <DummyScreen name="Setting Screen" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
