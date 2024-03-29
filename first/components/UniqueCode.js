import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const UniqueCode = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const inputRefs = useRef([...Array(5)].map(() => React.createRef()));

  const handleButtonClick = () => {
    // Add your logic to check the unique code and navigate to the login page
    // For now, let's just navigate to a placeholder screen named 'Login'
    //console.warn(code)
    const validCode = code.join('') === '5ROHY'; // Example validation logic
    if (validCode) {
      // Navigate to the next screen if the code is valid
      console.warn(code) // Replace 'Login' with your actual screen name
    } else {
      // Code is not valid, handle accordingly (show error message, clear inputs, etc.)
      console.warn('Invalid code. Please try again.');
      // Clear inputs
      setCode(['', '', '', '', '']);
      // Set focus on the first input
      inputRefs.current[0].focus();
    }
  };
  useEffect(() => {
    const filledInputs = code.filter(input => input !== '').length;
    setIsCodeComplete(filledInputs === 5);
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
        <Text style={styles.subtitle}>Please enter your Unique Invite Code</Text>

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
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleButtonClick} disabled={!isCodeComplete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 100, // Adjust paddingBottom to make space for the button
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    color: 'white',
    marginTop: 100,
    letterSpacing: 5,
    //paddingHorizontal: 70,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginVertical: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  codeInput: {
    width: 40,
    height: 50,
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    borderRightWidth: 3,
    borderColor: 'grey',
    color: 'white',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default UniqueCode;
