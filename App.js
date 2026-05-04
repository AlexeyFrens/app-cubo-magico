import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "./src/screens/LoginScreen";
import {SignUpScreen} from "./src/screens/SignUpScreen";
import {HomeScreen} from "./src/screens/HomeScreen";
import {Lato_400Regular, Lato_700Bold, useFonts} from '@expo-google-fonts/lato'
import {ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {colors, globalStyles} from "./src/theme/themes";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {StopwatchScreen} from "./src/screens/StopwatchScreen";
import {AnalyticsScreen} from "./src/screens/AnalyticsScreen";
import {AulaTemplateScreen} from "./src/screens/AulaTemplateScreen";
import {useState} from "react";
import {authService} from "./src/services/authService";
import {AlertProvider, useAlert} from "./src/contexts/AlertContext";

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const FakeComponent = () => (<View></View>)

const HomeTabNavigator = ({navigation}) => {

    const [isModalVisible, setModalVisible] = useState(false)
    const {showAlert} = useAlert()

    const signOut = async () => {
        try {
            await authService.signOut()
            setModalVisible(false)
            navigation.reset({index: 0, routes: [{name: "login"}]})
        } catch (error) {
            showAlert("Erro ao sair", error.message)
        }
    }

    return (
        <>
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
                        tabBarIcon: ({color, focused}) => (
                            <View
                                style={[styles.containerTab, {backgroundColor: focused ? colors.primary : 'transparent'}]}>
                                <MaterialCommunityIcons name={"cube-outline"} size={30} color={color}/>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name={"StopwatchTab"}
                    component={StopwatchScreen}
                    options={{
                        tabBarIcon: ({color, focused}) => (
                            <View
                                style={[styles.containerTab, {backgroundColor: focused ? colors.primary : 'transparent'}]}>
                                <MaterialCommunityIcons name={"timer-outline"} size={30} color={color}/>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name={"AnalyticsTab"}
                    component={AnalyticsScreen}
                    options={{
                        tabBarIcon: ({color, focused}) => (
                            <View
                                style={[styles.containerTab, {backgroundColor: focused ? colors.primary : 'transparent'}]}>
                                <MaterialCommunityIcons name={"chart-line"} size={30} color={color}/>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name={"LogoutTab"}
                    component={FakeComponent}
                    options={{
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="logout" size={30} color={color}/>
                        )
                    }}
                    listeners={() => ({
                        tabPress: (e) => {
                            e.preventDefault()
                            setModalVisible(true)
                        }
                    })}
                />
            </Tab.Navigator>

            <Modal transparent={true} visible={isModalVisible} animationType={"fade"}
                   onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Você tem certeza que deseja deslogar a conta?</Text>

                        <View style={{flexDirection: 'row', gap: 10}}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]}
                                              onPress={() => setModalVisible(false)}>
                                <Text style={[{fontWeight: 'bold'}, globalStyles.normalText]}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={signOut}>
                                <Text style={[{fontWeight: 'bold'}, globalStyles.normalText]}>Continuar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default function App() {

    const [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    })

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#313131'}}>
                <ActivityIndicator size="large" color="#2962FF"/>
            </View>
        );
    }

    return (
        <AlertProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name={"login"} component={LoginScreen}/>
                    <Stack.Screen name={"signUp"} component={SignUpScreen}/>
                    <Stack.Screen name={"home"} component={HomeTabNavigator}/>
                    <Stack.Screen name={"aulaScreen"} component={AulaTemplateScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AlertProvider>
    );
}

const styles = StyleSheet.create({
    containerTab: {
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    modalOverlay: {
        ...globalStyles.modalOverlay
    },
    modalBox: {
        ...globalStyles.modalBox,
        maxWidth: 320
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    continueButton: {
        backgroundColor: colors.primary
    },
    cancelButton: {
        backgroundColor: colors.backgroundPrimary
    },
    modalTitle: {
        ...globalStyles.modalTitle,
        textAlign: "center"
    }
})
