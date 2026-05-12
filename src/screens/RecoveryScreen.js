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
import {images} from "../../assets/ImageStorage";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {colors, globalStyles} from "../theme/themes";
import {useState} from "react";
import {authService} from "../services/authService";
import {useAlert} from "../contexts/AlertContext";

export const RecoveryScreen = () => {

    const navigation = useNavigation()
    const {showAlert} = useAlert()

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [codigoEnviado, setCodigoEnviado] = useState(false);
    const [codigoValidado, setCodigoValidado] = useState(false)

    const sendRecuperationCode = async () => {

        if (!email) {
            showAlert("Erro", "Preencha o campo de email!")
            return
        }

        setIsLoading(true);

        try {
            await authService.requestPasswordReset(email)
            setCodigoEnviado(true)
        } catch (error) {
            showAlert("Erro", "Não foi possível enviar o código. Verifique sua conexão!")
        } finally {
            setIsLoading(false);
        }
    }

    const verifyOtpCode = async () => {

        if (!code) {
            showAlert("Erro", "Insira o código recebido no campo!")
            return
        }

        setIsLoading(true);

        try {
            await authService.verifyOtpForResetPassword(email, code)
            setCodigoValidado(true)
            setCodigoEnviado(false)
        } catch (error) {
            showAlert("Erro", error.message)
        } finally {
            setIsLoading(false);
        }
    }

    const updatePassword = async () => {

        if (!password) {
            showAlert("Erro", "Preencha o campo de senha com sua nova senha!")
            return
        }

        setIsLoading(true)

        try {
            await authService.updatePasswordWithCode(password)
            showAlert("Sucesso", "Sua senha foi atualizada com sucesso!")
            setCodigoValidado(false)
            navigation.goBack()
        } catch (error) {
            showAlert("Erro", error.message)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
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

                                <View style={{gap: 20, alignItems: 'center'}}>
                                    <Text style={styles.pageTitle}>Recuperar Senha</Text>

                                    {codigoEnviado === false && codigoValidado === false && (
                                        <Text style={globalStyles.normalText}>
                                            Para recuperar a sua senha, informe seu endereço de email que nós enviaremos
                                            um
                                            código de 8 dígitos para a alteração da sua senha.
                                        </Text>
                                    )}

                                    {codigoEnviado === true && (
                                        <Text style={globalStyles.normalText}>
                                            Digite o código de 6 dígitos recebido no email no input de texto abaixo para
                                            recuperar a sua senha.
                                        </Text>
                                    )}
                                </View>

                                {codigoEnviado === false && codigoValidado === false && (
                                    <View style={{gap: 20, width: '100%'}}>
                                        <View style={{gap: 5}}>
                                            <Text style={styles.text}>Email</Text>
                                            <TextInput placeholder={"ex: exemplo@gmail.com"}
                                                       style={styles.input}
                                                       keyboardType={"email-address"}
                                                       placeholderTextColor={colors.textPlaceholder}
                                                       autoCapitalize={"none"} onChangeText={setEmail}/>
                                        </View>

                                        <TouchableOpacity onPress={sendRecuperationCode} style={styles.button}
                                                          disabled={isLoading}>
                                            {isLoading ? (
                                                <ActivityIndicator color="white"/>
                                            ) : (
                                                <Text style={styles.buttonText}>Enviar Código</Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                )}

                                {codigoEnviado === true && (
                                    <View style={{gap: 20, width: '100%'}}>
                                        <TextInput placeholder={"ex: 14234596"}
                                                   style={styles.input}
                                                   keyboardType={"number-pad"}
                                                   placeholderTextColor={colors.textPlaceholder}
                                                   onChangeText={setCode}/>

                                        <TouchableOpacity onPress={verifyOtpCode} style={styles.button}
                                                          disabled={isLoading}>
                                            {isLoading ? (
                                                <ActivityIndicator color="white"/>
                                            ) : (
                                                <Text style={styles.buttonText}>Verificar Código</Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                )}

                                {codigoValidado === true && (
                                    <View style={{gap: 20, width: '100%'}}>
                                        <View style={{gap: 5}}>
                                            <Text style={styles.text}>Nova Senha</Text>
                                            <TextInput placeholder={"Digite sua nova senha"}
                                                       style={styles.input}
                                                       secureTextEntry={true}
                                                       placeholderTextColor={colors.textPlaceholder}
                                                       autoCapitalize={"none"} onChangeText={setPassword}/>
                                        </View>

                                        <TouchableOpacity onPress={updatePassword} style={styles.button}
                                                          disabled={isLoading}>
                                            {isLoading ? (
                                                <ActivityIndicator color="white"/>
                                            ) : (
                                                <Text style={styles.buttonText}>Atualizar Senha</Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Pressable>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
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
    input: {
        ...globalStyles.inputStyle
    },
    pageTitle: {
        ...globalStyles.pageTitleStyle
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