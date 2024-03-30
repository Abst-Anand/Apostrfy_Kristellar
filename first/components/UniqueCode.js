import React, { useState, useRef, useEffect } from "react";
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
  
  const navigation = useNavigation()

  const [code, setCode] = useState(['', '', '', '', '']);
  //const [isCodeComplete, setIsCodeComplete] = useState(false);
  const inputRefs = useRef([...Array(5)].map(() => React.createRef()));
  const [codeWarning, setCodeWarning] = useState('');

  const handleButtonClick = async () => {

    const isEmpty = code.some(input => input === '');
  
  if (isEmpty) {
    setCodeWarning('Please enter your code.');
    return;
  }

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
      Alert.alert("Nub: ",responseData.uniquecode);
      navigation.navigate("CreatePasswordScreen",{message: responseData.uniquecode});
    } else {
      Alert.alert(responseData.message);
    }
  };
 

  useEffect(() => {
    const filledInputs = code.filter(input => input !== '').length;
    //setIsCodeComplete(filledInputs === 5);
  }, [code]);

  const handleInputChange = (text, index) => {
    // Convert input text to uppercase
    text = text.toUpperCase();

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text === '' && index > 0) {
      // Move focus to the previous input if the current input is deleted
      inputRefs.current[index -1].focus();
    } else if (text === '' && index === 0) {
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
  {code.map((value, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              maxLength={1}
              autoCapitalize="characters" // Auto capitalize to uppercase
              keyboardType="ascii-capable" // ASCII capable keyboard
              value={value}
              onChangeText={(text) => handleInputChange(text, index)}
              ref={input => inputRefs.current[index] = input} // Correct ref assignment
              //placeholder="-"
              placeholderTextColor="grey" // Placeholder color
            />
          ))}
        </View>
        {codeWarning ? <Text style={styles.warning}>{codeWarning}</Text> : null}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Submit"
          onPress={handleButtonClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  warning: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    marginLeft: 25
  },
});

export default UniqueCode;
