import {ActivityIndicator, Alert, Image, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import ClassButtonNavigator from "../components/ClassButtonNavigator";
import {useNavigation} from "@react-navigation/native";
import {colors, customFont, globalStyles} from "../theme/themes";
import {useState} from "react";
import {classService} from "../services/classService";

export const HomeScreen = () => {

    const navigator = useNavigation()

    const [isLoading, setIsLoading] = useState(false)

    const openClass = async (idTrilha) => {
        setIsLoading(true)

        try {
            const supabaseData = await classService.searchStapsByTrail(idTrilha)

            if (!supabaseData || supabaseData.length === 0) {
                Alert.alert("Nenhuma aula encontrada para esta trilha no momento.")
                return
            }

            navigator.navigate('aulaScreen', {etapas: supabaseData})
        } catch (error) {
            Alert.alert("Erro ao carregar o conteúdo. Verifique sua conexão")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.mainContainer}>
                    <Image style={{alignSelf: 'flex-start'}} source={images.logoImage} resizeMode={"contain"}/>

                    <Text style={styles.pageTitle}>Bem vindo Robert!</Text>

                    <ScrollView contentContainerStyle={{gap: 20, paddingBottom: 8}}>
                        <ClassButtonNavigator
                            classImage={images.cubePieces}
                            actionNav={() => openClass(1)}
                            buttonColor={colors.categoryCubePieces}
                            title={"Peças do Cubo"}
                            subtitle={"Conheça os 3 tipos de peças que formam um Cubo Mágico tradicional."}
                        />
                        <ClassButtonNavigator
                            classImage={images.basicMoves}
                            actionNav={() => openClass(2)}
                            buttonColor={colors.categoryBeginner}
                            title={"Movimentos Básicos"}
                            subtitle={"Aprenda o significado das letras para ler as fórmulas do Cubo Mágico."}
                        />
                        <ClassButtonNavigator
                            classImage={images.basicMethod}
                            actionNav={() => openClass(3)}
                            buttonColor={colors.categoryIntermediary}
                            title={"Método Básico"}
                            subtitle={"Aprenda a completar o cubo mágico resolvendo camada por camada."}
                        />
                        <ClassButtonNavigator
                            classImage={images.avancedMethod}
                            actionNav={() => openClass(4)}
                            buttonColor={colors.categoryAdvanced}
                            title={"Método Avançado"}
                            subtitle={"Aprenda a completar o cubo mágico em menos tempo com novos movimentos e atalhos."}
                        />
                    </ScrollView>

                    <Modal transparent={true} visible={isLoading} animationType={"fade"}>
                        <View style={styles.loadingOverlay}>
                            <View style={styles.loadingBox}>
                                <ActivityIndicator size="large" color={colors.primary} />
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
    pageTitle: {
        ...globalStyles.pageTitleStyle,
        fontSize: customFont.sizes.large,
        alignSelf: 'flex-start',
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: colors.backgroundOverlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingBox: {
        backgroundColor: colors.cardsAndMenus,
        padding: 25,
        borderRadius: 15,
        alignItems: 'center',
        gap: 15,
    },
    loadingText: {
        color: colors.text,
        fontFamily: customFont.bold,
        fontSize: customFont.sizes.medium,
    }
})