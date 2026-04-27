import {StyleSheet, Image, Text, ScrollView} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import ClassButtonNavigator from "../components/ClassButtonNavigator";
import {useNavigation} from "@react-navigation/native";
import {colors, customFont, globalStyles} from "../theme/themes";

export const HomeScreen = () => {

    const navigator = useNavigation()

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.mainContainer}>
                    <Image style={{alignSelf: 'flex-start'}} source={images.logoImage} resizeMode={"contain"}/>

                    <Text style={styles.pageTitle}>Bem vindo Robert!</Text>

                    <ScrollView contentContainerStyle={{gap: 20, paddingBottom: 8}}>
                        <ClassButtonNavigator
                            classImage={images.cubePieces}
                            actionNav={() => navigator.navigate('cubePieces')}
                            buttonColor={colors.categoryCubePieces}
                            title={"Peças do Cubo"}
                            subtitle={"Conheça os 3 tipos de peças que formam um Cubo Mágico tradicional."}
                        />
                        <ClassButtonNavigator
                            classImage={images.basicMoves}
                            actionNav={() => navigator.navigate('basicMoves')}
                            buttonColor={colors.categoryBeginner}
                            title={"Movimentos Básicos"}
                            subtitle={"Aprenda o significado das letras para ler as fórmulas do Cubo Mágico."}
                        />
                        <ClassButtonNavigator
                            classImage={images.basicMethod}
                            actionNav={() => navigator.navigate('basicMethod')}
                            buttonColor={colors.categoryIntermediary}
                            title={"Método Básico"}
                            subtitle={"Aprenda a completar o cubo mágico resolvendo camada por camada."}
                        />
                        <ClassButtonNavigator
                            classImage={images.avancedMethod}
                            actionNav={() => navigator.navigate('advancedMethod')}
                            buttonColor={colors.categoryAdvanced}
                            title={"Método Avançado"}
                            subtitle={"Aprenda a completar o cubo mágico em menos tempo com novos movimentos e atalhos."}
                        />
                    </ScrollView>
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
})