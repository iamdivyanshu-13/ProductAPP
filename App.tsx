import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './src/screens/SplashScreen';
import GetStartedScreen from './src/screens/GetStartedScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';

export type RootStackParamsList = {
  SplashScreen: undefined;
  GetStartedScreen: undefined;
  DashboardScreen: undefined;
  ProductDetailsScreen: { productId: number };
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
  const linking = {
    prefixes: [
      'https://io.pixelsoftwares.com',
      'io.pixelsoftwares.com',
      'http://127.0.0.1:5500',
      'http://192.168.1.49:5500',
      'pixelproduct://',
    ],
    config: {
      screens: {
        SplashScreen: 'splash',
        GetStartedScreen: 'get-started',
        ProductDetailsScreen: {
          path: 'product/:productId',
          parse: {
            productId: (productId: string) => parseInt(productId, 10),
          },
        },
        DashboardScreen: '*', // Catch-all: matches any path like /test.txt, /home, etc.
      },
    },
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer 
        linking={linking}
        fallback={<SplashScreen />}
      >
        <Stack.Navigator 
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
          <Stack.Screen name="DashboardScreen" component={BottomTabNavigator}/>
          <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
