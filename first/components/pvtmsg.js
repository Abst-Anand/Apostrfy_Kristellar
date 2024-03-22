import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { MaterialIcons,AntDesign, Entypo } from '@expo/vector-icons'; // Import Entypo from Expo
import Icon from 'react-native-vector-icons/Feather';
import { Keyboard } from 'react-native';
import CheckBox from 'expo-checkbox';
import LinearGradient from 'react-native-linear-gradient';


const PrivateMessageScreen = ({ navigation }) => {
  const [bottomModalVisible, setBottomModalVisible] = useState(false); // State for bottom modal visibility
  const [showOtherReasonModal, setShowOtherReasonModal] = useState(false);
  //const[blockBottomModalVisible, setBlockBottomModalVisible] = useState(false);
  const[reportSubmitted, setReportSubmitted]= useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false); // State for block modal visibility
  const [userBlocked, setUserBlocked] = useState(false);
  const [removeConnectionModal, setRemoveConnectionModal] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [isChecked, setIsChecked] = useState({
    ib: false,
    bully: false,
    oc: false,
    others: false
  });

  const flatListRef = useRef(null); // Ref for FlatList
  const [inputText, setInputText] = useState(''); // State for input text
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello' }, //sender: 'John',
    {id:'2' , text: 'Welcome'}
  ]);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const senderName = 'Jennifer Cleo'; // Example sender name, you can replace it with a dynamic value
  const receiverProfilePic = require('./assets/girl.jpg'); // Example receiver profile picture

  const sendIcon = require('./assets/icons8-send-48.png');


  


  const handleSubmit = () => {
    if (isChecked.others) {
      setBottomModalVisible(false); // Close current modal
      setShowOtherReasonModal(true); // Open new modal
    }
    else{
      setBottomModalVisible(false);
      setReportSubmitted(true);
    }
  }
  const handleOtherSubmit = () => {
      setShowOtherReasonModal(false); // Close Current modal
      setReportSubmitted(true)// open new modal
    }

  const handleRemovedSubmit = () => {
      setRemoveConnectionModal(false); // Close Current modal
      setRemoved(true)// open new modal
   }
  
  const toggleBlockModal = () => {
    setBlockModalVisible(!blockModalVisible);
    setModalVisible(!modalVisible);
  }
  const toggleReportModal = () => {
    setBottomModalVisible(!bottomModalVisible);
    setModalVisible(!modalVisible);
  }; 
  
  const toggleOthersModal = () => {
    setShowOtherReasonModal(!showOtherReasonModal);
  }; 
  const toggleReportSubmitted = () =>{
    setReportSubmitted(!reportSubmitted)
  }
  const toggleRemoved = () => {
    setRemoved(!removed);
  }
  const toggleYes = () =>{
    setBlockModalVisible(false);
    setUserBlocked(true);
  }
  const toggleRemoveConnectionModal = () =>{
    setRemoveConnectionModal(!removeConnectionModal);
    setModalVisible(!modalVisible);
  }
  const sendMessage = () => {
    if (inputText.trim() === '') {
      return; // If the message is empty, do nothing
    }

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      text: inputText,
    };

    setMessages([...messages, newMessage]);
    setInputText(''); // Clear input after sending

    // Scroll to the end of the list
    flatListRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={24} color="white" />
      </TouchableOpacity>

      {/* Dots Icon */}
      <TouchableOpacity style={styles.dotsButton}  onPress={() => {Keyboard.dismiss();setModalVisible(true);}}>
        <Entypo name="dots-three-vertical" size={24} color="white" />
      </TouchableOpacity>

      {/* Receiver Profile Picture and Sender's Name */}
      <View style={styles.header}>
        <Image source={receiverProfilePic} style={styles.receiverProfilePic} />
        <Text style={styles.headerText}>{senderName}</Text>
      </View>
    
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => setModalVisible(false)}
      ></TouchableOpacity>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>

                <TouchableOpacity style={styles.modalOption} onPress={toggleBlockModal}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo name="block" size={20} color="#FF0000" style={{marginRight: 10}} />
                    <Text style={styles.modalOptionText}>Block Profile</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalOption} onPress={toggleReportModal}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="alert-octagon" size={20} color="#FF0000" style={{ marginRight: 10 }} />
                      <Text style={styles.modalOptionText}>Report Profile</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalOption2} onPress={toggleRemoveConnectionModal}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name="delete-outline" size={24} color={'red'} /> 
                      <Text style={[styles.modalOptionText, {left: 7}]}>Remove Connection</Text>
                  </View>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

      {/* Block Modal */}
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={blockModalVisible}
                    onRequestClose={() => {
                      setBlockModalVisible(false);
                    }}>
                    <TouchableOpacity
                      style={styles.overlay}
                      activeOpacity={1}
                      onPress={toggleBlockModal}
                    />
                    <View style={styles.bottomModalContainer}>
                      <View style={styles.bottomModalContent}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        
                        <Text style={{ color: '#FFFFFF', fontSize: 15, textAlign: 'center', marginTop: 20, bottom: 30 }}>
                          Do you want to block {senderName} ? 
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                          <TouchableOpacity style={{ padding: 10 }} onPress={() => {setBlockModalVisible(false); setModalVisible(false);}}>
                            <Text style={{ color: 'white', textAlign: 'center', right: 20, textDecorationLine: 'underline' }}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ width: 100, height: 50, borderRadius: 20, backgroundColor: '#614041',justifyContent: 'center',
                                                      alignItems: 'center',
                                                      borderColor:'white',
                                                      borderWidth: 1,
                                                      left: 30,
                                                      bottom: 5}} onPress={toggleYes}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Yes</Text>
                          </TouchableOpacity>
                        </View>

                        </View>
                      </View>
                    </View>
                  </Modal>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={userBlocked}
                    onRequestClose={() => {
                      setUserBlocked(false);
                    }}
                  >
                   <View style={styles.bottomModalContainer}>
                    <View style={styles.bottomModalContent}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#FF5349', fontSize: 25 }}>Connection Blocked!</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 15, textAlign: 'center', marginTop: 10 }}>
                          You have successfully Blocked {senderName}!
                        </Text>
                        <TouchableOpacity style={styles.cancelbutton} onPress={() => {setUserBlocked(false); setModalVisible(false);}}>
                          <Text style={{ color: 'white', textAlign: 'center',fontSize: 15, textDecorationLine: 'underline' }}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                   </View> 
                  </Modal>
      {/* End of block modals */}
    

      {/* Bottom Modal */}
                  <Modal animationType="slide" transparent={true} visible={bottomModalVisible} onRequestClose={() => {setBottomModalVisible(false); }}                  >
                    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleReportModal}></TouchableOpacity>
                    <View style={styles.bottomModalContainer}>
                      <View style={styles.bottomModalContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                          <Icon name="alert-octagon" size={30} color="#FF5349" style={{ marginRight: 0 }} />
                          <Text style={{color: '#FF5349', fontSize: 25}}> Report {senderName} </Text>
                        </View>
                        <View style={styles.bottommodalOption} >
                          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                              <CheckBox 
                              value={isChecked.ib} 
                              onValueChange={() => setIsChecked({... isChecked, ib:!isChecked.ib})}   
                              size={10}
                              style={styles.checkbox}
                              color={'grey'}
                              />
                              <Text style={styles.bottommodalOptionText}>Inappropriate Behaviour</Text>
                          </View>
                        </View>

                        <View style={styles.bottommodalOption} >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <CheckBox 
                              value={isChecked.bully} 
                              onValueChange={() => setIsChecked({... isChecked, bully: !isChecked.bully})} 
                              size={10}
                              color={'grey'}
                              style={styles.checkbox}/>
                              <Text style={styles.bottommodalOptionText}>Bullying or Harassment</Text>
                          </View>
                        </View>

                        <View style={styles.bottommodalOption} >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <CheckBox 
                              value={isChecked.oc} 
                              onValueChange={() => setIsChecked({... isChecked, oc: !isChecked.oc})} 
                              size={10}
                              color={'grey'}
                              style={styles.checkbox}
                              />
                              <Text style={styles.bottommodalOptionText}>Offensive Content</Text>
                          </View>
                        </View>

                        <View style={styles.bottommodalOption}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <CheckBox 
                              value={isChecked.others} 
                              onValueChange={() => setIsChecked({... isChecked, others: !isChecked.others})} 
                              //checkBoxColor='white'
                              //color={'transparent'}
                              size={10}
                              color={'grey'}
                              style={styles.checkbox}
                              />
                              <Text style={styles.bottommodalOptionText}>Others</Text>
                          </View>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                          <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>

                  <Modal
                    visible={showOtherReasonModal}
                    animationType="slide"
                    transparent={true}
                      onRequestClose={() => setShowOtherReasonModal(false)}>
                      <TouchableOpacity
                      style={styles.overlay}
                      activeOpacity={1}
                      onPress={toggleOthersModal}
                    ></TouchableOpacity>
                      <View style={styles.bottomModalContainer}>
                        <View style={styles.bottomModalContent}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                            <Icon name="alert-octagon" size={30} color="#FF5349" style={{ marginRight: 0 }} />
                            <Text style={{color: '#FF5349', fontSize: 25}}> Report {senderName} </Text>
                          </View>
                          <View style={styles.bottommodalOption}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <CheckBox 
                                value={true} 
                                onValueChange={() => setIsChecked({... isChecked, others: !isChecked.others})} 
                                //checkBoxColor='white'
                                //color={'transparent'}
                                size={10}
                                color={'grey'}
                                style={styles.checkbox}
                                />
                                <Text style={styles.bottommodalOptionText}>Others</Text>
                            </View>
                          </View>
                          <TextInput 
                            style={styles.othersTextArea}
                            multiline
                            placeholder='Type Here...'
                            placeholderTextColor='grey'
                            >                             
                          </TextInput>
                          <TouchableOpacity style={styles.button} onPress={handleOtherSubmit}>
                          <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        </View>
                      </View>
                  </Modal>

                  <Modal
                    visible={reportSubmitted}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setReportSubmitted(false)}>
                    <TouchableOpacity
                      style={styles.overlay}
                      activeOpacity={1}
                      onPress={toggleReportSubmitted}
                    ></TouchableOpacity>
                   <View style={styles.bottomModalContainer}>
                    <View style={styles.bottomModalContent}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#FF5349', fontSize: 25 }}>Profile Reported!</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 15, textAlign: 'center', marginTop: 10 }}>
                          You have successfully reported {senderName}!
                        </Text>
                        <TouchableOpacity style={styles.cancelbutton} onPress={() => setReportSubmitted(false)}>
                          <Text style={{ color: 'white', textAlign: 'center',fontSize: 15, textDecorationLine: 'underline' }}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                   </View> 
                  </Modal>
      {/* Bottom Report modal end */}


      {/* Connect remove Modals */}
                  <Modal
                    visible={removeConnectionModal}
                    animationType="slide"
                    transparent={true}
                      onRequestClose={() => setRemoveConnectionModal(false)}>
                      <TouchableOpacity
                      style={styles.overlay}
                      activeOpacity={1}
                      onPress={toggleRemoveConnectionModal}
                    ></TouchableOpacity>
                      <View style={styles.bottomModalContainer}>
                        <View style={styles.bottomModalContent}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                            <MaterialIcons name="delete-outline" size={30} color={'red'} />
                            <Text style={{color: '#FF5349', fontSize: 25}}> Remove Connection </Text>
                          </View>
                          <TextInput 
                            style={{height: 150, borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 20, color: 'white', textAlignVertical: 'top', placeholderTextColor: 'white'}}
                            multiline
                            placeholder='Write a goodbye note ... '
                            placeholderTextColor='grey'
                            >                             
                          </TextInput>
                          <TouchableOpacity style={styles.button} onPress={handleRemovedSubmit}>
                          <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        </View>
                      </View>
                  </Modal>
                  <Modal
                    visible={removed}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setRemoved(false)}>
                    <TouchableOpacity
                      style={styles.overlay}
                      activeOpacity={1}
                      onPress={toggleRemoved}
                    ></TouchableOpacity>
                   <View style={styles.bottomModalContainer}>
                    <View style={styles.bottomModalContent}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#FF5349', fontSize: 25 }}>Connection Removed!</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 15, textAlign: 'center', marginTop: 10 }}>
                          You have successfully removed {senderName}!
                        </Text>
                        <TouchableOpacity style={styles.cancelbutton} onPress={() => {setRemoved(false); setModalVisible(false)}}>
                          <Text style={{ color: 'white', textAlign: 'center',fontSize: 15, textDecorationLine: 'underline' }}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                   </View> 
                  </Modal>
      {/* End of Connect remove Modals */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={item.sender === 'You' ? styles.messageContainerYou : styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          placeholderTextColor="#FFFFFF"
          onChangeText={(text) => setInputText(text)}
          value={inputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Image style={styles.sendIcon} source={ sendIcon } />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151918',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  dotsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151918',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  headerText: {
    top: 25,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  receiverProfilePic: {
    top: 30,
    width: 100,
    height: 140,
    borderRadius: 75,
  },
  messageContainer: {
    //top:20,
    //marginBottom: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#151918',
    borderRadius: 15,
    maxWidth: '70%',
    borderColor: "#FFFFFF",
    borderWidth: 1,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  messageContainerYou: {
    //top: 20,
    //marginBottom: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#151918',
    borderRadius: 15,
    alignSelf: 'flex-end',
    maxWidth: '70%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    overflow: 'hidden',
  },
  messageText: { color: '#FFFFFF' },
  inputContainer: {
    //top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    color: '#FFFFFF',
    justifyContent: 'center',
    position: 'relative',
    
  },
  input: {
    backgroundColor: '#000000',
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 60,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    right: 20,
  },
  sendIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalContainer: {
    // flex: 1,
    position: 'absolute',
    top: 60,
    right: 40,
    justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: 'white',
    width: '60%', // Adjust width as needed
    //height: '23%', // Adjust height as needed
    alignSelf: 'center', // Center the modal horizontally
  },
  modalContent: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    width: '105%',
    height: '95%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    textAlign: 'left'
  },
  
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
    width: '100%',
    //alignItems: 'center',
    padding: 30,
  },
  modalOption2: {
    paddingVertical: 20,
    //borderBottomWidth: 1,
    //borderBottomColor: '#808080',
    width: '100%',
    //alignItems: 'center',
    padding: 28,
  },
  modalOptionText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'left',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomModalContent: {
    backgroundColor: '#151918',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  bottommodalOption: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    //borderBottomWidth: 1,
    //borderBottomColor: '#808080',
    width: '100%',
    alignItems: 'flex-start',
    padding: 20,
  },
  bottommodalOptionText: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingHorizontal: 10,
    
  },
  button: {
    top: 20,
    width: 150,
    height: 50,
    borderRadius: 20, // half of the height to make it oval
    backgroundColor: '#0D1C1C', // example background color
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'white',
    borderWidth: 1,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  checkbox:{
    borderRadius: 5,
    
  },
  othersTextArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    color: 'white',
    textAlignVertical: 'top', // Align text to start from the top
    placeholderTextColor: 'white'
  },
  cancelbutton: {
    paddingVertical: 20,
  }
});

export default PrivateMessageScreen;
