import {Image, Text, TextInput, View, StyleSheet, TouchableOpacity} from "react-native";
import {images} from "../../assets/ImageStorage";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {colors, customFont, globalStyles} from "../theme/themes";

export const LoginScreen = () => {

    const navigation = useNavigation();

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
                                       autoCapitalize={"none"}/>
                        </View>
                        <View style={{gap: 5}}>
                            <Text style={styles.text}>Senha</Text>
                            <TextInput placeholder={"Digite sua senha"} style={styles.input}
                                       placeholderTextColor={colors.textPlaceholder}/>
                        </View>

                        <Text style={styles.link}>Esqueci minha senha</Text>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
                            <Text style={styles.buttonText}>Acessar</Text>
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