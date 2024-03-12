import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic
    console.log('Logging in with:', email, password);
  };

  const handleForgetPassword = () => {
    // Navigate to the ForgetPasswordScreen when "Forget Password" is pressed
    navigation.navigate('ForgetPasswordScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME BACK!</Text>
      <Text style={[styles.title, { fontSize: 18, color: '#73777B' }]}>Enter your password to continue</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      {/* Use onPress to call handleForgetPassword when "Forget Password" is pressed */}
      <TouchableOpacity onPress={handleForgetPassword}>
        <Text style={styles.forgetPasswordText}>Forget Password</Text>
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
  buttonText: {
    fontSize: width * 0.05,
    color: '#000000',
    fontWeight: 'bold',
  },
  forgetPasswordText: {
    fontSize: width * 0.04,
    color: '#6499E9',
    marginLeft: 200,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
