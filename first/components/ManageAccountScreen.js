import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo-vector-icons

const ManageAccountScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteAccount = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    // Add your delete account logic here
    console.log('Account deleted!');
    // Close the modal after account deletion
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#A3A9AA"
        />
        <Text style={styles.heading}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#A3A9AA"
        />
        <Text style={styles.heading}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter date of birth"
          placeholderTextColor="#A3A9AA"
        />
        <Text style={styles.description}>
          The information provided here will be used for account management purposes only.
        </Text>
      </View>
      <LinearGradient
        colors={['#8C001A', '#000', '#8C001A', '#8C001A']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.deleteButton, styles.buttonBorder]}
      >
        <TouchableOpacity onPress={handleDeleteAccount}>
          <View style={styles.deleteButtonContent}>
            <Ionicons name="trash-outline" size={20} color="#fff" style={styles.deleteIcon} />
            <Text style={styles.deleteButtonText}>Delete This Account</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
      {/* Modal for delete confirmation */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.blurContainer} onPress={handleCloseModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Delete Account</Text>
              <Text style={styles.modalText}>
  Your account is scheduled for permanent deletion in 7 days; to recover this period, please contact{' '}
  <Text style={{ color: 'yellow', textDecorationLine: 'underline' }} onPress={() => Linking.openURL('mailto:connect@apostrfy.com')}>
  connect@apostrfy.com
  </Text>.
</Text>

              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDelete}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  content: {
    flex: 1,
    marginTop: 75,
  },
  heading: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#1D1E1E',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  description: {
    color: '#A3A9AA',
    fontSize: 14,
    marginTop: 10,
  },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
    alignSelf: 'center',
    width: 200,
  },
  deleteButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    marginRight: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%', // Set to 100% to occupy the entire width of the screen
    height: '100%', // Set to 100% to occupy the entire height of the screen
  },
  

  modalContent: {
    backgroundColor: '#1D1E1E',
    borderRadius: 10,
    padding: 40,
    
    alignItems: 'center',
    maxWidth: '99%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalContact: {
    color: '#A3A9AA',
    fontSize: 14,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageAccountScreen;
