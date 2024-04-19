import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080'; // Update with your server URL

const App = () => {
  const [socket, setSocket] = useState(null);
  const [customId, setCustomId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSetCustomId = () => {
    if (socket) {
      socket.emit('setCustomId', customId);
      Alert.alert('Custom ID set successfully');
    } else {
      Alert.alert('Socket connection not established');
    }
  };

  const handleMessageSend = () => {
    if (socket) {
      socket.emit('sendMessage', { customId, message });
      setMessage('');
      Alert.alert('Message sent successfully');
    } else {
      Alert.alert('Socket connection not established');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Custom ID"
        value={customId}
        onChangeText={setCustomId}
      />
      <Button title="Set Custom ID" onPress={handleSetCustomId} />
      <TextInput
        style={styles.input}
        placeholder="Enter Message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Message" onPress={handleMessageSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default App;
