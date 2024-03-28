import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const UniqueCode = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleButtonClick = () => {
    // Add your logic to check the unique code and navigate to the login page
    // For now, let's just navigate to a placeholder screen named 'Login'
    navigation.navigate('WriteThoughtScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>UNIQUE CODE</Text>
        <Text style={styles.subtitle}>Please enter your Unique Invite ode</Text>

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
        if (key === 'Backspace' && index > 0 && !code[index]-1) {
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
  // buttonContainer: {
  //   position: 'absolute',
  //   bottom: 20, // Adjust bottom value as needed
  //   alignSelf: 'center',
  // },
});

export default UniqueCode;
