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
                            classImage={images.prepareTheCross}
                            actionNav={() => openClass(3)}
                            buttonColor={colors.categoryCubePieces}
                            title={"Preparar a Cruz"}
                            subtitle={"Este é um passo totalmente intuitivo, ou seja, não possui fórmulas específicas pra cada situação. Você deve fazer a preparação da cruz da maneira que achar melhor."}
                        />
                        <ClassButtonNavigator
                            classImage={images.finishCross}
                            actionNav={() => openClass(4)}
                            buttonColor={colors.categoryBeginner}
                            title={"Finalizar a Cruz"}
                            subtitle={"O passo mais simples de todos! Basta alinhar as cores e descer os meios brancos para a base do cubo."}
                        />
                        <ClassButtonNavigator
                            classImage={images.firstLayer}
                            actionNav={() => openClass(5)}
                            buttonColor={colors.categoryIntermediary}
                            title={"Primeira Camada"}
                            subtitle={"Agora nós vamos finalizar toda a camada branca, ou seja, montar as 4 quinas brancas na base do cubo."}
                        />
                        <ClassButtonNavigator
                            classImage={images.secondLayer}
                            actionNav={() => openClass(6)}
                            buttonColor={colors.categoryAdvanced}
                            title={"Segunda Camada"}
                            subtitle={"Neste passo nós iremos finalizar a camada do meio do cubo utilizando apenas 2 fórmulas."}
                        />
                        <ClassButtonNavigator
                            classImage={images.yellowCross}
                            actionNav={() => openClass(7)}
                            buttonColor={colors.categoryCubePieces}
                            title={"Cruz Amarela"}
                            subtitle={"Neste passo você deve utilizar a mesma fórmula alterando apenas a posição do cubo para criar uma cruz amarela no topo."}
                        />
                        <ClassButtonNavigator
                            classImage={images.yellowFace}
                            actionNav={() => openClass(8)}
                            buttonColor={colors.categoryBeginner}
                            title={"Face Amarela"}
                            subtitle={"Neste passo você deve utilizar a mesma fórmula, que chamamos de SUNE, alterando apenas a posição do cubo para preencher toda a face amarela no topo."}
                        />
                        <ClassButtonNavigator
                            classImage={images.finishCorners}
                            actionNav={() => openClass(9)}
                            buttonColor={colors.categoryIntermediary}
                            title={"Finalizar as Quinas"}
                            subtitle={"Agora nós iremos finalizar todas as quinas da última camada utilizando apenas 1 fórmula."}
                        />
                        <ClassButtonNavigator
                            classImage={images.finishTheMiddle}
                            actionNav={() => openClass(10)}
                            buttonColor={colors.categoryAdvanced}
                            title={"Finalizar os Meios"}
                            subtitle={"O objetivo agora é finalizar os meios da última camada utilizando 1 fórmula com 2 variações. Basta posicionar a face correta nas costas do cubo e identificar se o seu cubo é o caso horário ou anti-horário."}
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