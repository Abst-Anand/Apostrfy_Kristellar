import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const { width, height } = Dimensions.get('window');

const WelcomePage = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object

  const handleFingerprintPress = () => {
    // Navigate to the FingerprintScreen when "Fingerprint" is pressed
    navigation.navigate('FingerprintScreen');
  };

  const handleFaceIdPress = () => {
    // Navigate to the FaceIdScreen when "Face ID" is pressed
    navigation.navigate('FaceIDScreen');
  };

  const handlePasswordPress = () => {
    // Navigate to the PasswordScreen when "Password" is pressed
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME BACK!</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>
          Select your preference
        </Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={handleFingerprintPress}>
            <Text style={styles.optionText}>Fingerprint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleFaceIdPress}>
            <Text style={styles.optionText}>Face ID</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handlePasswordPress}>
            <Text style={styles.optionText}>Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.1,
  },
  title: {
    fontSize: width * 0.1,
    color: '#fff',
    marginBottom: height * 0.09,
    marginTop: 100,
  },
  box: {
    width: '100%',
    height: '50%',
    backgroundColor: '#000000',
    padding: width * 0.1,
    borderRadius: 10,
    borderColor: '#F7CF3D', // Lemon color border
    borderWidth: 4,
  },
  boxText: {
    fontSize: width * 0.05,
    marginLeft:30,
    color: '#fff',
    marginBottom: height * 0.03,
  },
  optionsContainer: {
    marginTop: height * 0.02,
  },
  option: {
    backgroundColor: '#fff',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 8,
    marginBottom: height * 0.02,
  },
  optionText: {
    fontSize: width * 0.04,
    color: '#000',
    marginLeft:60,
  },
});

export default WelcomePage;
