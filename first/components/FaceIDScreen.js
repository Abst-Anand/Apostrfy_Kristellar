import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import * as Biometrics from 'react-native-biometrics';

const { width, height } = Dimensions.get('window');

const FaceIDHolder = ({ onSuccess }) => {
  const [isFaceIDActive, setIsFaceIDActive] = useState(false);

  useEffect(() => {
    checkBiometricsAvailability();
  }, []);

  const checkBiometricsAvailability = async () => {
    try {
      const { available, biometryType } = await Biometrics.isSensorAvailable();
      if (available && biometryType === Biometrics.BiometryType.FACE_ID) {
        console.log('Face ID is available.');
      } else {
        console.log('Face ID is not available.');
      }
    } catch (error) {
      console.error('Biometrics error:', error);
    }
  };

  const authenticateFaceID = async () => {
    setIsFaceIDActive(true);
    try {
      const { success } = await Biometrics.authenticate('Authenticate with Face ID');
      setIsFaceIDActive(false);
      if (success) {
        onSuccess();
      } else {
        console.log('Face ID authentication failed');
      }
    } catch (error) {
      setIsFaceIDActive(false);
      console.error('Face ID authentication error:', error);
    }
  };

  return (
    <View style={styles.faceIDHolder}>
      <TouchableOpacity style={styles.faceIDButton} onPress={authenticateFaceID}>
        {isFaceIDActive ? (
          <Text style={styles.faceIDText}>Scanning...</Text>
        ) : (
          <Image
            source={require('../assets/ff.png')}
            style={styles.faceIDImage}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.faceIDMessage}>Face ID authentication required</Text>
    </View>
  );
};

const FaceIDScreen = ({ navigation }) => {
  const handlePasswordInsteadPress = () => {
    console.log('LoginScreen');
    navigation.navigate('Login');
    // Handle password login logic
  };

  const handleFaceIDSuccess = () => {
    console.log('Face ID authentication successful');
    navigation.navigate('NextScreen'); // Replace 'NextScreen' with the actual screen name
    // Navigate to the next screen or perform other actions
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME BACK!</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>Use Face ID to log back into your Apostrfy account</Text>
        <FaceIDHolder onSuccess={handleFaceIDSuccess} />
        <TouchableOpacity style={styles.passwordInstead} onPress={handlePasswordInsteadPress}>
          <Text style={styles.passwordInsteadText}>Use password instead</Text>
        </TouchableOpacity>
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
    borderColor: '#F7CF3D', // Yellow border
    borderWidth: 4,
  },
  boxText: {
    fontSize: width * 0.04,
    color: '#fff',
    marginBottom: height * 0.03,
    marginLeft: 18,
  },
  faceIDHolder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  faceIDButton: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceIDImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  faceIDText: {
    fontSize: width * 0.04,
    color: '#ccc',
    marginBottom: height * 0.03,
    marginTop: 0,
    marginLeft: 33,
  },
  faceIDMessage: {
    fontSize: width * 0.04,
    color: '#ccc',
    marginBottom: height * 0.03,
    marginTop: height * 0.01,
  },
  passwordInstead: {
    backgroundColor: '#000',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 8,
  },
  passwordInsteadText: {
    fontSize: width * 0.05,
    color: '#F7CF3D',
    textAlign: 'center',
    marginLeft: 10,
  },
});

export default FaceIDScreen;
