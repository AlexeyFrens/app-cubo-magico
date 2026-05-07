import {
    ActivityIndicator,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import {useNavigation} from "@react-navigation/native";
import {colors, globalStyles} from "../theme/themes";
import {useState} from "react";
import {authService} from "../services/authService";
import {useAlert} from "../contexts/AlertContext";

export const SignUpScreen = () => {

    const navigation = useNavigation();
    const {showAlert} = useAlert()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const signUp = async () => {
        if (!email || !password || !confirmPassword) {
            showAlert("Atenção", "Preencha todos os campos.")
            return
        }

        if (password !== confirmPassword) {
            showAlert("Atenção", "As senhas não coincidem.")
            return
        }

        if (password.length < 8) {
            showAlert("Atenção", "A senha deve ter pelo menos 8 caracteres.")
            return
        }

        setIsLoading(true)

        try {
            await authService.signUp(email, password)
            showAlert("Sucesso!", "Conta criada com sucesso. Faça o Login.")
            navigation.goBack()
        } catch (error) {
            showAlert("Erro ao cadastrar", error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundPrimary}}>
                <KeyboardAvoidingView style={{flex: 1, width: '100%'}}
                                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView keyboardShouldPersistTaps={'handled'} showsHorizontalScrollIndicator={false}>
                        <Pressable style={styles.mainContainer} onPress={Keyboard.dismiss}>
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
                                               keyboardType={"email-address"}
                                               placeholderTextColor={colors.textPlaceholder}
                                               autoCapitalize={"none"} onChangeText={setEmail}/>
                                </View>
                                <View style={{gap: 5}}>
                                    <Text style={styles.text}>Senha</Text>
                                    <TextInput placeholder={"Digite uma senha"} style={styles.input}
                                               placeholderTextColor={colors.textPlaceholder}
                                               secureTextEntry={true} autoCapitalize={"none"}
                                               onChangeText={setPassword}/>
                                </View>

                                <View style={{gap: 5}}>
                                    <Text style={styles.text}>Confirmar Senha</Text>
                                    <TextInput placeholder={"Digite novamente a senha"} style={styles.input}
                                               placeholderTextColor={colors.textPlaceholder}
                                               secureTextEntry={true} autoCapitalize={"none"}
                                               onChangeText={setConfirmPassword}/>
                                </View>

                                <TouchableOpacity style={styles.button} onPress={signUp} disabled={isLoading}>
                                    {isLoading ? (
                                        <ActivityIndicator color="white"/>
                                    ) : (
                                        <Text style={styles.buttonText}>Inscrever</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </Pressable>
                    </ScrollView>
                </KeyboardAvoidingView>
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