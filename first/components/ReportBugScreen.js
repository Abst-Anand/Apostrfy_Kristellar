import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';

const ReportBugScreen = () => {
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSendReport = () => {
    const words = message.split(' ');
    if (words.length > 200) {
      Alert.alert('Error', 'Report should not exceed 200 words.');
      return;
    }
    console.log('Report sent:', message);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const dismissKeyboard = () => {
    if (Platform.OS === 'web') {
      document.activeElement.blur();
    } else {
      Keyboard.dismiss();
    }
  };
  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to grant permission to access the gallery.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const formData = new FormData();
      formData.append('profileImage', {
        uri: result.uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });

      fetch('https://example.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(async response => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Upload successful:', data);
          Alert.alert('Image uploaded', 'The image has been successfully uploaded.');
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          Alert.alert('Upload failed', error.message || 'An error occurred while uploading the image.');
        });
    }

    setShowChangeProfile(false);
  };

  const handleTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to grant permission to access the camera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const formData = new FormData();
      formData.append('profileImage', {
        uri: result.uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });

      fetch('https://example.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(async response => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Upload successful:', data);
          Alert.alert('Image uploaded', 'The image has been successfully uploaded.');
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          Alert.alert('Upload failed', error.message || 'An error occurred while uploading the image.');
        });
    }

    setShowChangeProfile(false);
  };

  return (
    
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.boxTitle}>Report Bug</Text>
          <View style={styles.messageBox}>
            <TextInput
              style={styles.messageInput}
              multiline
              numberOfLines={6}
              placeholder="Describe the bug here..."
              placeholderTextColor="#fff"
              value={message}
              onChangeText={setMessage}
            />
          </View>
          <TouchableOpacity style={styles.sendMessageButton} onPress={handleSendReport}>
            <Text style={styles.sendMessageButtonText}>Send Report</Text>
          </TouchableOpacity>
        </View>
        {/* Popup */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showPopup}
          onRequestClose={handleClosePopup}
        >
          <TouchableWithoutFeedback onPress={handleClosePopup}>
            <View style={styles.popupContainer}>
              <View style={styles.popupBox}>
                <Text style={styles.popupTitle}>Thank You!</Text>
                <Text style={styles.popupText}>We will look into it.</Text>
                <Text style={styles.popupClose}>Close</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {/* End Popup */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  messageBox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
    width: '90%',
  },
  messageInput: {
    color: '#fff',
    padding: 10,
    textAlignVertical: 'top',
    height: 120,
  },
  sendMessageButton: {
    backgroundColor: '#4d7e79',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
  },
  sendMessageButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    backgroundColor: '#0A2E36',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
  popupClose: {
    fontSize: 16,
    color: '#ccc',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default ReportBugScreen;
