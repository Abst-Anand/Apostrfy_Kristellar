import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigation = useNavigation(); // Get navigation object

  const handleChangePassword = () => {
    // Validation logic here
    if (!currentPassword) {
      setCurrentPasswordError('Please enter your current password');
      return;
    } else {
      setCurrentPasswordError('');
    }

    if (!newPassword) {
      setNewPasswordError('Please enter a new password');
      return;
    } else {
      setNewPasswordError('');
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    } else {
      setConfirmPasswordError('');
    }

    // Password change logic here
    console.log('Changing password...');
  };

  const handleCamera = () => {
    // Navigate to the CameraScreen when camera button is pressed
    navigation.navigate('FaceAuthenticationScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        onChangeText={setCurrentPassword}
        value={currentPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />
      {currentPasswordError ? <Text style={styles.error}>{currentPasswordError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="New Password"
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />
      {newPasswordError ? <Text style={styles.error}>{newPasswordError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />
      {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cameraButton} onPress={handleCamera}>
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  cameraButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ChangePasswordScreen;
