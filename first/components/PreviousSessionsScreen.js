import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PreviousSessionsScreen = () => {
  const months = [
    { name: 'Nov', days: 30 },
    { name: 'Dec', days: 31 },
    { name: 'Jan', days: 31 }
  ];

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(1);

  const handleNextMonth = () => {
    const nextIndex = (selectedMonthIndex + 1) % months.length;
    setSelectedMonthIndex(nextIndex);
  };

  const handlePrevMonth = () => {
    const prevIndex = (selectedMonthIndex - 1 + months.length) % months.length;
    setSelectedMonthIndex(prevIndex);
  };

  const sessionData = generateSessionData(months[selectedMonthIndex]);

  function generateSessionData(month) {
    const sessions = [];
    for (let i = 1; i <= month.days; i++) {
      sessions.push({
        id: `${month.name}-${i}`,
        date: i.toString(),
        month: month.name,
        day: getDayOfWeek(i, month.name),
        session1: generateChatMessages(),
        session2: generateChatMessages(),
      });
    }
    return sessions;
  }

  function getDayOfWeek(day, month) {
    const date = new Date(`2022-${months.findIndex(m => m.name === month) + 11}-${day}`);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }

  function generateChatMessages() {
    const messages = [];
    const numberOfMessages = Math.floor(Math.random() * 5) + 1;
    for (let i = 1; i <= numberOfMessages; i++) {
      messages.push({
        id: i.toString(),
        sender: i % 2 === 0 ? 'User' : 'Bot',
        message: `Message ${i} from ${i % 2 === 0 ? 'User' : 'Bot'}`,
      });
    }
    return messages;
  }

  const renderSessionItem = ({ item }) => (
    <View style={styles.dateBox}>
      <View style={styles.dateContent}>
        
        <View style={styles.dateBoxInner}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
       
      </View>
      <Text style={styles.monthText}>{item.day}</Text>
      
      <View style={styles.sessionContainer}>
        <View style={styles.session}>
          <Text style={styles.sessionTitle}>Session Title</Text>
          <FlatList
            data={item.session1}
            renderItem={({ item }) => (
              <View style={styles.chatMessage}>
                <Text style={styles.senderText}>{item.sender}: </Text>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatList}
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.session}>
          <Text style={styles.sessionTitle}>Session Title</Text>
          <FlatList
            data={item.session2}
            renderItem={({ item }) => (
              <View style={styles.chatMessage}>
                <Text style={styles.senderText}>{item.sender}: </Text>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatList}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="#4d7e79" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{months[selectedMonthIndex].name}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#4d7e79" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={sessionData}
        renderItem={renderSessionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sessionList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 16,
    color: '#fff',
  },
  sessionList: {
    flexGrow: 1,
  },
  dateBox: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateBoxInner: {
    backgroundColor: '#4d7e79',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
  },
  dayContainer: {
    marginBottom: 5,
  },
  dayText: {
    fontSize: 14,
    color: '#fff',
  },
  monthContainer: {
    marginBottom: 5,
  },
  monthText: {
    fontSize: 20,
    color: '#fff',
  },
  sessionContainer: {
    marginLeft: 70,
    marginBottom:5,
    
  },
  session: {
    marginBottom: 10,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  chatList: {
    flexGrow: 1,
  },
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  senderText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default PreviousSessionsScreen;
