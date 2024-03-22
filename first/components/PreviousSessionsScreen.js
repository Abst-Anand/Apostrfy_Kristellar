import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const PreviousSessionsScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState('Dec'); // Default selected month
  const months = ['Nov', 'Dec', 'Jan']; // List of months to display

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    // Logic to fetch and display sessions for the selected month
    // This is where you would fetch session data for the selected month
  };

  // Sample session data for each date (assuming sessions are fetched from an API or database)
  const sessionData = [
    { date: '1', month: 'Dec', day: 'Monday', titles: ['Session Title 1', 'Session Title 2'] },
    { date: '5', month: 'Dec', day: 'Friday', titles: ['Session Title 3', 'Session Title 4'] },
    { date: '15', month: 'Dec', day: 'Tuesday', titles: ['Session Title 5', 'Session Title 6'] },
    // Add more session data as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.monthSelector}>
        {months.map((month, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.monthItem, selectedMonth === month && styles.selectedMonth]}
            onPress={() => handleMonthSelect(month)}
          >
            <Text style={styles.monthText}>{month}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.sessionList}>
        {sessionData.map((session, index) => (
          <View key={index} style={styles.dateBox}>
            <View style={styles.dateContent}>
              <Text style={styles.dateText}>{session.date}</Text>
              <Text style={styles.monthText}>{session.month}</Text>
              <Text style={styles.dayText}>{session.day}</Text>
            </View>
            <View style={styles.sessionsContainer}>
              <Text style={styles.sessionTitle}>{session.titles[0]}</Text>
              <View style={styles.line}></View>
              <Text style={styles.sessionTitle}>{session.titles[1]}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Changed background color to black
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedMonth: {
    backgroundColor: '#4d7e79',
  },
  monthText: {
    fontSize: 16,
    color: '#000',
  },
  sessionList: {
    flex: 1,
  },
  dateBox: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  dayText: {
    fontSize: 14,
    color: '#fff',
  },
  sessionsContainer: {
    backgroundColor: '#4d7e79',
    padding: 10,
    borderRadius: 5,
  },
  sessionTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
});

export default PreviousSessionsScreen;
