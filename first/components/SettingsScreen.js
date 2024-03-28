import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo-vector-icons

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  const SettingItem = ({ text, screenName, iconName, isLastItem }) => {
    return (
      <TouchableOpacity
        style={[
          styles.settingItem,
          isLastItem && { borderBottomWidth: 0 }, // Remove border if it's the last item
        ]}
        onPress={() => handleNavigate(screenName)}
      >
        <View style={styles.itemContent}>
          <View style={styles.leftContent}>
            {/* Update the color for the icon and arrow */}
            <Ionicons name={iconName} size={24} color={text === 'Logout' ? 'red' : '#fff'} style={styles.icon} />
            <Text style={[styles.settingText, text === 'Logout' && { color: 'red' }]}>{text}</Text>
          </View>
          {/* Update the color for the arrow */}
          <Ionicons name="chevron-forward-outline" size={24} color={text === 'Logout' ? 'red' : '#fff'} style={styles.arrow} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.section}>
          {/* Remove the heading and back arrow */}
          {/* <Text style={styles.sectionTitle}>Account</Text> */}
          {/* <TouchableOpacity onPress={() => navigation.goBack()}> */}
          {/*   <Ionicons name="chevron-back-outline" size={24} color="#fff" /> */}
          {/* </TouchableOpacity> */}
          <SettingItem text="Manage Account" screenName="ManageAccountScreen" iconName="settings-outline" />
          <SettingItem text="Previous Sessions" screenName="PreviousSessionsScreen" iconName="time-outline" />
          {/* Update the text color for "Logout" */}
          <SettingItem text="Manage Subscriptions" screenName="ManageSubscriptionScreen" iconName="exit-outline" isLastItem={true} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Info</Text>
          <SettingItem text="Privacy Policy" screenName="PrivacyPolicyScreen" iconName="document-text-outline" />
          <SettingItem text="Terms of Service" screenName="TermsOfServiceScreen" iconName="book-outline" />
          <SettingItem text="About Us" screenName="AboutUsScreen" iconName="exit-outline" isLastItem={true}  />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <SettingItem text="Contact Us" screenName="ContactUsScreen" iconName="help-circle-outline" />
          <SettingItem text="Report Bug" screenName="ReportBugScreen" iconName="chatbox-ellipses-outline" />
          {/* Update the text color for "Logout" */}
          <SettingItem text="Logout" screenName="CountdownTimer" iconName="exit-outline" isLastItem={true} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  section: {
    backgroundColor: '#1D1E1E',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  settingItem: {
    padding: 15,
    marginBottom: 10,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A3A9AA', // Adjust the color of the line as needed
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#fff', // Default color
  },
  arrow: {
    marginLeft: 10,
  },
});

export default SettingsScreen;
