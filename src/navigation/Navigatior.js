import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nvigationRef } from "../utility/navigate";
import { Login, Home, Dashboard, Profile, Search } from "../utility/Path";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { color } from "@rneui/base";
import { Platform, StatusBar, Text } from "react-native";
import Colors from "../helper/Color";
import { View } from "react-native";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#F3D4CF', // background color same as your screen
    },
};

const BottomTab = () => {
    const insets = useSafeAreaInsets();


    return (


        // <View
        //     style={{
        //         // paddingBottom: insets.bottom, // this prevents gap on Android
        //         flex: 1,
        //         // ...other styles
        //     }}
        // >
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        } else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search-outline';
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },

                    tabBarStyle: {
                        right:0,
                        left:0,
                        // backgroundColor: 'red',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        position: 'absolute',
                          bottom: 0,
                          height: 90,
                        //   paddingBottom: Platform.OS === 'android' ? 20 : 0, // ← fix 
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })}
                initialRouteName="Home"
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                />

                <Tab.Screen
                    name="Search"
                    component={Home}
                />

                <Tab.Screen
                    name="Favourite"
                    component={Search}
                />

                <Tab.Screen
                    name="Pulse"
                    component={Profile}
                />

                <Tab.Screen
                    name="Profile"
                    component={Dashboard}
                />

            </Tab.Navigator>

        // </View>
    )
}

function Navigator() {

    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
                // paddingBottom: insets.bottom ,
                backgroundColor: Colors.mainColor, // your global background
            }}
        >
            <StatusBar
                barStyle="dark-content" // iOS
                backgroundColor={Colors.mainColor} // Android
                translucent={true} // false keeps background solid
            />
            <NavigationContainer ref={nvigationRef} >
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen
                        name="Login"
                        component={Login}
                    />

                    <Stack.Screen
                        name="Home"
                        component={BottomTab}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </View>

    )
}

export default Navigator;