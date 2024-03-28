import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SentimentAnalysisPage = () => {
  const [verdict, setVerdict] = useState('');

  const handleVerdictSelection = (selectedVerdict) => {
    setVerdict(selectedVerdict);
  };

  return (
    <View style={styles.container}>
      {/* Sentiment Analysis Title */}
      <Text style={styles.title}>Sentiment Analysis</Text>

      {/* Sentiment Graph */}
      <LinearGradient
        colors={['#FFFFFF', '#23B7C6', '#26B4AB']} // Original blending colors
        style={styles.sentimentGraph}
      >
        {/* Your sentiment graph component goes here */}
        {/* This is a placeholder for the graph */}
        <Text style={styles.graphPlaceholder}>Sentiment Graph</Text>
      </LinearGradient>

      {/* Interaction Verdict Title */}
      <Text style={styles.interactionTitle}>Interaction Verdict</Text>

      {/* Functional Verdict Boxes */}
      <View style={styles.verdictContainer}>
        {/* Functional verdict boxes go here */}
        <TouchableOpacity
          style={[styles.verdictBox, verdict === 'Positive' && styles.selectedVerdict]}
          onPress={() => handleVerdictSelection('Positive')}
        >
          <Text style={styles.verdictEmoji}>😊</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.verdictBox, verdict === 'Neutral' && styles.selectedVerdict]}
          onPress={() => handleVerdictSelection('Neutral')}
        >
          <Text style={styles.verdictEmoji}>😐</Text>
     
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.verdictBox, verdict === 'Negative' && styles.selectedVerdict]}
          onPress={() => handleVerdictSelection('Negative')}
        >
          <Text style={styles.verdictEmoji}>😔</Text>
          
        </TouchableOpacity>
        {/* Add two more boxes for additional verdicts */}
        <TouchableOpacity
          style={[styles.verdictBox, verdict === 'Slightly Positive' && styles.selectedVerdict]}
          onPress={() => handleVerdictSelection('Slightly Positive')}
        >
          <Text style={styles.verdictEmoji}>🙂</Text>
         
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.verdictBox, verdict === 'Very Negative' && styles.selectedVerdict]}
          onPress={() => handleVerdictSelection('Very Negative')}
        >
          <Text style={styles.verdictEmoji}>😢</Text>
          
        </TouchableOpacity>
      </View>

      {/* Name Your Story Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name Your Story"
          placeholderTextColor="#fff"
          style={styles.input}
          underlineColorAndroid="transparent"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Black background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4d7e79', // Mint green color
    marginBottom: 20,
    marginLeft:82,
  },
  sentimentGraph: {
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  graphPlaceholder: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text color for contrast
  },
  interactionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4d7e79', // White text color
    marginLeft: 102,

  },
  verdictContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  verdictBox: {
    width: '15%',
    height: 80,
    backgroundColor: '#222', // Dark shade for the verdict boxes
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333', // Slightly lighter border color
    marginBottom: 60,
    paddingVertical: 10,
  },
  selectedVerdict: {
    backgroundColor: '#4d7e79', // Change color for selected verdict
    borderColor: '#4d7e79', // Change border color for selected verdict
  },
  verdictEmoji: {
    fontSize: 30,
  },
  verdictLabel: {
    fontSize: 16,
    color: '#fff', // White text color
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    height: 40,
    paddingLeft: 10,
    color: '#fff', // White text color for input
    marginTop:20,
  },
  submitButton: {
    backgroundColor: '#4d7e79',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SentimentAnalysisPage;
