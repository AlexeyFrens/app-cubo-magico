import {Image, Text, TextInput, View, StyleSheet, TouchableOpacity} from "react-native";
import {images} from "../../assets/ImageStorage";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";

export const LoginScreen = () => {

    const navigation = useNavigation();

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Image source={images.brandIcon} resizeMode={"contain"}/>

                    <Text style={styles.pageTitle}>Login</Text>

                    <View style={{gap: 20, width: '100%'}}>
                        <View style={{gap: 5}}>
                            <Text style={styles.text}>Email</Text>
                            <TextInput placeholder={"Ex: fulano@gmail.com"} style={styles.input}
                                       keyboardType={"email-address"} placeholderTextColor={"#B0BEC5"} autoCapitalize={"none"}/>
                        </View>
                        <View style={{gap: 5}}>
                            <Text style={styles.text}>Senha</Text>
                            <TextInput placeholder={"Digite sua senha"} style={styles.input}
                                       placeholderTextColor={"#B0BEC5"}/>
                        </View>

                        <Text style={styles.link}>Esqueci minha senha</Text>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
                            <Text style={styles.buttonText}>Acessar</Text>
                        </TouchableOpacity>

                        <View style={{flexDirection: "row", gap: 5}}>
                            <Text style={styles.text}>Ainda não possui uma conta?</Text>
                            <Text style={styles.link} onPress={() => {navigation.navigate('signUp')}}>Inscreva-se</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyItems: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#313131',
        gap: 45
    },
    input: {
        borderWidth: 2,
        padding: 5,
        borderRadius: 5,
        borderColor: "#585858",
        width: '100%',
        maxWidth: 322,
        fontSize: 12,
        color: "#B0BEC5",
        fontFamily: 'Lato_400Regular',
    },
    pageTitle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontFamily: 'Lato_700Bold',
    },
    text: {
        fontSize: 12,
        color: '#FFFFFF',
        fontFamily: 'Lato_400Regular'
    },
    link: {
        fontSize: 12,
        color: '#FFFFFF',
        fontFamily: 'Lato_400Regular',
        textDecorationLine: 'underline'
    },
    button: {
        backgroundColor: '#2962FF',
        borderRadius: 15,
        padding: 10
    },
    buttonText: {
        fontSize: 15,
        color: '#FFFFFF',
        fontFamily: 'Lato_700Bold',
        textAlign: 'center'
    }
})