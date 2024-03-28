import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SetupPasswordScreen = () => {
  const navigation = useNavigation();

  const handleResendMail = () => {
    // Handle resend email logic
    console.log('Resend email');

    // Navigate to the next screen (replace 'NextScreen' with the actual screen name)
    navigation.navigate('CreatePasswordScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SET UP PASSWORD</Text>
      <Text style={styles.description}>
        Tap the link we've sent to your registered
      </Text>
      <Text style={styles.description}>email to set up your password.</Text>
      <TouchableOpacity style={styles.button} onPress={handleResendMail}>
        <Text style={styles.buttonText}>Go to Mailbox</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resendButton} onPress={handleResendMail}>
        <Text style={styles.secondaryText}>
          Didn't receive email?{' '}
          <Text style={styles.resendButtonText}>Resend!</Text>
        </Text>
      </TouchableOpacity>
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
  secondaryText: {
    color: '#fff',
    marginBottom: height * 0.01,
  },
  title: {
    fontSize: width * 0.1,
    color: '#fff',
    marginBottom: 10,
    marginTop: height * -0.1,
  },
  description: {
    fontSize: 18,
    color: '#ccc',
  },
  button: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
    marginTop: 300,
  },
  buttonText: {
    fontSize: width * 0.05,
    color: '#000',
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: 20,
  },
  resendButtonText: {
    fontSize: 16,
    color: '#F7CF3D', // Lemon yellow color
    textDecorationLine: 'underline', // Underline style
  },
});

export default SetupPasswordScreen;
