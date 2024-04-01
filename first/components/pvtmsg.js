import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons for horizontal send icon

const Pvtmsg = ({ route, navigation }) => {
  const { user } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    // Example messages for testing
    { id: 1, text: 'Hello, how are you?', sender: 'other' },
    { id: 2, text: 'Can we meet tomorrow?', sender: 'user' },
    { id: 3, text: 'Sure, let\'s meet at 2 PM.', sender: 'other' },
  ]);
  const scrollViewRef = useRef();

  const handleThreeDotMenu = () => {
    // Logic for handling the three-dot menu options
    Alert.alert(
      'Options',
      '',
      [
        {
          text: 'Block Profile',
          onPress: handleBlockProfile,
        },
        {
          text: 'Report Profile',
          onPress: handleReportProfile,
        },
        {
          text: 'Remove Connection',
          onPress: handleRemoveConnection,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleBlockProfile = () => {
    Alert.alert(
      'Block Profile',
      `Are you sure you want to block ${user.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Block',
          onPress: () => {
            console.log(`Blocked ${user.name}`);
            showSuccessPopup('Blocked successfully');
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  const handleReportProfile = () => {
    const reportOptions = [
      { text: 'Bullying', onPress: () => showSuccessPopup('Reported for Bullying successfully') },
      { text: 'Offensive', onPress: () => showSuccessPopup('Reported as Offensive successfully') },
      { text: 'Hate', onPress: () => showSuccessPopup('Reported for Hate successfully') },
      { text: 'Others', onPress: handleOthersReport },
      { text: 'Cancel', style: 'cancel' }
    ];
  
    Alert.alert(
      'Report Profile',
      `Are you sure you want to report ${user.name}?`,
      reportOptions,
      { cancelable: false },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log(`Reported ${user.name} for Bullying`);
            break;
          case 1:
            console.log(`Reported ${user.name} as Offensive`);
            break;
          case 2:
            console.log(`Reported ${user.name} as Hate`);
            break;
          case 3:
            handleOthersReport();
            break;
          default:
            break;
        }
      }
    );
  };
  

  
  const handleOthersReport = () => {
    let otherReason = '';

    Alert.prompt(
      'Other Reason',
      'Please specify the reason:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: (inputValue) => {
            console.log(`Reported ${user.name} with reason: ${inputValue}`);
            showSuccessPopup('Reported successfully');
          },
        },
      ],
      'plain-text',
      '',
      { cancelable: false }
    );
  };
  
  const handleRemoveConnection = () => {
    Alert.alert(
      'Remove Connection',
      `Are you sure you want to remove the connection with ${user.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            console.log(`Removed connection with ${user.name}`);
            showSuccessPopup('Connection removed successfully');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const showSuccessPopup = (message) => {
    Alert.alert('Success', message);
  };

  const handleSendMessage = () => {
    const newMessage = { id: messages.length + 1, text: message, sender: 'user' };
    setMessages([...messages, newMessage]);
    setMessage('');
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -200} // Adjusted offset for Android
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleThreeDotMenu}>
            <MaterialIcons name="more-vert" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image source={user.profileImage} style={styles.profileImage} />
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
        </View>

        <View style={styles.messagesContainer}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.message,
                msg.sender === 'user' ? styles.userMessage : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type your message here..."
          placeholderTextColor="#8e8e8e"
          multiline
          numberOfLines={3}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialIcons name="send" style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  messagesContainer: {
    paddingBottom: 100,
  },
  message: {
    maxWidth: '80%',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#128C7E',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#075e54',
  },
  messageText: {
    color: '#FFFFFF',
  },
  messageInputContainer: {
    borderWidth: 2,
    borderColor: '#075e54',
    borderRadius: 30,
    paddingTop: 8,
    paddingBottom: 13,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageInput: {
    borderWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    flex: 1,
    fontSize: 16,
    fontStyle: 'italic',
  },
  sendButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Pvtmsg;
