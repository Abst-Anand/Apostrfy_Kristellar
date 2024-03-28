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
import { Alert } from "react-native";
import { sendRequest } from "../backend/handlers/sendRequestFromUI";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [interests, setInterests] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const [nameWarning, setNameWarning] = useState(false);
  const [dobWarning, setDobWarning] = useState(false);
  const [dobDateWarning, setDobDateWarning] = useState(false);
  const [dobMonthWarning, setDobMonthWarning] = useState(false);
  const [dobYearWarning, setDobYearWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [cityWarning, setCityWarning] = useState(false);
  const [occupationWarning, setOccupationWarning] = useState(false);
  const [interestsWarning, setInterestsWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [retypePasswordWarning, setRetypePasswordWarning] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [retypePasswordVisibility, setRetypePasswordVisibility] = useState(false);

  const validateForm = () => {
    // Validate input fields
    if (!name) {
      setNameWarning(true);
      return;
    }
    if (!email || !validateEmail(email)) {
      setEmailWarning(true);
      return;
    } else {
      const uname = email.split("@")[0];
      setUserName(uname);
    }
    if (!dob) {
      setDobWarning(true);
      return;
    }
    if (dob) {
      const date = dob.split("/")[0];
      const month = dob.split("/")[1];
      const year = dob.split("/")[2];

      if (date <= 0 || date > 31) {
        setDobDateWarning(true);
        return;
      }

      if (month <= 0 || month > 12) {
        setDobMonthWarning(true);
        return;
      }

      if (year > 2004) {
        setDobYearWarning(true);
        return;
      }
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
    if (!password) {
      setPasswordWarning(true);
      return;
    }
    if (!retypePassword || retypePassword !== password) {
      setRetypePasswordWarning(true);
      return;
    }

    handleSignup();
  };

  const handleSignup = async () => {
    const formData = { name, email, dob, city, occupation, interests, password };

    resp = await sendRequest(formData, "/signup");

    if (resp.status === 200) {
      // Registration successful
      Alert.alert("Success", "User registered successfully!");
      navigation.navigate("UniqueCode");
    } else if (resp.status === 501) {
      //if already registered
      Alert.alert("Your email is already registered with us");
    } else {
      // Server error
      Alert.alert("Error", "Failed to register. Please try again.");
    }
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

  const togglePasswordVisibility = (field) => {
    // Toggle password visibility
    if (field === "password") {
      setPasswordVisibility(!passwordVisibility);
    } else if (field === "retypePassword") {
      setRetypePasswordVisibility(!retypePasswordVisibility);
    }
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
            setDobDateWarning(false); // Clear warning when user starts typing
            setDobMonthWarning(false); // Clear warning when user starts typing
            setDobYearWarning(false); // Clear warning when user starts typing
          }}
          value={dob}
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor="#999"
        />
        {dobWarning && (
          <Text style={styles.warning}>Date of Birth is required</Text>
        )}
        {dobDateWarning && (
          <Text style={styles.warning}>Date must be between 1 and 31</Text>
        )}
        {dobMonthWarning && (
          <Text style={styles.warning}>Month must be between 1 and 12</Text>
        )}
        {dobYearWarning        && (
          <Text style={styles.warning}>
            Year of Birth must be less than 2005
          </Text>
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

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
              setPasswordWarning(false); // Clear warning when user starts typing
            }}
            value={password}
            secureTextEntry={!passwordVisibility}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => togglePasswordVisibility("password")}
          >
            <MaterialIcons
              name={passwordVisibility ? "visibility-off" : "visibility"}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        {passwordWarning && (
          <Text style={styles.warning}>Password is required</Text>
        )}

        {/* Retype Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Retype Password"
            onChangeText={(text) => {
              setRetypePassword(text);
              setRetypePasswordWarning(false); // Clear warning when user starts typing
            }}
            value={retypePassword}
            secureTextEntry={!retypePasswordVisibility}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => togglePasswordVisibility("retypePassword")}
          >
            <MaterialIcons
              name={retypePasswordVisibility ? "visibility-off" : "visibility"}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        {retypePasswordWarning && (
          <Text style={styles.warning}>Passwords do not match</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={validateForm}>
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
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  buttonText: {
    fontSize: width * 0.05,
    color: "#000",
    fontWeight: "bold",
  },
  warning: {
    color: "red",
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
    width:300,
  },
  passwordInput: {
    flex: 1,
    height: height * 0.06,
    backgroundColor: "#333",
    borderRadius: 8,
    color: "#fff",
    paddingHorizontal: width * 0.03,
  },
  eyeIcon: {
    marginLeft: -width * 0.1,
  },
});

export default AuthScreen;

