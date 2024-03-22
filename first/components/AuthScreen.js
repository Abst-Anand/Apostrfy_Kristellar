import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";

const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [interests, setInterests] = useState("");
  const [nameWarning, setNameWarning] = useState(false);
  const [dobWarning, setDobWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [cityWarning, setCityWarning] = useState(false);
  const [occupationWarning, setOccupationWarning] = useState(false);
  const [interestsWarning, setInterestsWarning] = useState(false);

  const validateForm = () => {
    // Validate input fields
    if (!name) {
      setNameWarning(true);
      return;
    }
    if (!email || !validateEmail(email)) {
      setEmailWarning(true);
      return;
    }
    if (!dob) {
      setDobWarning(true);
      return;
    }

    if (!city) {
      setCityWarning(true);
      return;
    }
    if (!occupation) {
      setOccupationWarning(true);
      return;
    }
    if (!interests) {
      setInterestsWarning(true);
      return;
    }
  };

  const handleSignup = async () => {
    validateForm();

    const formData = { name, email, dob, city, occupation, interests };
    console.log("formData: ", formData);

    const url = "http://localhost:3000/register";

    let result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    result = await result.json();

    if(result){
      console.warn(result)
    }
    // All fields are filled, continue with signup logic
    console.log(
      "Signing up with:",
      name,
      dob,
      email,
      city,
      occupation,
      interests
    );
    // Navigate to the login page after signing up
    // navigation.navigate('Login');
  };

  const formatDob = (text) => {
    // Automatically add slashes between day, month, and year
    let formattedText = text.replace(/\D/g, "");
    if (formattedText.length > 4) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(
        2,
        4
      )}/${formattedText.slice(4, 8)}`;
    } else if (formattedText.length > 2) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(
        2,
        4
      )}`;
    }
    return formattedText;
  };

  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => {
            setName(text);
            setNameWarning(false); // Clear warning when user starts typing
          }}
          value={name}
          autoCapitalize="words"
          placeholderTextColor="#999"
        />
        {nameWarning && <Text style={styles.warning}>Name is required</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
            setEmailWarning(false); // Clear warning when user starts typing
          }}
          value={email}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        {emailWarning && (
          <Text style={styles.warning}>Enter a valid email address</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (DD/MM/YYYY)"
          onChangeText={(text) => {
            const formattedText = formatDob(text);
            setDob(formattedText);
            setDobWarning(false); // Clear warning when user starts typing
          }}
          value={dob}
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor="#999"
        />
        {dobWarning && (
          <Text style={styles.warning}>Date of Birth is required</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="City"
          onChangeText={(text) => {
            setCity(text);
            setCityWarning(false); // Clear warning when user starts typing
          }}
          value={city}
          autoCapitalize="words"
          placeholderTextColor="#999"
        />
        {cityWarning && <Text style={styles.warning}>City is required</Text>}
        <TextInput
          style={styles.input}
          placeholder="Occupation"
          onChangeText={(text) => {
            setOccupation(text);
            setOccupationWarning(false); // Clear warning when user starts typing
          }}
          value={occupation}
          autoCapitalize="words"
          placeholderTextColor="#999"
        />
        {occupationWarning && (
          <Text style={styles.warning}>Occupation is required</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Interests"
          onChangeText={(text) => {
            setInterests(text);
            setInterestsWarning(false); // Clear warning when user starts typing
          }}
          value={interests}
          autoCapitalize="words"
          placeholderTextColor="#999"
        />

        {interestsWarning && (
          <Text style={styles.warning}>Interests are required</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.1,
  },
  title: {
    fontSize: width * 0.1,
    color: "#fff",
    marginBottom: height * 0.05,
  },
  inputContainer: {
    width: "100%",
    marginBottom: height * 0.03,
  },
  input: {
    width: "100%",
    height: height * 0.06,
    backgroundColor: "#333",
    borderRadius: 8,
    color: "#fff",
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  button: {
    width: "100%",
    height: height * 0.06,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  buttonText: {
    fontSize: width * 0.05,
    color: "#fff",
    fontWeight: "bold",
  },
  warning: {
    color: "red",
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
});

export default AuthScreen;
