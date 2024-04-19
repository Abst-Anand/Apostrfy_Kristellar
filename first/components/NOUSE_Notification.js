import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet,Text } from 'react-native';
import io from 'socket.io-client';

const {API} = require('../backend/handlers/api')
const App = () => {
  const [socket, setSocket] = useState(null);
  const [customId, setCustomId] = useState('');
  const [toUser, setToUser] = useState('');
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');

  useEffect(() => {
    const newSocket = io(API);
    setSocket(newSocket);

    newSocket.on('message', (data) => {
      
      // Handle the received message as needed
      setMessage2(data);
    });

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
      socket.emit('sendMessage', { fromUser:customId, toUser:toUser,message });
      setMessage('');
     
    } else {
      Alert.alert('Socket connection not established');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={customId}
        onChangeText={setCustomId}
      />
      <Button title="Click to Set Your Name" onPress={handleSetCustomId} />
      <TextInput
        style={styles.input}
        placeholder="Enter Partner's Name"
        value={toUser}
        onChangeText={setToUser}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter Message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Message" onPress={handleMessageSend} />

      <View style={{backgroundColor:'black',margin:30,width:100}}>
        <Text style={{color:'white'}}>{message2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40,
    
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
