import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CountdownTimerScreen = () => {
  const navigation = useNavigation();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigation.navigate('PromptPage'); // Replace 'WriteThoughtScreen' with the name of your next screen
    }
  }, [countdown, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.circularView}>
        <Text style={styles.countdownText}>{countdown}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularView: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 72,
    color: '#fff',
  },
});

export default CountdownTimerScreen;
