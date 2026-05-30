import {ActivityIndicator, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import ClassButtonNavigator from "../components/ClassButtonNavigator";
import {useNavigation} from "@react-navigation/native";
import {colors, globalStyles} from "../theme/themes";
import {useState} from "react";
import {classService} from "../services/classService";
import {useAlert} from "../contexts/AlertContext";

export const BasicMethodScreen = () => {

    const navigator = useNavigation()
    const {showAlert} = useAlert()

    const [isLoading, setIsLoading] = useState(false)

    const openClass = async (idTrilha) => {
        setIsLoading(true)

        try {
            const supabaseData = await classService.searchStapsByTrail(idTrilha)

            if (!supabaseData || supabaseData.length === 0) {
                showAlert("Nenhuma aula encontrada para esta trilha no momento.")
                return
            }

            const imagePromises = supabaseData.map((step) => {
                if (step.image_url) {
                    return Image.prefetch(step.image_url)
                }
                return Promise.resolve()
            })

            await Promise.all(imagePromises)

            navigator.navigate('aulaScreen', {etapas: supabaseData})
        } catch (error) {
            showAlert("Erro ao carregar o conteúdo. Verifique sua conexão")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.mainContainer}>
                    <Image style={{alignSelf: 'flex-start'}} source={images.logoImage} resizeMode={"contain"}/>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigator.goBack()}>
                        <Image source={images.backButton} resizeMode={"contain"}/>
                        <Text style={styles.backButtonText}>Método Básico</Text>
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={{gap: 20, paddingBottom: 8}}
                                showsVerticalScrollIndicator={false}>
                        <ClassButtonNavigator
                            classImage={images.cubePieces}
                            actionNav={() => openClass(0)}
                            buttonColor={colors.categoryCubePieces}
                            title={"Peças do Cubo"}
                            subtitle={"Conheça os 3 tipos de peças que formam um Cubo Mágico tradicional."}
                        />
                    </ScrollView>

                    <Modal transparent={true} visible={isLoading} animationType={"fade"}>
                        <View style={styles.loadingOverlay}>
                            <View style={styles.loadingBox}>
                                <ActivityIndicator size="large" color={colors.primary}/>
                                <Text style={styles.loadingText}>Preparando aula...</Text>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        ...globalStyles.container,
        gap: 20
    },
    backButton: {
        ...globalStyles.backButtonStyle
    },
    backButtonText: {
        ...globalStyles.backButtonTextStyle
    },
    loadingOverlay: {
        ...globalStyles.modalOverlay
    },
    loadingBox: {
        ...globalStyles.modalBox
    },
    loadingText: {
        ...globalStyles.modalTitle
    }
})