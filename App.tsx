// In App.js in a new project

import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Scale from './src/helper/Scale';
import Entypo from 'react-native-vector-icons/Entypo';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navigator from './src/navigation/Navigatior';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getFCMToken, requestNotificationPermission, setupNotificationHandlers } from './src/notifications/firebaseNotification';
 
 

function App() {

  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['Warning: ...', 'console.error:...']);
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead',
    ]);
    LogBox.ignoreAllLogs();
  }, []);



 


  return (
    <GestureHandlerRootView style={{ backgroundColor: 'pink', flex: 1, }}>
      <SafeAreaProvider >
        <Navigator />
      </SafeAreaProvider>  
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#f5ff',
    // justifyContent: 'center',
  },
});

export default App