import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GetStartedButton from '../Components/Button';
const backgroundImage = require('../assests/images/Intro.png');

const GetStartedScreen = ({ navigation }: any) => {
  const handleGetStarted = () => {
    navigation.navigate('DashboardScreen');
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          imageStyle={styles.imageStyle}
          resizeMode="cover"
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Feel your personal expression by choosing the latest design of
              furniture
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <GetStartedButton
              title="Get Started"
              backgroundColor="#A3B65A"
              textColor="#000"
              onPress={handleGetStarted}
            />
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 30,
    overflow: 'hidden',
  },

  background: {
    flex: 1,
    justifyContent: 'space-between',
  },

  imageStyle: {
    borderRadius: 30,
  },

  textContainer: {
    paddingHorizontal: 24,
    paddingTop: '30%',
  },

  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#000',
    lineHeight: 30,
  },

  buttonContainer: {
    alignItems: 'center',
    marginBottom: '20%',
  },
});
