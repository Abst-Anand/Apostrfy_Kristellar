import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Easing, Image, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SplashScreen = () => {


  const route = useRoute();
  const uniqueCode = route.params.uniquecode;

  const logoScale = new Animated.Value(0);
  const titleOpacity = new Animated.Value(0);
  const rideOpacity = new Animated.Value(0);
  const navigation = useNavigation();

  useEffect(() => {
    // Logo animation
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      // After logo animation completes, start title and ride animations
      Animated.sequence([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(rideOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Redirect to second animation page
        navigation.navigate('SecondAnimation',{uniquecode: uniqueCode});
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
        <Image
          source={require('../assets/apostrfy-mascot-logo-white.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View style={[styles.textContainer, { opacity: titleOpacity }]}>
        <Text style={styles.title}>YOU COMPLETE US</Text>
        <Text style={styles.ride}>Enjoy the ride</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Set your background color
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoImage: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
  },
  textContainer: {
    position: 'absolute',
    top: '20%', // Adjust as needed to position the texts above the logo
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // White text color
    marginBottom: 10,
  },
  ride: {
    fontSize: 18,
    color: '#FFF', // White text color
  },
});

export default SplashScreen;
