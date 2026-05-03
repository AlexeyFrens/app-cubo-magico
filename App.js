import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "./src/screens/LoginScreen";
import {SignUpScreen} from "./src/screens/SignUpScreen";
import {HomeScreen} from "./src/screens/HomeScreen";
import {Lato_400Regular, Lato_700Bold, useFonts} from '@expo-google-fonts/lato'
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {colors} from "./src/theme/themes";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {StopwatchScreen} from "./src/screens/StopwatchScreen";
import {AnalyticsScreen} from "./src/screens/AnalyticsScreen";
import {AulaTemplateScreen} from "./src/screens/AulaTemplateScreen";

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const FakeComponent = () => (<View></View>)

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.cardsAndMenus,
                    height: 120,
                    paddingTop: 20,
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: colors.text,
                tabBarInactiveTintColor: colors.text
            }}
        >
            <Tab.Screen
                name={"HomeTab"}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.containerTab, {backgroundColor: focused ? colors.primary : 'transparent'}]}>
                            <MaterialCommunityIcons name={"cube-outline"} size={30} color={color} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name={"StopwatchTab"}
                component={StopwatchScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.containerTab, {backgroundColor: focused ? colors.primary : 'transparent'}]}>
                            <MaterialCommunityIcons name={"timer-outline"} size={30} color={color} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name={"AnalyticsTab"}
                component={AnalyticsScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.containerTab, {backgroundColor: focused ? colors.primary : 'transparent'}]}>
                            <MaterialCommunityIcons name={"chart-line"} size={30} color={color} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name={"LogoutTab"}
                component={FakeComponent}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="logout" size={30} color={color} />
                    )
                }}
                listeners={({navigation}) => ({
                    tabPress: (e) => {
                        e.preventDefault()

                        navigation.reset({
                            index: 0,
                            routes: [{ name: "login" }]
                        })
                    }
                })}
            />
        </Tab.Navigator>
    )
}

export default function App() {

    const [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    })

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#313131' }}>
                <ActivityIndicator size="large" color="#2962FF" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={"login"} component={LoginScreen}/>
                <Stack.Screen name={"signUp"} component={SignUpScreen}/>
                <Stack.Screen name={"home"} component={HomeTabNavigator}/>
                <Stack.Screen name={"aulaScreen"} component={AulaTemplateScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    containerTab: {
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }
})
