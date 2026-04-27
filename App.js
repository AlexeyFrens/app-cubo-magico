import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "./src/screens/LoginScreen";
import {SignUpScreen} from "./src/screens/SignUpScreen";
import {HomeScreen} from "./src/screens/HomeScreen";
import {CubePiecesScreen} from "./src/screens/CubePiecesScreen";
import {BasicMovesScreen} from "./src/screens/BasicMovesScreen";
import {BasicMethodScreen} from "./src/screens/BasicMethodScreen";
import {AdvancedMethodScreen} from "./src/screens/AdvancedMethodScreen";
import { useFonts, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato'
import {ActivityIndicator, View} from "react-native";

const Stack = createStackNavigator()

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
                <Stack.Screen name={"home"} component={HomeScreen}/>
                <Stack.Screen name={"cubePieces"} component={CubePiecesScreen}/>
                <Stack.Screen name={"basicMoves"} component={BasicMovesScreen}/>
                <Stack.Screen name={"basicMethod"} component={BasicMethodScreen}/>
                <Stack.Screen name={"advancedMethod"} component={AdvancedMethodScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
