import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const SignUp = ({ navigation }) => {
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.sidebarItem}>
          <Text style={styles.sidebarText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <Text style={styles.sidebarText}>Prompts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <Text style={styles.sidebarText}>Drops</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <Text style={styles.sidebarText}>Drops Notification</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Date of Birth" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="City" />
        <TextInput style={styles.input} placeholder="Occupation" />
        <TextInput style={styles.input} placeholder="Interests" />
        <TouchableOpacity style={styles.button} onPress={navigateToSignIn}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'space-between',
  },
  sidebarItem: {
    marginBottom: 20,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  main: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUp;
