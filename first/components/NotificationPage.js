import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons for icons
import CustomStatusbar from './CustomStatusBar';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


const { width, height } = Dimensions.get('window');

const NotificationPage = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'request', name: 'Uday Bhanu', profileImage: require('../assets/IMG_1616.jpg') },
    { id: '2', type: 'message', name: 'Sumit Kumar Panda', profileImage: require('../assets/86e8411b-9d19-4bc4-b420-5b57c8aa30be.jpg') },
    { id: '3', type: 'request', name: 'Debashis Sundaray', profileImage: require('../assets/IMG_1617.jpg') },
    { id: '4', type: 'message', name: 'Satyanarayan Mishraw', profileImage: require('../assets/IMG_1618.jpg') },
  ]);

  const handleAcceptRequest = (id) => {
    // Logic to handle accepting the request
    console.log(`Accepted request from user with id: ${id}`);
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  const handleDeleteRequest = (id) => {
    // Logic to handle deleting the request
    console.log(`Deleted request from user with id: ${id}`);
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  const handleNavigateToMessage = (item) => {
    // Navigate to private message screen passing the user's information
    navigation.navigate('Pvtmsg', { user: item });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.notificationItem}>
        <Image source={item.profileImage} style={styles.profilePic} />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationText}>
            {item.name} sent you a {item.type === 'request' ? 'connection request' : 'message'}
          </Text>
          <View style={styles.actionsContainer}>
            {item.type === 'request' ? (
              <>
                <TouchableOpacity onPress={() => handleAcceptRequest(item.id)}>
                  <MaterialCommunityIcons name="check" size={24} color="#00cc00" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteRequest(item.id)}>
                  <MaterialCommunityIcons name="close" size={24} color="#ff0000" style={styles.actionIcon} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => handleNavigateToMessage(item)}>
                <MaterialCommunityIcons name="arrow-right" size={24} color="#0066ff" style={styles.actionIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const FooterButton = ({ icon, onPress }) => {
    return (
      <TouchableOpacity style={styles.footerButton} onPress={onPress}>
        <Feather name={icon} size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
  <LinearGradient colors={['#040504', '#040504']} style={styles.container}>
    <CustomStatusbar />
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    <View style={styles.footer}>
            {/* Footer buttons */}
            <FooterButton icon="home" onPress={() => navigation.navigate('WriteThoughtScreen')} />
            <FooterButton icon="message-circle" onPress={() => navigation.navigate('ChatList')} />
            <FooterButton icon="map-pin" onPress={() => navigation.navigate('MapPage')} />
            <FooterButton icon="users" onPress={() => navigation.navigate('ConnectionScreen')} />
            <FooterButton icon="bell" onPress={() => navigation.navigate('NotificationPage')} />
          </View>
        </LinearGradient>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.08
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white'
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    flex: 1,
    fontSize: 16,
    color:'#ccc',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginLeft: 8,
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

export default NotificationPage;
