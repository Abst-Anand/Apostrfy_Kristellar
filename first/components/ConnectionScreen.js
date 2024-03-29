import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Share } from 'react-native'; // Import Share from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 

const ConnectionScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([
    { id: '1', name: 'Debashis Sundaray', online: true, profileImage: require('../assets/gg.png') },
    { id: '2', name: 'Sumit Kumar Panda', online: true, profileImage: require('../assets/gg.png') },
    { id: '3', name: 'Satyanarayan Mishra', online: true, profileImage: require('../assets/gg.png') },
    { id: '4', name: 'Anand Raj', offline: false, profileImage: require('../assets/pic1.png') },
    // Add more users as needed
  ]);
  const [offlineUsers, setOfflineUsers] = useState([
  
    { id: '5', name: 'Priyanka Mohakud', offline: false, profileImage: require('../assets/gg.png') },
    { id: '6', name: 'Manisha Choudhary', offline: false, profileImage: require('../assets/gg.png') },
    // Add more offline users as needed
  ]);
  
  const [selectedUserId, setSelectedUserId] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigation = useNavigation();

  const toggleUserSelection = (userId) => {
    setSelectedUserId(userId === selectedUserId ? '' : userId);
  };

  const handlePlayButton = () => {
    // Logic to handle playing with selected users
    const selectedUser = onlineUsers.find(user => user.id === selectedUserId);
    console.log('Selected user:', selectedUser);
  };

  const handleShareInvite = () => {
    // Share invite link using Share API
    Share.share({
      message: 'Here is the invite link...', // Customize the message as per your requirement
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredList = onlineUsers.filter(user =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filteredList);
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => toggleUserSelection(item.id)}>
      <Image source={item.profileImage} style={styles.profilePicture} />
      <Text style={styles.userName}>{item.name}</Text>
      <View style={styles.checkboxContainer}>
        {selectedUserId === item.id && <Text style={styles.checkbox}>&#10003;</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="#ccc" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#fff"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Online Section */}
      <Text style={styles.sectionTitle}>Online</Text>
      <FlatList
        data={searchQuery ? filteredUsers : onlineUsers.filter(user => !user.offline)}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.userList}
      />

      {/* Offline Section */}
      <Text style={styles.sectionTitle}>Offline</Text>
      <FlatList
        data={offlineUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.userList}
      />

      {/* Play Button */}
      <TouchableOpacity style={styles.playButton} onPress={handlePlayButton}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>

      {/* Share Invite Link */}
      <TouchableOpacity onPress={handleShareInvite}>
        <Text style={styles.inviteLink}>Share Invite Link</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <FooterButton icon="home" onPress={() => navigation.navigate('WriteThoughtScreen')} />
        <FooterButton icon="message-circle" onPress={() => navigation.navigate('MessagesScreen')} />
        <FooterButton icon="map-pin" onPress={() => navigation.navigate('MapScreen')} />
        <FooterButton icon="users" onPress={() => navigation.navigate('ConnectionScreen')} />
        <FooterButton icon="bell" onPress={() => navigation.navigate('NotificationsScreen')} />
      </View>
    </View>
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
    backgroundColor: '#000000',
  
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    marginTop:8,
  },
  userList: {
    marginBottom: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userName: {
    fontSize: 16,
    color: '#fff',
  },
  checkboxContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 4,
    marginLeft: 'auto',
  },
  checkbox: {
    fontSize: 16,
    color: '#4d7e79',
  },
  playButton: {
    backgroundColor: '#4d7e79',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop:10,
  
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
   
   
  },
  inviteLink: {
    color: '#ccc',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 50,
    marginTop:10,
    marginLeft:135,
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

export default ConnectionScreen;