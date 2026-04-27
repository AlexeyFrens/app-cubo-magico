import {Text, StyleSheet, View, TouchableOpacity, Image, TextInput} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import {useNavigation} from "@react-navigation/native";
import {colors, customFont, globalStyles} from "../theme/themes";

export const SignUpScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.mainContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={images.backButton} resizeMode={"contain"}/>
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>

                <Image source={images.brandIcon} resizeMode={"contain"}/>

                <Text style={styles.pageTitle}>Inscreva-se</Text>

                <View style={{gap: 20, width: '100%'}}>
                    <View style={{gap: 5}}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput placeholder={"Ex: fulano@gmail.com"} style={styles.input}
                                   keyboardType={"email-address"} placeholderTextColor={colors.textPlaceholder}
                                   autoCapitalize={"none"}/>
                    </View>
                    <View style={{gap: 5}}>
                        <Text style={styles.text}>Senha</Text>
                        <TextInput placeholder={"Digite uma senha"} style={styles.input}
                                   placeholderTextColor={colors.textPlaceholder}/>
                    </View>

                    <View style={{gap: 5}}>
                        <Text style={styles.text}>Confirmar Senha</Text>
                        <TextInput placeholder={"Digite novamente a senha"} style={styles.input}
                                   placeholderTextColor={colors.textPlaceholder}/>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Inscrever</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        ...globalStyles.container
    },
    backButton: {
        ...globalStyles.backButtonStyle
    },
    backButtonText: {
        ...globalStyles.backButtonTextStyle
    },
    pageTitle: {
        ...globalStyles.pageTitleStyle
    },
    input: {
        ...globalStyles.inputStyle
    },
    text: {
        ...globalStyles.normalText
    },
    button: {
        ...globalStyles.roundedButton
    },
    buttonText: {
        ...globalStyles.buttonTextStyle
    }
})