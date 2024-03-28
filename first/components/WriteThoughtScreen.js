import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

const WriteThoughtScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [showChangeProfile, setShowChangeProfile] = useState(false);

  const handleInvite = () => {
    // Navigate to the CameraScreen when "Camera" is pressed
    navigation.navigate('InviteFriendsScreen');
  };

  const handleProfilePress = () => {
    // Navigate to the settings screen when profile picture is clicked once
    navigation.navigate('SettingsScreen');
  };

  const handleProfileLongPress = () => {
    setShowChangeProfile(true);
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
    <LinearGradient colors={['#040504', '#040504']} style={styles.container}>
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={handleProfilePress} // Handle single press on profile picture
        onLongPress={handleProfileLongPress}
      >
        <Image
          source={require('../assets/gg.png')}
          style={styles.profilePicture}
        />
      </TouchableOpacity>

      {showChangeProfile && (
        <View style={styles.changeProfileContainer}>
      
            <Text style={styles.changeProfileTitleText}>Change Profile Picture</Text>
        
          <Text style={styles.changeProfileText}>
            Make sure your face is visible for accurate matching.
            Ensure the uploaded picture corresponds to the face.
          </Text>
          <TouchableOpacity style={styles.changeProfileOption} onPress={handleChoosePhoto}>
            <Text style={styles.changeProfileOptionText}>Choose Photo from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.changeProfileOption} onPress={handleTakePicture}>
            <Text style={styles.changeProfileOptionText}>Click Picture</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showChangeProfile && (
        <TouchableOpacity style={styles.startButton} onPress={handleInvite}>
          <LinearGradient colors={['#040504', '#22c1c3']} style={styles.startButtonInner}>
            <Text style={styles.startButtonText}>H!-F(R)N</
            Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        {/* Footer buttons */}
        <FooterButton icon="home" onPress={() => navigation.navigate('WriteThoughtScreen')} />
        <FooterButton icon="message-circle" onPress={() => navigation.navigate('ChatList')} />
        <FooterButton icon="map-pin" onPress={() => navigation.navigate('BiometricPage')} />
        <FooterButton icon="users" onPress={() => navigation.navigate('ConnectionScreen')} />
        <FooterButton icon="bell" onPress={() => navigation.navigate('notification')} />
      </View>
    </LinearGradient>
  );
};

const FooterButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.footerButton} onPress={onPress}>
      <Feather name={icon} size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#11235a',
  },
  profileContainer: {
    width: '40%',
    height: height * 0.3,
    backgroundColor: '#11235a',
    borderRadius: 110,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 120,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  changeProfileContainer: {
    width: '80%',
    backgroundColor: 'transparent',
    borderRadius: 19,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    position: 'absolute',
    height: '30%',
    bottom: height * 0.1,
    zIndex: 1,
  },
  changeProfileTitle: {
    width: '80%',
    borderRadius: 2,
    alignItems: 'center',
    marginBottom: 10,
  },
  changeProfileTitleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  changeProfileText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 30,
    marginTop: 13,
  },
  changeProfileOption: {
    backgroundColor: '#22c1c3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  changeProfileOptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  startButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: height * 0.1,
    zIndex: 1,
  },
  startButtonInner: {
    width: 148,
    height: 148,
    borderRadius: 74,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerButton: {
    padding: 10,
  },
});

export default WriteThoughtScreen;
