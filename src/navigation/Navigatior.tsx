// // import React, { createContext, useContext, useEffect, useState } from "react";

// // import { NavigationContainer,
// //       DefaultTheme as NavigationDefaultTheme,
// //   DarkTheme as NavigationDarkTheme,
// //     DefaultTheme } from "@react-navigation/native";
// // import { createNativeStackNavigator } from "@react-navigation/native-stack";
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { nvigationRef } from "../utility/navigate";
// // import { Login, Home, Dashboard, Profile, Search } from "../utility/Path";
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { useSafeAreaInsets } from "react-native-safe-area-context";
// // import { color } from "@rneui/base";
// // import { Platform, StatusBar,View,useColorScheme, Text } from "react-native";
// // import Colors from "../helper/Color";





// // const ProfileScreen = () => {
// //   const { isDark, toggleTheme } = useTheme();

// //   return (
// //     <View
// //       style={{
// //         flex: 1,
// //         justifyContent: "center",
// //         alignItems: "center",
// //         backgroundColor: isDark ? "#000" : "#fff",
// //       }}
// //     >
// //       <Button
// //         title={`Switch to ${isDark ? "Light" : "Dark"} Theme`}
// //         onPress={toggleTheme}
// //       />
// //     </View>
// //   );
// // };

// // const Stack = createNativeStackNavigator();
// // const Tab = createBottomTabNavigator();

// // const BottomTab = () => {
// //     const insets = useSafeAreaInsets();


// //     return (

// //         <Tab.Navigator
// //             screenOptions={({ route }) => ({
// //                 tabBarIcon: ({ focused, color, size }) => {
// //                     let iconName;
// //                     if (route.name === 'Home') {
// //                         iconName = focused
// //                             ? 'home'
// //                             : 'home-outline';
// //                     } else if (route.name === 'Search') {
// //                         iconName = focused ? 'search' : 'search-outline';
// //                     } else if (route.name === 'Pulse') {
// //                         iconName = focused ? 'pulse' : 'pulse-outline';
// //                     } else if (route.name === 'Profile') {
// //                         iconName = focused ? 'pricetags' : 'pricetags-outline';
// //                     }

// //                     // You can return any component that you like here!
// //                     return <Ionicons name={iconName} size={size} color={color} />;
// //                 },

// //                 tabBarStyle: {
// //                     right: 0,
// //                     left: 0,
// //                     // backgroundColor: 'red',
// //                     borderTopLeftRadius: 20,
// //                     borderTopRightRadius: 20,
// //                     position: 'absolute',
// //                     bottom: 0,
// //                     height: 90,
// //                     //   paddingBottom: Platform.OS === 'android' ? 20 : 0, // ← fix 
// //                 },
// //                 tabBarActiveTintColor: 'black',
// //                 tabBarInactiveTintColor: 'gray',
// //                 headerShown: false
// //             })}
// //             initialRouteName="Home"
// //         >
// //             <Tab.Screen
// //                 name="Home"
// //                 component={Home}
// //             />



// //             <Tab.Screen
// //                 name="Search"
// //                 component={Search}
// //             />

// //             <Tab.Screen
// //                 name="Pulse"
// //                 component={Profile}
// //             />

// //             <Tab.Screen
// //                 name="Profile"
// //                 component={Dashboard}
// //             />

// //                   <Tab.Screen name="Profile" component={ProfileScreen} />


// //         </Tab.Navigator>

// //         // </View>
// //     )
// // }

// // function Navigator() {

// //     const insets = useSafeAreaInsets();
// //   const { isDark } = useTheme();

// //     return (
// //         <View
// //             style={{
// //                 flex: 1,
// //                 paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
// //                 // paddingBottom: insets.bottom ,
// //                 backgroundColor: Colors.mainColor, // your global background
// //             }}
// //         >
// //             <StatusBar
// //                 // barStyle="dark-content" // iOS
// //                         barStyle={isDark ? "light-content" : "dark-content"}

// //                 backgroundColor={Colors.mainColor} // Android
// //                 translucent={true} // false keeps background solid
// //             />
// //             <NavigationContainer 
// //             ref={nvigationRef}

// //                     theme={isDark ? NavigationDarkTheme : NavigationDefaultTheme}

// //             >
// //                 <Stack.Navigator
// //                     initialRouteName="Home"
// //                     screenOptions={{ headerShown: false }}
// //                 >
// //                     <Stack.Screen
// //                         name="Login"
// //                         component={Login}
// //                     />

// //                     <Stack.Screen
// //                         name="Home"
// //                         component={BottomTab}
// //                     />

// //                 </Stack.Navigator>
// //             </NavigationContainer>
// //         </View>
// //     )
// // }


// // export default function Navigator


// import React, { useContext } from "react";
// import {
//     NavigationContainer,
//     DefaultTheme as NavigationDefaultTheme,
//     DarkTheme as NavigationDarkTheme,
// } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { nvigationRef } from "../utility/navigate";
// import { Login, Home, Dashboard, Profile, Search } from "../utility/Path";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//     Platform,
//     StatusBar,
//     View,
//     Button,
// } from "react-native";
// import { useTheme, ThemeProvider } from "./ThemeProvider"; // 👈 import theme hook

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// // ---------------- PROFILE SCREEN ----------------
// const ProfileScreen = () => {
//     const { isDark, toggleTheme } = useTheme();

//     return (
//         <View
//             style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: isDark ? "#000" : "#fff",
//             }}
//         >
//             <Button
//                 title={`Switch to ${isDark ? "Light" : "Dark"} Theme`}
//                 onPress={toggleTheme}
//             />
//         </View>
//     );
// };

// // ---------------- BOTTOM TABS ----------------
// const BottomTab = () => {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let iconName;
//                     if (route.name === "Home") {
//                         iconName = focused ? "home" : "home-outline";
//                     } else if (route.name === "Search") {
//                         iconName = focused ? "search" : "search-outline";
//                     } else if (route.name === "Pulse") {
//                         iconName = focused ? "pulse" : "pulse-outline";
//                     } else if (route.name === "Profile") {
//                         iconName = focused ? "person" : "person-outline";
//                     }
//                     return <Ionicons name={iconName} size={size} color={color} />;
//                 },

//                 tabBarStyle: {
//                     borderTopLeftRadius: 20,
//                     borderTopRightRadius: 20,
//                     position: "absolute",
//                     bottom: 0,
//                     height: 90,
//                 },
//                 tabBarActiveTintColor: "black",
//                 tabBarInactiveTintColor: "gray",
//                 headerShown: false,
//             })}
//             initialRouteName="Home"
//         >
//             <Tab.Screen name="Home" component={Home} />
//             <Tab.Screen name="Search" component={Search} />
//             <Tab.Screen name="Pulse" component={Profile} />
//             <Tab.Screen name="Profile" component={ProfileScreen} />
//         </Tab.Navigator>
//     );
// };

// // ---------------- MAIN NAVIGATOR ----------------
// function Navigator() {
//     const insets = useSafeAreaInsets();
//     const { isDark, theme } = useTheme();

//     return (
//         <View
//             style={{
//                 flex: 1,
//                 paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : insets.top,
//             }}
//         >
//             <StatusBar
//                 barStyle={isDark ? "light-content" : "dark-content"}
//                 translucent={true}
//                 backgroundColor="transparent"
//             />
//             <NavigationContainer
//                 ref={nvigationRef}
//                 // theme={isDark ? NavigationDarkTheme : NavigationDefaultTheme}
//                 theme={theme}
//             >
//                 <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
//                     <Stack.Screen name="Login" component={Login} />
//                     <Stack.Screen name="Home" component={BottomTab} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         </View>
//     );
// }

// export default Navigator;


// new 
import React from "react";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { nvigationRef } from "../utility/navigate";
import { Login, Home, Dashboard, Profile, Search } from "../utility/Path";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Platform,
  StatusBar,
  View,
  Button,
} from "react-native";
import { useTheme } from "./ThemeProvider";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ---------------- PROFILE SCREEN ----------------
const ProfileScreen = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDark ? "#000" : "#fff",
      }}
    >
      <Button
        title={`Switch to ${isDark ? "Light" : "Dark"} Theme`}
        onPress={toggleTheme}
      />
    </View>
  );
};

// ---------------- BOTTOM TABS ----------------
const BottomTab = () => {
    const { isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Pulse") {
            iconName = focused ? "pulse" : "pulse-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          bottom: 0,
          height: 90,
                    backgroundColor: isDark ? "#000" : "#fff", // ✅ background follows theme

        },
         tabBarActiveTintColor: isDark ? "#fff" : "#000", // ✅ active color
        tabBarInactiveTintColor: isDark ? "#aaa" : "#888", // ✅ inactive color
       
        headerShown: false,
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Pulse" component={Profile} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// ---------------- MAIN NAVIGATOR ----------------
function Navigator() {
  const insets = useSafeAreaInsets();
  const { isDark, theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }}
    >
      {/* ✅ StatusBar updates with theme */}
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#000" : "#fff"}
        // backgroundColor={theme.colors.background}  // ✅ dynamic background
        translucent={false}
      />

      <NavigationContainer ref={nvigationRef} theme={theme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={BottomTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Navigator;

