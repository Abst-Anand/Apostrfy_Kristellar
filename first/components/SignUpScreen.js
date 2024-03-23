import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const SignUp = ({ navigation }) => {
  // const navigateToSignIn = () => {
  //   navigation.navigate('SignIn');
  // };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    city: "",
    occupation: "",
    interests: "",
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    console.log(formData)
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/register', formData);
      if (response.status === 200) {
        navigation.navigate('RegistrationSuccess');
      } else {
        Alert.alert('Error', 'Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
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
        <TextInput style={styles.input} placeholder="Name" onChangeText={(text)=> handleChange('name',text)}/>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(text)=> handleChange('email',text)}/>
        <TextInput style={styles.input} placeholder="Date of Birth" onChangeText={(text)=> handleChange('dob',text)}/>
        <TextInput style={styles.input} placeholder="City" onChangeText={(text)=> handleChange('city',text)}/>
        <TextInput style={styles.input} placeholder="Occupation" onChangeText={(text)=> handleChange('occupation',text)}/>
        <TextInput style={styles.input} placeholder="Interests" onChangeText={(text)=> handleChange('interests',text)}/>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "space-between",
  },
  sidebarItem: {
    marginBottom: 20,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  main: {
    flex: 3,
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUp;
