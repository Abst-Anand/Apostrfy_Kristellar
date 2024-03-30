import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { sendRequest } from "../backend/handlers/sendRequestFromUI";

const UniqueCode = () => {
  const navigation = useNavigation();

  const [code, setCode] = useState("");
  const [codeWarning, setCodeWarning] = useState(false);

  const handleButtonClick = async () => {
    let t = "";
    for (let i = 0; i < 5; i++) {
      let tmp = code.toString();
      let temp = tmp.split(",");
      if (!temp[i]) {
        setCodeWarning(true);
        break;
      } else t += temp[i];
    }
    const formData = { code: t };
    const response = await sendRequest(formData, "/unique");
    const responseData = await response.json();
    if (responseData.status) {
      Alert.alert("Nub: ", responseData.uniquecode);
      navigation.navigate("CreatePasswordScreen", {
        message: responseData.uniquecode,
      });
    } else {
      Alert.alert(responseData.message);
    }
  };

  const handleInputChange = (text, index) => {
    // Convert input text to uppercase
    text = text.toUpperCase();

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text === "" && index > 0) {
      // Move focus to the previous input if the current input is deleted
      inputRefs.current[index - 1].focus();
    } else if (text === "" && index === 0) {
      // Clear the current input and keep focus on it
      inputRefs.current[index].clear();
    } else if (text.length === 1 && index < 4) {
      // Move focus to the next input
      inputRefs.current[index + 1].focus();
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>UNIQUE CODE</Text>
        <Text style={styles.subtitle}>
          Please enter your Unique Invite Code
        </Text>

        <View style={styles.codeContainer}>
          {[...Array(5)].map((_, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="ascii-capable"
              onChangeText={(text) => {
                if (text.length === 1 && index < 4) {
                  // Move focus to the next input
                  this[`inputRef${index + 1}`].focus();
                }
                // Update the code state
                setCode((prevCode) => {
                  const newCode = [...prevCode];
                  newCode[index] = text;
                  return newCode;
                });
              }}
              onKeyPress={({ nativeEvent: { key } }) => {
                if (key === "Backspace" && index > 0 && !code[index] - 1) {
                  // Move focus to the previous input
                  this[`inputRef${index - 1}`].focus();
                }
              }}
              ref={(input) => (this[`inputRef${index}`] = input)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleButtonClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  warning: {
    color: "red",
    fontSize: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "normal",
    color: "white",
    marginTop: 100,
    letterSpacing: 5,
    //paddingHorizontal: 70,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    marginVertical: 10,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  codeInput: {
    width: 40,
    height: 50,
    fontSize: 20,
    textAlign: "center",
    margin: 5,
    borderRightWidth: 3,
    borderColor: "grey",
    color: "white",
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: 20,
  },
});

export default UniqueCode;
