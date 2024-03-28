import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './components/AuthScreen';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import ForgetPasswordScreen from './components/ForgetPasswordScreen';
import ChangePassword from './components/ChangePassword';
// import AppExternalBioMetric from './components/AppExternalBioMetric';

import WriteThoughtScreen from './components/WriteThoughtScreen';
import InviteFriendsScreen from './components/InviteFriendsScreen';

import WelcomePage from './components/WelcomePage';
import FingerprintScreen from './components/FingerprintScreen';
import FaceIDScreen from './components/FaceIDScreen';
import CreatePasswordScreen from './components/CreatePasswordScreen';
import SetupPasswordScreen from './components/SetupPasswordScreen';
import PaymentScreen from './components/PaymentScreen';
import SettingsScreen from './components/SettingsScreen';

import ManageAccountScreen from './components/ManageAccountScreen';

import ManageSubscriptionScreen from './components/ManageSubscriptionScreen';
import ContactUsScreen from './components/ContactUsScreen';
import ReportBugScreen from './components/ReportBugScreen';
import PreviousSessionsScreen from './components/PreviousSessionsScreen';
import ConnectionScreen from './components/ConnectionScreen';
import CountdownTimer from './components/CountdownTimer';
import PromptPage from './components/PromptPage';

import SentimentAnalysisPage from './components/SentimentAnalysisPage';

import BiometricPage from './components/BiometricPage';
import notification from './components/notification';
import ChatList from './components/ChatList';
import ConnectionList from './components/ConnectionList';
import pvtmsg from './components/pvtmsg';
import UniqueCode from './components/UniqueCode';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="UniqueCode" component={UniqueCode}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword}/>
        {/* <Stack.Screen name="AppExternalBioMetric" component={AppExternalBioMetric}/> */}
       
        <Stack.Screen name="WriteThoughtScreen" component={WriteThoughtScreen}/>
        <Stack.Screen name="InviteFriendsScreen" component={InviteFriendsScreen}/>
        <Stack.Screen name="WelcomePage" component={WelcomePage}/>
      
        <Stack.Screen name="FingerprintScreen" component={FingerprintScreen}/>
        <Stack.Screen name="FaceIDScreen" component={FaceIDScreen}/>
        <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen}/>
        <Stack.Screen name="SetupPasswordScreen" component={SetupPasswordScreen}/>
        <Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
        <Stack.Screen name="ManageAccountScreen" component={ManageAccountScreen}/>
        <Stack.Screen name="ManageSubscriptionScreen" component={ManageSubscriptionScreen}/>
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen}/>
        <Stack.Screen name="ReportBugScreen" component={ReportBugScreen}/>
        <Stack.Screen name="PreviousSessionsScreen" component={PreviousSessionsScreen}/>
        <Stack.Screen name="ConnectionScreen" component={ConnectionScreen}/>
        <Stack.Screen name="CountdownTimer" component={CountdownTimer}/>
        <Stack.Screen name="PromptPage" component={PromptPage}/>
 
        <Stack.Screen name="SentimentAnalysisPage" component={SentimentAnalysisPage}/>
       
        <Stack.Screen name="BiometricPage" component={BiometricPage}/>
        <Stack.Screen name="notification" component={notification}/>
        <Stack.Screen name="ChatList" component={ChatList}/>
        <Stack.Screen name="ConnectionList" component={ConnectionList}/>
        <Stack.Screen name="pvtmsg" component={pvtmsg}/>
        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
