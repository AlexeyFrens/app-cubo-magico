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

export const RecoveryScreen = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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

                                <Text style={styles.pageTitle}>Recuperar Senha</Text>

                                <View style={{gap: 20, width: '100%'}}>
                                    <View style={{gap: 5}}>
                                        <Text style={styles.text}>Email</Text>
                                        <TextInput placeholder={"Insira o email cadastrado na Cubol Learning"}
                                                   style={styles.input}
                                                   keyboardType={"email-address"}
                                                   placeholderTextColor={colors.textPlaceholder}
                                                   autoCapitalize={"none"} onChangeText={setEmail}/>
                                    </View>

                                    <TouchableOpacity style={styles.button} disabled={isLoading}>
                                        {isLoading ? (
                                            <ActivityIndicator color="white"/>
                                        ) : (
                                            <Text style={styles.buttonText}>Recuperar</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
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