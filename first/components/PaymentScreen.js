import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PaymentScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [yearlyChecked, setYearlyChecked] = useState(true);
  const [monthlyChecked, setMonthlyChecked] = useState(false);

  const handleYearlyCheck = () => {
    setYearlyChecked(true);
    setMonthlyChecked(false);
    setSelectedPlan('yearly');
  };

  const handleMonthlyCheck = () => {
    setYearlyChecked(false);
    setMonthlyChecked(true);
    setSelectedPlan('monthly');
  };

  const handlePayment = () => {
    // Logic to handle payment
    console.log('Payment made for plan:', selectedPlan);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Apostrfy Pro!</Text>
        <Text style={styles.description}>Get access to all the features of the</Text>
        <Text style={styles.desc}>app.</Text>
        <TouchableOpacity>
          <LinearGradient
            colors={['#BEE393', '#7FDEDB', '#72CCFD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, { borderColor: 'transparent' }]}
          >
            <Text style={styles.buttonText}>Limited Time Offer</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.buttonDescription}>Save 17% extra on the annual plan.</Text>

        {/* Yearly Button */}
        <TouchableOpacity style={styles.additionalButton} onPress={handleYearlyCheck}>
          <View style={[styles.radioButton, yearlyChecked && styles.radioButtonSelected]} />
          <View>
            <Text style={styles.paymentText}>Yearly</Text>
            <Text style={styles.additionalButtonText}>Pay for full year</Text>
          </View>
          <Text style={styles.paymentAmount}>$30</Text>
        </TouchableOpacity>

        {/* Monthly Button */}
        <TouchableOpacity style={styles.additionalButton} onPress={handleMonthlyCheck}>
          <View style={[styles.radioButton, monthlyChecked && styles.radioButtonSelected]} />
          <View>
            <Text style={styles.paymentText}>Monthly</Text>
            <Text style={styles.additionalButtonText}>Pay monthly</Text>
          </View>
          <Text style={styles.paymentAmount}>$5</Text>
        </TouchableOpacity>

        {/* Payment Button */}
        <TouchableOpacity style={styles.payButtonContainer} onPress={handlePayment}>
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Make Payment</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <FooterButton icon="home" onPress={() => console.log('Home button pressed')} />
        <FooterButton icon="message-circle" onPress={() => console.log('Messages button pressed')} />
        <FooterButton icon="map-pin" onPress={() => console.log('Map button pressed')} />
        <FooterButton icon="users" onPress={() => console.log('Contacts button pressed')} />
        <FooterButton icon="bell" onPress={() => console.log('Notifications button pressed')} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderWidth: 10,
  },
  box: {
    width: '86%',
    height: '70%',
    padding: 20,
    borderWidth: 2,
    borderColor: '#101F28',
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#091A1C',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#FFFFFF',
    marginLeft: 75,
  },
  description: {
    fontSize: 16,
    marginLeft: 25,
    color: '#FFFFFF',
  },
  desc: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 120,
    marginBottom: 40,
    color: '#FFFFFF',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 23,
    borderWidth: 2,
    width: 210,
    marginLeft: 35,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 20,
  },
  buttonDescription: {
    marginBottom: 25,
    marginLeft: 27,
    fontSize: 17,
    color: '#FFFFFF',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  radioButtonSelected: {
    backgroundColor: '#4d7e79',
    borderColor: '#4d7e79',
  },
  paymentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentText: {
    fontSize: 19,
    marginRight: 10,
    color: '#fff',
  },
  additionalButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  payButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  payButton: {
    backgroundColor: '#4d7e79',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 6,
    width: 170,
    
  },
  payButtonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 17,
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
  additionalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#101F28', // Yellow color
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default PaymentScreen;
