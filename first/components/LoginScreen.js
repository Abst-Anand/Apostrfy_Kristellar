import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to track password visibility

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  const handleLogin = () => {
    console.log('Logging in with:', password);
    navigation.navigate('UniqueCode');
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPasswordScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME BACK!</Text>
      <Text style={[styles.title, { fontSize: 18, color: '#73777B' }]}>Enter your password to continue</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!isPasswordVisible} // Use secureTextEntry based on password visibility state
          placeholder="Password"
          placeholderTextColor="#999"
          caretHidden={false}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
          <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="#F7CF3D" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F7CF3D',
    marginTop: height * 0.08,
    marginBottom: height * 0.03,
  },
  input: {
    flex: 1,
    height: height * 0.06,
    color: '#fff',
    fontSize: width * 0.04,
  },
  eyeIcon: {
    padding: 10,
    
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
