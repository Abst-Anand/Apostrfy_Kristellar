// UniqueCode.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const UniqueCode = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleButtonClick = () => {
    // Add your logic to check the unique code and navigate to the login page
    // For now, let's just navigate to a placeholder screen named 'Login'
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UNIQUE CODE</Text>
      <Text style={styles.subtitle}>Please enter your unique code</Text>

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
            ref={(input) => (this[`inputRef${index}`] = input)}
          />
        ))}
      </View>

      <Button title="Submit" onPress={handleButtonClick} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  },
  codeInput: {
    width: 40,
    height: 40,
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
  },
});

export default UniqueCode;
