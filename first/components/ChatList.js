import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Assuming you have Ionicons installed

const ChatList = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [connections, setConnections] = useState([
    { id: '1', name: 'Uday Bhanu', lastMessage: 'Hey there!', profileImage: require('../assets/IMG_1616.jpg') },
    { id: '2', name: 'Debashis Sundaray ', lastMessage: 'Hello!', profileImage: require('../assets/IMG_1617.jpg') },
    { id: '3', name: 'Sumit Kumar Panda', lastMessage: 'Hello!', profileImage: require('../assets/86e8411b-9d19-4bc4-b420-5b57c8aa30be.jpg') },
    { id: '4', name: 'Satyanarayan Mishraw', lastMessage: 'Hello!', profileImage: require('../assets/IMG_1618.jpg') },
    { id: '5', name: 'Anand Raj', lastMessage: 'Hello!', profileImage: require('../assets/pic1.png') },
    { id: '6', name: 'Priyanka Mohakud', lastMessage: 'Hello!', profileImage: require('../assets/priya (1).jpg') },
    { id: '7', name: 'Manisha Choudhary', lastMessage: 'Hello!', profileImage: require('../assets/mani.jpg') },// Add more connections as needed
  ]);
  const [filteredConnections, setFilteredConnections] = useState([]);

  // Add a sample profile to demonstrate
  const unknownPersons = [
    { id: '8', name: 'Animesh Parhi', lastMessage: '', profileImage: require('../assets/IMG_1615.jpg') },
    { id: '11', name: 'Subhrajeet Jena', lastMessage: '', profileImage: require('../assets/IMG_1642.jpg') },
    { id: '9', name: 'Ayushi Srivas', lastMessage: '', profileImage: require('../assets/IMG_1645.jpg') },
    { id: '15', name: 'Neha Kathar', lastMessage: '', profileImage: require('../assets/IMG_1647.jpg') },
    { id: '12', name: 'Anushka Sharma', lastMessage: '', profileImage: require('../assets/IMG_1644.jpg') },
    { id: '13', name: 'Alekshya Mishra', lastMessage: '', profileImage: require('../assets/IMG_1646.jpg') },
    { id: '14', name: 'KirtiRekha Behera', lastMessage: '', profileImage: require('../assets/IMG_1648.jpg') },
    ...connections.filter((conn) => !conn.lastMessage)
  ].slice(0); // Exclude the first two items

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredList = connections.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredConnections(filteredList);
  };

  const handleProfilePress = (item) => {
    // Navigate to private message section passing the user's information
    navigation.navigate('Pvtmsg', { user: item });
  };

  const renderChatItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderDeleteButton(item.id)}>
      <TouchableOpacity style={styles.chatItem} onPress={() => handleProfilePress(item)}>
        <Image source={item.profileImage} style={styles.profilePicture} />
        <View style={styles.chatContent}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  const renderDeleteButton = (itemId) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteConnection(itemId)}>
      <Feather name="trash-2" size={24} color="red" />
    </TouchableOpacity>
  );

  const handleDeleteConnection = (itemId) => {
    // Logic to delete connection with itemId
    setConnections(connections.filter(conn => conn.id !== itemId));
  };

  const closeModalAndNavigate = () => {
    setShowModal(false);
    // Navigate to chat list screen
    navigation.navigate("ChatList");
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.timesButton} onPress={closeModalAndNavigate}>
                <Icon name='times' color={'white'} />
            </TouchableOpacity>
                <Text style={styles.title}>Add Connection</Text>
                <Text style={styles.subtitle}>Scan QR code or enter their code</Text>

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
                    <TouchableOpacity style={styles.button} onPress={closeModalAndNavigate}>
                            <Text style={{color:'white'}}>Send Request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={{ color: '#57A89F', top: 50, right: 225}} >Scan QR code</Text>
                    </TouchableOpacity>
                </View>
          </View>
        </View>
      </Modal>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#ccc"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity
      style={styles.addUserButton}
      onPress={() => {
        navigation.navigate('ConnectionList'); // Navigate to 'NextScreen' on button press
      }}
    >
      <Feather name="user-plus" size={24} color="#fff" />
    </TouchableOpacity>
      </View>

      {/* Say Hi! Section */}
      <View style={styles.sayHiContainer}>
        <Text style={styles.sayHiText}>Say hi !</Text>
        <FlatList
          data={unknownPersons}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProfilePress(item)}>
              <Image source={item.profileImage} style={styles.smallProfilePicture} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {/* Messages Title */}
      <Text style={styles.messagesTitle}>Messages</Text>

      {/* Chat List */}
      <FlatList
        data={searchQuery ? filteredConnections : connections}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black background color
    padding: 16,
    marginTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333', // Search bar background color
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  searchIcon: {
    marginLeft: 8,
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff', // Text color
    fontSize: 16,
  },
  addUserButton: {
    backgroundColor: '#4d7e79',
    borderRadius: 8,
    padding: 8,
  },
  sayHiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sayHiText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Text color
    marginRight: 8,
  },
  smallProfilePicture: {
    width: 50,
    height: 70,
    borderRadius: 20,
    marginRight: 8,
  },
  messagesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Text color
    marginBottom: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  chatContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Text color
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#ccc', // Text color
  },
  deleteButton: {
    backgroundColor: 'transparent', // No background for delete button
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 775,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: 775,
    backgroundColor: '#000000',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingHorizontal: 10,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    color: 'white',
    marginTop: 100,
    left: 70,
    //paddingHorizontal: 10,
    bottom:50,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginVertical: 10,
    left: 30,
    bottom:50,
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
    bottom:180,
    left: 130,
  },
  button: {
    //top: 20,
    width: 200,
    height: 50,
    borderRadius: 20, // half of the height to make it oval
    backgroundColor: '#0D1C1C', // example background color
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'white',
    borderWidth: 1,
    alignSelf: 'center',
    right: 80,
  },
  timesButton: {
    width: 30,
    height: 30,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    left: 280,
  },
});

export default ChatList;
