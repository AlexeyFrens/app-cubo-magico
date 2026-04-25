import {Image, Text, TextInput, View, StyleSheet} from "react-native";
import {images} from "../../assets/ImageStorage";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export const LoginScreen = () => {

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView>
                    <Image source={images.brandIcon} resizeMode={"contain"}/>

                    <Text>Login</Text>

                    <TextInput placeholder={"Ex: fulano@gmail.com"} style={styles.input}/>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: "#585858"
    }
})