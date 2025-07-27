import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nvigationRef } from "../utility/navigate";
import { Login, Home, Dashboard, Profile, Search } from "../utility/Path";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { color } from "@rneui/base";
import { StatusBar, Text } from "react-native";
import Colors from "../helper/Color";
import { View } from "react-native";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (

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
                // tabBarLabel:({focused, color, size}) => {
                //       let textl ;

                //         if (route.name === 'Home') {
                //     textl = focused
                //       ? 'home'
                //       : 'homeee';
                //   }
                //     return(

                //         <Text style={{
                //             fontSize:13
                //         }} >{textl}</Text>
                //     )
                // },
                // tabBarStyle:{
                //     right:0,
                //     left:0,
                //     // backgroundColor:'pink',
                //     borderRadius:20,
                //     borderTopLeftRadius:20,
                //     // height:200
                // },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                headerShown:false
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
    )
}

function Navigator() {
    return (
        < >
            <StatusBar
                barStyle={
                    'dark-content'
                }
                backgroundColor={Colors.black}
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
        </>

    )
}

export default Navigator;