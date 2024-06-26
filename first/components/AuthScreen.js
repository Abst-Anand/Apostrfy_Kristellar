import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { sendRequest } from "../backend/handlers/sendRequestFromUI";
//import { MaterialIcons } from "@expo/vector-icons";
import { MultiSelect } from 'react-native-element-dropdown';

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
  //const [password, setPassword] = useState("");
  // const [retypePassword, setRetypePassword] = useState("");

  const [nameWarning, setNameWarning] = useState(false);
  const [dobWarning, setDobWarning] = useState(false);
  const [dobDateWarning, setDobDateWarning] = useState(false);
  const [dobMonthWarning, setDobMonthWarning] = useState(false);
  const [dobYearWarning, setDobYearWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [cityWarning, setCityWarning] = useState(false);
  const [occupationWarning, setOccupationWarning] = useState(false);
  const [interestsWarning, setInterestsWarning] = useState(false);
  // const [passwordWarning, setPasswordWarning] = useState(false);
  // const [retypePasswordWarning, setRetypePasswordWarning] = useState(false);

  // const [passwordVisibility, setPasswordVisibility] = useState(false);
  // const [retypePasswordVisibility, setRetypePasswordVisibility] = useState(false);
  

  const data = [
    { label: 'Software Development' },
    { label: 'Data Science' },
    { label: 'Machine Learning' },
    { label: 'Artificial Intelligence' },
    { label: 'Web Development' },
    { label: 'Mobile Development' },
    { label: 'Cybersecurity' },
    { label: 'Network Engineering' },
    { label: 'Cloud Computing' },
    { label: 'DevOps' },
    { label: 'Database Administration' },
    { label: 'UI/UX Design' },
    { label: 'Game Development' },
    { label: 'Embedded Systems' },
    { label: 'Robotics' },
    { label: 'Virtual Reality/Augmented Reality' },
    { label: 'Internet of Things (IoT)' },
    { label: 'Big Data Analytics' },
    { label: 'Blockchain Technology' },
    { label: 'Bioinformatics' }
];

    const navigateToLoginScreen = () => {
      navigation.navigate('Login'); 
    };

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
    // if (!password) {
    //   setPasswordWarning(true);
    //   return;
    // }
    // if (!retypePassword || retypePassword !== password) {
    //   setRetypePasswordWarning(true);
    //   return;
    // }

    handleSignup();
  };

  const handleSignup = async () => {
    const formData = { name, email, dob, city, occupation, interests};

    resp = await sendRequest(formData, "/signup");
    respData = await resp.json()
    if (respData.status) {
      // Registration successful
      Alert.alert(respData.message);
      navigation.navigate("UniqueCode");
    } else {
      //if already registered
      Alert.alert(respData.message);
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

  // const togglePasswordVisibility = (field) => {
  //   // Toggle password visibility
  //   if (field === "password") {
  //     setPasswordVisibility(!passwordVisibility);
  //   } else if (field === "retypePassword") {
  //     setRetypePasswordVisibility(!retypePasswordVisibility);
  //   }
  // };

  return (
    <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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


        <MultiSelect
        style={styles.input}
        data={data}
        labelField="label"
        valueField="label"
        placeholder="Select your Intrest Area"
        value={interests}
        onChange={(item) => { setInterests(item); setInterestsWarning(false);}}
        placeholderStyle={{color: 'grey', fontSize: 14.5}}
        containerStyle={{backgroundColor: '#333', borderColor: '#333', borderRadius: 10}}
        itemTextStyle={{color: 'grey'}}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Interests"
          onChangeText={(text) => {
            setInterests(text);
            setInterestsWarning(false); // Clear warning when user starts typing
          }}
          value={interests}
          autoCapitalize="words"
          placeholderTextColor="#999"
        /> */}

        {interestsWarning && (
          <Text style={styles.warning}>Interests are required</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={validateForm}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToLoginScreen}>
      <Text style={{ color: 'white' }}>Already Registered?</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView:{
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.1,
    paddingTop:height / 8
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
    fontSize:15,
    color: "#000",
    fontWeight: "bold",
  },
  warning: {
    color: "red",
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  

});

export default AuthScreen;

