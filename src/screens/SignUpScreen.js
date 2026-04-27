import {Text, StyleSheet, View, TouchableOpacity, Image, TextInput} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import {useNavigation} from "@react-navigation/native";

export const SignUpScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
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
                                   keyboardType={"email-address"} placeholderTextColor={"#B0BEC5"} autoCapitalize={"none"}/>
                    </View>
                    <View style={{gap: 5}}>
                        <Text style={styles.text}>Senha</Text>
                        <TextInput placeholder={"Digite uma senha"} style={styles.input}
                                   placeholderTextColor={"#B0BEC5"}/>
                    </View>

                    <View style={{gap: 5}}>
                        <Text style={styles.text}>Confirmar Senha</Text>
                        <TextInput placeholder={"Digite novamente a senha"} style={styles.input}
                                   placeholderTextColor={"#B0BEC5"}/>
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
    container: {
        flex: 1,
        justifyItems: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#313131',
        gap: 45
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        alignSelf: "flex-start"
    },
    backButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#FFFFFF'
    },
    input: {
        borderWidth: 2,
        padding: 5,
        borderRadius: 5,
        borderColor: "#585858",
        width: '100%',
        maxWidth: 322,
        fontSize: 12,
        color: "#B0BEC5"
    },
    text: {
        fontSize: 12,
        color: '#FFFFFF'
    },
    button: {
        backgroundColor: '#2962FF',
        borderRadius: 15,
        padding: 10
    },
    buttonText: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})