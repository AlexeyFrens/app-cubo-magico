import {ActivityIndicator, Alert, Image, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import ClassButtonNavigator from "../components/ClassButtonNavigator";
import {useNavigation} from "@react-navigation/native";
import {colors, customFont, globalStyles} from "../theme/themes";
import {useState} from "react";

export const HomeScreen = () => {

    const navigator = useNavigation()

    const [isLoading, setIsLoading] = useState(false)

    const openClass = async (idTrilha) => {
        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

            const dados = [
                {
                    id: 1,
                    titulo: "Centros",
                    texto: "São as 6 peças centrais do cubo. Elas são fixas e indicam a cor da face. Por exemplo, o centro amarelo indica que a face deverá ser toda amarela.\n\nImportante lembrar que não é possível trocar os centros de lugar.",
                    sequencia: null, // Sem botões azuis,
                    ordem: 0,
                    imagem_url: images.brandIcon
                },
                {
                    id: 2,
                    titulo: "F2L - Caso 1",
                    texto: "Esse algoritmo apenas funcionará se a quina estiver com o lado branco virado para a direita e o topo da quina e o meio estiverem com cores diferentes.",
                    sequencia: ['R', 'U', "R'"],
                    ordem: 1,
                    imagem_url: images.brandIcon
                }
            ]

            navigator.navigate('aulaScreen', {etapas: dados})
        } catch (error) {
            console.error("Erro ao baixar a aula:", error)
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