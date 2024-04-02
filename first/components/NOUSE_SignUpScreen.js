import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [interests, setInterests] = useState('');

  const validateAndSignUp = () => {
    // Basic form validation
    if (!name || !dateOfBirth || !email || !city || !occupation || !interests) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }


    authenticateUser();
  };

  const authenticateUser = () => {
    // Dummy authentication logic (replace with your authentication mechanism)
    // For demonstration, assume user is signed up successfully
    Alert.alert('Success', 'User signed up successfully');
    // Navigate to sign in screen or any other screen as needed
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Occupation"
          value={occupation}
          onChangeText={setOccupation}
        />
        <TextInput
          style={styles.input}
          placeholder="Interests"
          value={interests}
          onChangeText={setInterests}
        />
        <TouchableOpacity style={styles.button} onPress={validateAndSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '80%',
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUp;
