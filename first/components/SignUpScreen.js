<<<<<<< HEAD
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const SignUp = ({ navigation }) => {
  // const navigateToSignIn = () => {
  //   navigation.navigate('SignIn');
  // };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    city: "",
    occupation: "",
    interests: "",
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    console.log(formData)
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/register', formData);
      if (response.status === 200) {
        navigation.navigate('RegistrationSuccess');
      } else {
        Alert.alert('Error', 'Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
=======
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

    // Additional validation (e.g., email format)
    // You can use libraries like 'validator' for more robust validation

    // If all fields are filled, proceed with authentication (dummy authentication for demonstration)
    authenticateUser();
  };

  const authenticateUser = () => {
    // Dummy authentication logic (replace with your authentication mechanism)
    // For demonstration, assume user is signed up successfully
    Alert.alert('Success', 'User signed up successfully');
    // Navigate to sign in screen or any other screen as needed
    navigation.navigate('SignIn');
>>>>>>> cd26cd070ee0986f6ce3afe964fd337a08e0a945
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
<<<<<<< HEAD
        <TextInput style={styles.input} placeholder="Name" onChangeText={(text)=> handleChange('name',text)}/>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(text)=> handleChange('email',text)}/>
        <TextInput style={styles.input} placeholder="Date of Birth" onChangeText={(text)=> handleChange('dob',text)}/>
        <TextInput style={styles.input} placeholder="City" onChangeText={(text)=> handleChange('city',text)}/>
        <TextInput style={styles.input} placeholder="Occupation" onChangeText={(text)=> handleChange('occupation',text)}/>
        <TextInput style={styles.input} placeholder="Interests" onChangeText={(text)=> handleChange('interests',text)}/>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
=======
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
>>>>>>> cd26cd070ee0986f6ce3afe964fd337a08e0a945
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    flexDirection: "row",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "space-between",
  },
  sidebarItem: {
    marginBottom: 20,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  main: {
    flex: 3,
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
=======
    justifyContent: 'center',
    alignItems: 'center',
>>>>>>> cd26cd070ee0986f6ce3afe964fd337a08e0a945
  },
  main: {
    width: '80%',
  },
  input: {
<<<<<<< HEAD
    width: "100%",
=======
>>>>>>> cd26cd070ee0986f6ce3afe964fd337a08e0a945
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
<<<<<<< HEAD
    width: "100%",
=======
>>>>>>> cd26cd070ee0986f6ce3afe964fd337a08e0a945
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUp;
