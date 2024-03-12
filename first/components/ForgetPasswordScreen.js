import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Handle reset password logic
    console.log('Reset password for:', email);
  };

  const handleForgetPassword = () => {
    // Navigate to the ForgetPasswordScreen when "Forget Password" is pressed
    navigation.navigate('ForgetPasswordScreen');
  };

  const handleCamera = () => {
    // Navigate to the CameraScreen when "Camera" is pressed
    navigation.navigate('CameraScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FORGOT PASSWORD</Text>
      <Text style={[styles.subtitle, { fontSize: 18, color: '#73777B' }]}>
        Tell us your email address, and we'll get
      </Text>
      <Text style={[styles.subtitle, { fontSize: 18, color: '#73777B' }]}>
        you back on track with no time.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cameraButton} onPress={handleCamera}>
        <Text style={styles.buttonText}>Camera</Text>
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
  title: {
    fontSize: width * 0.1,
    color: '#fff',
    marginBottom: height * 0.006,
  },
  subtitle: {
    color: '#fff',
    marginBottom: height * 0.02,
  },
  inputContainer: {
    width: '100%',
    marginTop: height * 0.08,
    marginBottom: height * 0.03,
  },
  input: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#333',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  button: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  cameraButton: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: 'skyblue',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  buttonText: {
    fontSize: width * 0.05,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default ForgetPasswordScreen;
