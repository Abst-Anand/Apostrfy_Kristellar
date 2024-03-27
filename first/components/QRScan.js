import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Assuming you have Ionicons installed
import { RNCamera } from 'react-native-camera';
const QRScan = (props) => {
  const [showQRModal, setShowQRModal] = useState(true);
  const [scannedQRCode, setScannedQRCode] = useState(null);

  // Function to handle searching chats

  const closeQRModalAndNavigate = () => {
    setShowQRModal(false);
    // Navigate to chat list screen
    props.navigation.navigate("ChatList");
  };


  return (
    <View style={styles.container}>
        <Modal
        visible={showQRModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.qrModalContainer}>
          <View style={styles.qrModalContent}>
                <TouchableOpacity style={styles.qrTimesButton} onPress={closeQRModalAndNavigate}>
                    <Icon name='times' color={'white'} />
                </TouchableOpacity>
                <Text style={styles.qrTitle}>Add Connection</Text>
                <Text style={styles.qrSubtitle}>Scan QR code or enter their code</Text>
                
                <View style={{width: 290, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', height: 290, borderRadius: 40}}>
                    <RNCamera ref={ref => { 
                        this.camera =ref;
                    }}
                    style={{
                        flex: 1,
                        width: '100%'
                    }}
                    />
                </View>

                <View style={styles.qrCodeContainer}>
                    <TouchableOpacity style={styles.qrButton} onPress={closeQRModalAndNavigate}>
                            <Text style={{color:'white'}}>Enter Code</Text>
                    </TouchableOpacity>
                </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000000',
  },
  qrModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 700,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  qrModalContent: {
    height: 700,
    backgroundColor: '#151918',
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
  qrCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 200,
  },
  qrTimesButton: {
    width: 30,
    height: 30,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    left: 280,
  },
  qrButton: {
    top: 70,
    width: 200,
    height: 50,
    borderRadius: 20, // half of the height to make it oval
    backgroundColor: '#0D1C1C', // example background color
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'white',
    borderWidth: 1,
    alignSelf: 'center',
    right: 0,
  },
  qrTitle: {
    fontSize: 24,
    fontWeight: 'normal',
    color: 'white',
    marginTop: 50,
    left: 70,
    //paddingHorizontal: 10,
    bottom:50,
  },
  qrSubtitle: {
    fontSize: 18,
    color: 'white',
    marginVertical: 10,
    left: 30,
    bottom:50,
  },
  
});

export default QRScan;
