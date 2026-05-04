import {Image, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import {images} from "../../assets/ImageStorage";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {colors, customFont, globalStyles} from "../theme/themes";
import {useState} from "react";
import {authService} from "../services/authService";

export const LoginScreen = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async () => {
        if (!email || !password) {
            Alert.alert("Atenção", "Por favor, insira o email e a senha.");
            return
        }

        setIsLoading(true)

        try {
            await authService.signIn(email, password)
            navigation.reset({index: 0, routes: [{name: 'home'}]})
        } catch (error) {
            Alert.alert("Erro ao acessar", "Email ou senha incorretos.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.mainContainer}>
                    <Image source={images.brandIcon} resizeMode={"contain"}/>

                    <Text style={styles.pageTitle}>Login</Text>

                    <View style={{gap: 20, width: '100%'}}>
                        <View style={{gap: 5}}>
                            <Text style={styles.text}>Email</Text>
                            <TextInput placeholder={"Ex: fulano@gmail.com"} style={styles.input}
                                       keyboardType={"email-address"} placeholderTextColor={colors.textPlaceholder}
                                       autoCapitalize={"none"} onChangeText={setEmail}/>
                        </View>
                        <View style={{gap: 5}}>
                            <Text style={styles.text}>Senha</Text>
                            <TextInput placeholder={"Digite sua senha"} style={styles.input}
                                       placeholderTextColor={colors.textPlaceholder}
                                       secureTextEntry={true} autoCapitalize={"none"} onChangeText={setPassword}/>
                        </View>

                        <Text style={styles.link}>Esqueci minha senha</Text>

                        <TouchableOpacity style={styles.button} onPress={signIn} disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator color="white"/>
                            ) : (
                                <Text style={styles.buttonText}>Acessar</Text>
                            )}
                        </TouchableOpacity>

                        <View style={{flexDirection: "row", gap: 5}}>
                            <Text style={styles.text}>Ainda não possui uma conta?</Text>
                            <Text style={styles.link} onPress={() => {
                                navigation.navigate('signUp')
                            }}>Inscreva-se</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        ...globalStyles.container
    },
    input: {
        ...globalStyles.inputStyle
    },
    pageTitle: {
        ...globalStyles.pageTitleStyle
    },
    text: {
        ...globalStyles.normalText
    },
    link: {
        fontSize: customFont.sizes.small,
        color: colors.text,
        fontFamily: customFont.regular,
        textDecorationLine: 'underline'
    },
    button: {
        ...globalStyles.roundedButton
    },
    buttonText: {
        ...globalStyles.buttonTextStyle
    }
})