import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "./src/screens/LoginScreen";
import {SignUpScreen} from "./src/screens/SignUpScreen";

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={"login"} component={LoginScreen}/>
                <Stack.Screen name={"signUp"} component={SignUpScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
