// // In App.js in a new project

// import * as React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, LogBox } from 'react-native';
// import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import Scale from './src/helper/Scale';
// import Entypo from 'react-native-vector-icons/Entypo';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// // import Navigator from './src/navigation/Navigatior';
// import Navigator, { ThemeProvider } from './src/navigation/Navigatior'; // 👈 import ThemeProvider

// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { getFCMToken, requestNotificationPermission, setupNotificationHandlers } from './src/notifications/firebaseNotification';



// function App() {

//   React.useEffect(() => {
//     LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
//     LogBox.ignoreLogs(['Warning: ...', 'console.error:...']);
//     LogBox.ignoreLogs([
//       'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead',
//     ]);
//     LogBox.ignoreAllLogs();
//   }, []);


//   return (
//     <GestureHandlerRootView style={{ backgroundColor: 'pink', flex: 1, }}>
//       <SafeAreaProvider >
//         {/* <Navigator /> */}
//          <ThemeProvider>
//           <Navigator />
//         </ThemeProvider>
//       </SafeAreaProvider>  
//     </GestureHandlerRootView>
//   )
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     // backgroundColor: '#f5ff',
//     // justifyContent: 'center',
//   },
// });

// export default App\\



// import * as React from "react";
// import { StyleSheet, LogBox,StatusBar } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import Navigator from "./src/navigation/Navigatior";
// import { ThemeProvider, useTheme } from "./src/navigation/ThemeProvider";
// import { NavigationContainer } from "@react-navigation/native";


// function AppContent() {
//   const { isDark, theme } = useTheme();

//   return (
//     <>
//       {/* ✅ StatusBar follows theme */}
//        <StatusBar
//         barStyle={isDark ? "light-content" : "dark-content"}
//         backgroundColor={isDark ? "#000000" : "#ffffff"}
//       />
//       {/* <Navigator /> */}
//          {/* ✅ NavigationContainer uses theme */}

//         <Navigator />

//     </>
//   );
// }

// function App() {
//   React.useEffect(() => {
//     LogBox.ignoreAllLogs();
//   }, []);

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <ThemeProvider>
//           <AppContent />
//         </ThemeProvider>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
// });

// export default App;


// new
import * as React from "react";
import { StyleSheet, LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import Navigator from "./src/navigation/Navigator";
import Navigator from "./src/navigation/Navigatior";
import { ThemeProvider } from "./src/navigation/ThemeProvider";
import { Provider } from "react-redux";
import { persistor, store } from './src/redux/store'
import { PersistGate } from "redux-persist/integration/react";
import BootSplash from "react-native-bootsplash";
import Toast from "react-native-toast-message";
import { CustomToast } from "./src/componets/CustomToast";

function App() {

  React.useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

    React.useEffect(() => {
    setTimeout(async () => {
      await BootSplash.hide({ fade: true });
    }, 1000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <ThemeProvider>
              <Navigator />
            </ThemeProvider>
            <Toast config={CustomToast} />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default App;
