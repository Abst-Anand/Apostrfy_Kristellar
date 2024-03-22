import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const { width, height } = Dimensions.get('window');

const FingerprintHolder = ({ onSuccess }) => {
  const [isFingerprintActive, setIsFingerprintActive] = useState(false);

  useEffect(() => {
    initializeFingerprintScanner();
    return () => {
      FingerprintScanner.release();
    };
  }, []);

  const initializeFingerprintScanner = async () => {
    try {
      const isSensorAvailable = await FingerprintScanner.isSensorAvailable();
      if (isSensorAvailable) {
        console.log('Fingerprint sensor is available.');
      } else {
        console.error('Fingerprint sensor is not available.');
      }
    } catch (error) {
      console.error('Error initializing fingerprint scanner:', error);
    }
  };

  const authenticateFingerprint = async () => {
    setIsFingerprintActive(true);
    try {
      const isSensorAvailable = await FingerprintScanner.isSensorAvailable();
      if (!isSensorAvailable) {
        console.log('Fingerprint sensor is not available.');
        return;
      }

      const result = await FingerprintScanner.authenticate({
        title: 'Log in with fingerprint',
        message: 'Touch the fingerprint sensor',
        fallbackEnabled: true,
      });

      setIsFingerprintActive(false);
      if (result) {
        onSuccess();
      } else {
        console.log('Fingerprint authentication failed');
      }
    } catch (error) {
      setIsFingerprintActive(false);
      console.error('Fingerprint authentication error:', error);
    }
  };

  return (
    <View style={styles.fingerprintHolder}>
      <TouchableOpacity style={styles.fingerprintButton} onPress={authenticateFingerprint}>
        {isFingerprintActive ? (
          <Text style={styles.fingerprintText}>Scanning...</Text>
        ) : (
          <Image
            source={require('../assets/images.jpeg')}
            style={styles.fingerprintImage}
          />
        )}
      </TouchableOpacity>
      <View style={styles.fingerprintBase} />
    </View>
  );
};

const FingerprintScreen = ({ navigation }) => {
  const handlePasswordInsteadPress = () => {
    // Handle password login logic
    navigation.navigate('Login');
  };

  const handleFingerprintSuccess = () => {
    console.log('Fingerprint authentication successful');
    // Navigate to the next screen or perform other actions
    navigation.navigate('NextScreen'); // Replace 'NextScreen' with the actual screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME BACK!</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>
          Use your device's biometric sensor to log back into your App account
        </Text>
        <FingerprintHolder onSuccess={handleFingerprintSuccess} />
        <Text style={styles.fingerprintText}>Touch the fingerprint sensor</Text>
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
  fingerprintHolder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  fingerprintButton: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fingerprintImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  fingerprintBase: {
    width: width * 0.1,
    height: width * 0.0001,
    backgroundColor: '#000',
    marginTop: height * 0.01,
  },
  fingerprintText: {
    fontSize: width * 0.04,
    color: '#ccc',
    marginBottom: height * 0.03,
    marginTop: 0,
    marginLeft: 33,
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

export default FingerprintScreen;
