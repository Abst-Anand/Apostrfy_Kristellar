import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Import Feather from expo/vector-icons
import { Share } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const handleShare = async () => {
  try {
    const result = await Share.share({
      message: 'Check out this awesome app! www.example.com/invite',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared via activity type
        console.log(`Shared via ${result.activityType}`);
      } else {
        // Shared
        console.log('Shared');
      }
    } else if (result.action === Share.dismissedAction) {
      // Dismissed
      console.log('Dismissed');
    }
  } catch (error) {
    console.error(error.message);
  }
};

const InviteFriendsScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={[styles.heading, { color: '#fff' }]}>Invite Friends</Text>
        <Text style={[styles.description, { color: '#fff' }]}>
          When your friends join through your referral, you'll automatically become connections.
        </Text>
        <Image
          source={require('../assets/Untitled.png')}
          style={styles.image}
        />
        <TouchableOpacity onPress={() => console.log('Link pressed')}>
          <Text style={{ color: '#fff', marginLeft: 125 }}>Link:</Text>
          <Text style={styles.link}>https://www.apostrfy.com/invite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleShare}>
          <Text style={styles.sendButtonText}>Send Invites</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', marginLeft: 100, marginTop: 10 }}>Invites Left: 3</Text>
      </View>
      {/* Add the footer component here */}
      <View style={styles.footer}>
      <FooterButton icon="home" onPress={() => navigation.navigate('WriteThoughtScreen')} />
        <FooterButton icon="message-circle" onPress={() => navigation.navigate('ChatList')} />
        <FooterButton icon="map-pin" onPress={() => navigation.navigate('BiometricPage')} />
        <FooterButton icon="users" onPress={() => navigation.navigate('ConnectionScreen')} />
        <FooterButton icon="bell" onPress={() => navigation.navigate('notification')} />
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
  },
  box: {
    width: '80%',
    height: '70%',
    alignSelf: 'center',
    marginTop: 50,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 75,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  link: {
    fontSize: 18,
    color: '#537895',
    textDecorationLine: 'underline',
    marginBottom: 20,
    marginLeft: 30,
  },
  sendButton: {
    backgroundColor: '#4d7e79',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 18,
    color: '#fff',
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

export default InviteFriendsScreen;
