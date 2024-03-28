import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const BiometricPage = () => {
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  // Check if biometric authentication (face scanning) is available on the device
  const checkBiometricAvailability = async () => {
    const available = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
    setBiometricAvailable(available);
  };

  // Handle biometric authentication
  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Scan your face to proceed', // Prompt message displayed during authentication
      });
      if (result.success) {
        Alert.alert('Success', 'Biometric authentication successful!');
      } else {
        Alert.alert('Error', 'Biometric authentication failed.');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      Alert.alert('Error', 'Biometric authentication failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enable Biometric</Text>
      <Text style={styles.description}>
        Biometric authentication allows you to securely access the app using your face scan.
      </Text>
      {biometricAvailable ? (
        <Button title="Start Face Scanner" onPress={handleBiometricAuth} />
      ) : (
        <Text style={styles.errorText}>Biometric authentication is not available on this device.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default BiometricPage;
