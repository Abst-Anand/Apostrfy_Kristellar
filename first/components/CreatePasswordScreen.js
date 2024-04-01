import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icon library

const { width, height } = Dimensions.get("window");

import { sendRequest } from "../backend/handlers/sendRequestFromUI";
import {hashPassword} from "../backend/hash/hasher";

console.log(hashPassword)

const CreatePasswordScreen = () => {
  const route = useRoute();
  // const uniqueCode = route.params.message;

  const navigation = useNavigation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const checkMisMatch = async () => {
    try {
      if (newPassword === confirmPassword) {
        const hashed = await hashPassword(newPassword, 10);
        console.log(hashed);
        setNewPassword(hashed);
        setConfirmPassword(hashed);
        // handleCreatePassword(); // Add User's password only if passwords match
      } else {
        // Passwords don't match, display error message and underline confirm password input in red
        setError("Password mismatch");
      }
    } catch (error) {
      // Handle error here
      console.error("Error in checkMisMatch:", error);
    }
  };
  

  const handleCreatePassword = async () => {
    const formData = { userUniqueCode: uniqueCode, userPassword: newPassword };

    const response = await sendRequest(formData, "/signup/createpassword");

    navigation.navigate("SplashScreen");
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GENERATE PASSWORD </Text>
      <Text style={styles.text}>To help secure your account</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Enter New Password"
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry={!newPasswordVisible}
            placeholderTextColor="#999"
          />
          <TouchableWithoutFeedback onPress={toggleNewPasswordVisibility}>
            <FontAwesome
              name={newPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#F7CF3D"
              style={styles.eyeIcon}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={!confirmPasswordVisible}
            placeholderTextColor="#999"
          />
          <TouchableWithoutFeedback onPress={toggleConfirmPasswordVisibility}>
            <FontAwesome
              name={confirmPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#F7CF3D"
              style={styles.eyeIcon}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={checkMisMatch}>
        <Text style={styles.buttonText}>Generate Password</Text>
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
    fontSize: 33,
    color: "#fff",
    marginBottom: 10,
  },
  text: {
    fontSize: width * 0.001,
    color: "#ccc",
    marginTop: 1,
    marginBottom: 50,
  },
  inputContainer: {
    width: "100%",
    marginBottom: height * 0.03,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F7CF3D", // Yellow underline color
    marginBottom: height * 0.02,
  },
  input: {
    flex: 1,
    height: height * 0.06,
    color: "#fff",
    paddingHorizontal: width * 0.03,
  },
  eyeIcon: {
    padding: 10,
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
  errorText: {
    fontSize: width * 0.04,
    color: "red",
    marginBottom: height * 0.02,
  },
  inputError: {
    borderBottomColor: "red", // Red underline color for error
  },
});

export default CreatePasswordScreen;
