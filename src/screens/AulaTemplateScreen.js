import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import {colors, customFont, globalStyles} from "../theme/themes";
import DropDownPicker from "react-native-dropdown-picker";

export const AulaTemplateScreen = ({route}) => {

    const navigator = useNavigation()

    const {etapas: steps} = route.params

    const [passoAtual, setPassoAtual] = useState(0)

    const conteudoAtual = steps[passoAtual];

    const continueButton = () => {
        if (passoAtual < steps.length - 1) {
            setPassoAtual(passoAtual + 1)
        } else {
            navigator.goBack()
        }
    }

    const backButton = () => {
        if (passoAtual > 0) {
            setPassoAtual(passoAtual - 1)
        } else {
            navigator.goBack()
        }
    }

    const [dropDownOpen, setDropDownOpen] = useState(false)

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.mainContainer}>
                    <Image style={{alignSelf: 'flex-start'}} source={images.logoImage} resizeMode={"contain"}/>

                    <DropDownPicker setValue={setPassoAtual}
                                    value={passoAtual}
                                    items={steps.map((step, index) => ({
                                        label: step.titulo,
                                        value: index
                                    }))}
                                    open={dropDownOpen}
                                    setOpen={setDropDownOpen}
                                    style={styles.dropdownStyle}
                                    textStyle={styles.dropdownTextStyle}
                                    dropDownContainerStyle={styles.dropdownListContainer}
                                    arrowIconStyle={{tintColor: colors.text}}
                                    tickIconStyle={{tintColor: colors.text}}
                    />

                    <Image style={{width: '100%', height: 200}} source={{uri: conteudoAtual.image_url}}
                           resizeMode={"contain"}/>

                    <View style={{gap: 20}}>
                        <View style={styles.classCardContainer}>
                            <Text style={styles.classCardTitle}>{conteudoAtual.titulo}</Text>

                            {conteudoAtual.sequencia && conteudoAtual.sequencia.length > 0 && (
                                <View style={styles.classScrambleContainer}>
                                    {conteudoAtual.sequencia.map((word, index) => (
                                        <View key={index} style={styles.classScrambleBox}>
                                            <Text style={styles.classScrambleText}>{word}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            <Text style={globalStyles.normalText}>{conteudoAtual.texto}</Text>
                        </View>

                        <View style={{flexDirection: 'row', gap: 10}}>
                            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={backButton}>
                                <Text style={[{fontWeight: 'bold'}, globalStyles.normalText]}>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={continueButton}>
                                <Text style={[{fontWeight: 'bold'}, globalStyles.normalText]}>
                                    {passoAtual === steps.length - 1 ? "Finalizar" : "Continuar"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.primary,
                                borderRadius: 100,
                                padding: 10,
                                alignSelf: 'center'
                            }}
                            onPress={() => navigator.goBack()}
                        >
                            <Image source={images.homeButton} resizeMode={"contain"}/>
                        </TouchableOpacity>
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
    dropdownStyle: {
        backgroundColor: colors.backgroundPrimary,
        borderColor: colors.cardsAndMenus,
        borderRadius: 5,
        borderWidth: 3
    },
    dropdownTextStyle: {
        color: colors.text,
        textAlign: 'center',
        fontFamily: customFont.regular,
        fontSize: 16,
    },
    dropdownListContainer: {
        backgroundColor: colors.cardsAndMenus,
        borderColor: colors.cardsAndMenus
    },
    classCardContainer: {
        backgroundColor: colors.cardsAndMenus,
        padding: 20,
        borderRadius: 15,
        gap: 10
    },
    classCardTitle: {
        ...globalStyles.normalText,
        fontWeight: 'bold',
    },
    classScrambleContainer: {
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
    },
    classScrambleBox: {
        backgroundColor: colors.primary,
        padding: 10,
        boxShadow: [{
            color: 'rgba(0, 0, 0, 0.6)',
            blurRadius: 1,
            offsetX: 0,
            offsetY: 2
        }],
        borderRadius: 5
    },
    classScrambleText: {
        ...globalStyles.normalText,
        fontWeight: 'bold'
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    continueButton: {
        backgroundColor: colors.primary
    },
    backButton: {
        backgroundColor: colors.textPlaceholder
    }
})