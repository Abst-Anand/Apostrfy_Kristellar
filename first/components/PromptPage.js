import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const PromptPage = () => {
  const navigation = useNavigation();
  const [countdown, setCountdown] = useState(300);
  const [promptText, setPromptText] = useState('');
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [inputText, setInputText] = useState('');
  const [sessionEndedModalVisible, setSessionEndedModalVisible] = useState(false);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [feedbackSentModalVisible, setFeedbackSentModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0 && !isTimerPaused) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else if (countdown === 0) {
        clearInterval(interval);
        setPromptText('Time is up!');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, isTimerPaused]);

  const handleOptionsMenu = () => {
    setShowOptionsMenu((prevShowOptionsMenu) => !prevShowOptionsMenu);
  };

  const handleExitSession = () => {
    setSessionEndedModalVisible(true);
    setShowOptionsMenu(false); // Hide options menu
    navigation.navigate('Home'); // Navigate away from the session screen
  };

  const handleFeedback = () => {
    setFeedbackModalVisible(true);
    setIsTimerPaused(true); // Pause the timer
    setShowOptionsMenu(false); // Hide options menu
  };

  const handleContinueStory = () => {
    if (inputText.trim() !== '') {
      const newStoryText = `${promptText}\n${inputText}`;
      setPromptText(newStoryText);
      setInputText('');
    }
  };

  const handleInputSubmit = () => {
    Keyboard.dismiss();
  };

  const handleCloseSessionEndedModal = () => {
    setSessionEndedModalVisible(false);
    navigation.navigate('SentimentAnalysisPage'); // Navigate away from the session screen
  };

  const handleCloseFeedbackModal = () => {
    setFeedbackModalVisible(false);
    setIsTimerPaused(false); // Resume the timer
  };

  const handleFeedbackSubmit = () => {
    // Handle feedback submission logic here
    setFeedbackSent(true);
    setFeedbackModalVisible(false); // Close the feedback modal
    setFeedbackSentModalVisible(true); // Show feedback sent modal
  };

  const handleCloseFeedbackSentModal = () => {
    setFeedbackSentModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <FontAwesome name="clock-o" size={24} color={countdown > 0 ? 'blue' : 'red'} />
            <Text style={[styles.timerText, countdown <= 0 && styles.timesUpText]}>
              {countdown > 0 ? countdown + ' s' : "Time's up!"}
            </Text>
          </View>
          <TouchableOpacity onPress={handleOptionsMenu} style={styles.headerRight}>
            <FontAwesome name="ellipsis-v" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {showOptionsMenu && (
          <View style={styles.optionsMenu}>
            <TouchableOpacity onPress={handleExitSession} style={styles.option}>
              <FontAwesome name="sign-out" size={20} color="red" style={styles.icon} />
              <Text style={styles.optionText}>Exit Session</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFeedback} style={styles.option}>
              <FontAwesome name="exclamation" size={20} color="red" style={styles.icon} />
              <Text style={styles.optionText}>Give Feedback</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Displaying the prompt text */}
        <Text style={[styles.promptText, { color: '#fff' }]}>{promptText}</Text>

        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          {/* Custom chat input field */}
          <View style={styles.chatInput}>
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="Continue the story..."
              placeholderTextColor="#fff"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleInputSubmit}
              multiline
            />
            <TouchableOpacity style={styles.enterIconContainer} onPress={handleContinueStory}>
              <FontAwesome name="arrow-right" size={24} color="#fff"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      {/* Session Ended Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={sessionEndedModalVisible}
        onRequestClose={handleCloseSessionEndedModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Session Ended</Text>
            <TouchableOpacity onPress={handleCloseSessionEndedModal}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={feedbackModalVisible}
        onRequestClose={handleCloseFeedbackModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitles}>Give Feedback</Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Type your feedback here..."
              placeholderTextColor="#fff"
              value={feedbackText}
              onChangeText={setFeedbackText}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseFeedbackModal}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Feedback Sent Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={feedbackSentModalVisible}
        onRequestClose={handleCloseFeedbackSentModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={[styles.modalTitle, { color: '#4d7e79' }]}>Feedback Sent!</Text>

            <View>
            <Text style={styles.modalfeed}>Thank you for sharing your feedback!</Text>
            <Text style={[styles.modalfeed, { marginLeft: 15 }]}>
  Your input helps us improve for a
</Text>
            <Text style={[styles.modalfeed, { marginLeft: 65 }]}>better experience.</Text></View>
            <TouchableOpacity onPress={handleCloseFeedbackSentModal}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 5,
  },
  timesUpText: {
    color: 'red',
  },
  headerRight: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  optionsMenu: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 30,
    right: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  promptText: {
    fontSize: 20,
    color: 'blue', // Changed to blue
    marginBottom: 20,
    marginTop: 50,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20, // Adjust as needed
  },
  input: {
    flex: 1,
    height: 50,
    marginTop: 25,
    color: '#fff', // Changed to white
  },
  enterIconContainer: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '00FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#fff',
  },
  modalTitles: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#fff',
  },
  modalfeed: {
    fontSize: 20,
    color:'#fff',
    
  },
  modalClose: {
    fontSize: 18,
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  feedbackInput: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    color:'#fff',
  },
  submitButton: {
    backgroundColor: '#4d7e79',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  feedbackSentText: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default PromptPage;

