import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Assuming you have Ionicons installed
import { Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons } from '@expo/vector-icons'; // Import Entypo from Expo


const ChatList = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatList, setChatList] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [code, setCode] = useState('');
  
  // Function to handle searching chats
  const handleSearch = (text) => {
    setSearchQuery(text);
    // Implement your logic to filter chat list based on searchQuery
    // For example, you could filter the chatList array based on user names or chat content
    const filteredChats = dummyChatList.filter(chat => chat.name.toLowerCase().includes(text.toLowerCase()));
    setChatList(filteredChats);
  };

  // Dummy chat list data
  const dummyChatList = [
    { 
        id: 1, 
        name: 'John Doe', 
        picture: require("./assets/download.jpeg"),
        lastMessage: 'Hey there!',
        //time: '10:20',
    },
    { 
        id: 2, 
        name: 'Jane Smith', 
        picture: require("./assets/girl.jpg"),
        lastMessage: 'How are you?',
        //time: '10:20', 
    },
    { 
        id: 3, 
        name: 'Jane Smith', 
        picture: require("./assets/girl.jpg"),
        lastMessage: 'How are you?',
        //time: '10:20', 
    },
    { 
        id: 4, 
        name: 'Jane Smith', 
        picture: require("./assets/girl.jpg"),
        lastMessage: 'How are you?',
        //time: '10:20',
    },
    { 
        id: 5, 
        name: 'Jane Smith', 
        picture: require("./assets/girl.jpg"),
        lastMessage: 'How are you?',
        //time: '10:20', 
    },
    { 
        id: 6, 
        name: 'Jane Smith', 
        picture: require("./assets/girl.jpg"),
        lastMessage: 'How are you?',
        //time: '10:20', 
    },
    { 
        id: 7, 
        name: 'Jane Smith', 
        picture: require("./assets/girl.jpg"),
        lastMessage: 'How are you?',
        //time: '10:20', 
    },
    { 
        id: 8, 
        name: 'Jane Smith', 
        picture: require("./assets/girl.jpg"),
        lastMessage: 'How are you?',
        //time: '10:20', 
    },
    // Add more dummy chat data as needed
  ];
  const connections = [
    { 
        id: 1, 
        name: 'Person 1', 
        picture: require('./assets/girl.jpg')
    },
    { 
        id: 2, 
        name: 'Person 1', 
        picture: require('./assets/girl.jpg')
    },
    { 
        id: 3, 
        name: 'Person 2',
        picture: require('./assets/girl.jpg')
    },
    { 
        id: 4, 
        name: 'Person 3',
        picture: require('./assets/girl.jpg') 
    },
    { 
        id: 5, 
        name: 'Person 4',
        picture: require('./assets/girl.jpg') },
    { 
        id: 6, 
        name: 'Person 5',
        picture: require('./assets/girl.jpg') },
  ];

//   useEffect(() => {
//     // Hide modal after 2 seconds (for demonstration purpose)
//     const timeout = setTimeout(() => {
//       setShowModal(false);
//     }, 10000);

//     return () => clearTimeout(timeout);
//   }, []);

  const openQR =() =>{
    props.navigation.navigate("QRScan")
  }
  const closeModalAndNavigate = () => {
    setShowModal(false);
    // Navigate to chat list screen
    props.navigation.navigate("ChatList");
  };

  const handleDeleteChat = (chatId) => {
  const updatedChatList = chatList.filter((chat) => chat.id !== chatId);
  setChatList(updatedChatList);
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
                    <TouchableOpacity onPress={openQR}>
                        <Text style={{ color: '#57A89F', top: 50, right: 225}} >Scan QR code</Text>
                    </TouchableOpacity>
                </View>
          </View>
        </View>
      </Modal>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="white" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Connections"
          placeholderTextColor={'white'}
          value={searchQuery}
          onChangeText={handleSearch}
          color={'white'}
        />
        <TouchableOpacity style={styles.icon} onPress={()=> props.navigation.navigate("ConnectionList")}>
          {/* <Icon name="ios-add-circle-outline" size={30} color="#007bff" style={{right: 30, bottom: 5}} /> */}
          <Icon name="user-plus" size={20} color="white" style={{alignItems:'center', alignContent: 'center', top: 6, justifyContent: 'center'}} />
        </TouchableOpacity>
      </View>
      <Text style={{top: 50, color: 'white', left: 10}}> Say Hi!</Text>
      <View style={styles.connectionsContainer}>
        <FlatList
            data={connections}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false} // Hide the scrollbar
            renderItem={({ item }) => {
            return (
                <TouchableOpacity>
                <Image source={item.picture} style={styles.imageConnections} />
                </TouchableOpacity>
            );
            }}
        />
        </View>


      <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10, color: 'white'}}>Messages</Text>
      <SwipeListView
        data={chatList.length > 0 ? chatList : dummyChatList} // Display filtered chat list if available, otherwise display dummy chat list
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (            
            <TouchableOpacity onPress={() => props.navigation.navigate("PrivateMessageScreen",{name: item.name, picture: item.picture})}>
            <View style={styles.chatItem}>
                <Image style={styles.image} source={item.picture} />
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                <Text style={{color:"white", left: 300,bottom: 20}}>{item.time}</Text>
            </View>
            </TouchableOpacity>
        )}
        renderHiddenItem={(data, rowMap) => (
        <TouchableOpacity style={styles.rowBack} onPress={() => handleDeleteChat(data.item.id)}>
          <MaterialIcons name="delete-outline" size={24} color={'red'} style={{left: 310, bottom:10}}/> 
        </TouchableOpacity>
  )}
  leftOpenValue={0} // Don't allow left swipe
  rightOpenValue={-100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#151918',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    left: 20
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 40,
    padding: 10,
    paddingHorizontal: 10,
    marginRight: 40,
  },
  chatItem: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderTopLeftRadius:20,
    borderBottomLeftRadius: 20,
    left: 20,
    marginBottom: 10,
    height: 67,
    backgroundColor: '#151918',
  },
  chatName: {
    left: 60,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    bottom: 60,
  },
  lastMessage: {
    left: 60,
    fontSize: 16,
    color: 'white',
    bottom: 60,
  },
  image:{
    width: 40,
    height: 60,
    borderRadius: 40,
    bottom: 7,
    left: 10,
  },
  connectionsContainer: {
    height: 80,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: 'white',
    left: 50,
    marginLeft: 20,
  },
  connectionCard: {
    backgroundColor: '#333',
    padding: 10,
    width: 50,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  imageConnections: {
    width: 55,
    padding: 30,
    height: 75,
    borderRadius: 40,
    margin: 5,
    //borderColor: 'white',
    //borderWidth: 1,
    //left: 60,
  },
  icon:{
    width: 40,
    height: 40,
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 40,
    alignContent: 'center',
    right: 30
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
  rowBack: {
    alignItems: 'center',
    //backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
});

export default ChatList;
