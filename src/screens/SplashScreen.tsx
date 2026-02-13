import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { RootStackParamsList } from '../../App';    

import { NativeStackScreenProps } from '@react-navigation/native-stack';

type SplashScreenProps = NativeStackScreenProps<RootStackParamsList, 'SplashScreen'>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('GetStartedScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="zoomIn"
        duration={2000}
        style={styles.logo}
      >
        PixelProduct
      </Animatable.Text>

      <Animatable.Text
        animation="fadeInUp"
        delay={500}
        duration={2000}
        style={styles.subtitle}
      >
        Welcome
      </Animatable.Text>
    </View>
  );
};
    

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
});
