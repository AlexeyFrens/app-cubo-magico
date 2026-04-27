import {StyleSheet, Image, Text, ScrollView} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import ClassButtonNavigator from "../components/ClassButtonNavigator";
import {useNavigation} from "@react-navigation/native";

export const HomeScreen = () => {

    const navigator = useNavigation()

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Image style={{alignSelf: 'flex-start'}} source={images.logoImage} resizeMode={"contain"}/>

                    <Text style={styles.pageTitle}>Bem vindo Robert!</Text>

                    <ScrollView contentContainerStyle={{gap: 20, paddingBottom: 8}}>
                        <ClassButtonNavigator
                            classImage={images.cubePieces}
                            actionNav={() => navigator.navigate('cubePieces')}
                            buttonColor={"#0D6402"}
                            title={"Peças do Cubo"}
                            subtitle={"Conheça os 3 tipos de peças que formam um Cubo Mágico tradicional."}
                        />
                        <ClassButtonNavigator
                            classImage={images.basicMoves}
                            actionNav={() => navigator.navigate('basicMoves')}
                            buttonColor={"#FFC107"}
                            title={"Movimentos Básicos"}
                            subtitle={"Aprenda o significado das letras para ler as fórmulas do Cubo Mágico."}
                        />
                        <ClassButtonNavigator
                            classImage={images.basicMethod}
                            actionNav={() => navigator.navigate('basicMethod')}
                            buttonColor={"#FF9800"}
                            title={"Método Básico"}
                            subtitle={"Aprenda a completar o cubo mágico resolvendo camada por camada."}
                        />
                        <ClassButtonNavigator
                            classImage={images.avancedMethod}
                            actionNav={() => navigator.navigate('advancedMethod')}
                            buttonColor={"#9C27B0"}
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
    container: {
        flex: 1,
        justifyItems: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#313131',
        gap: 20
    },
    pageTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        alignSelf: 'flex-start',
        fontFamily: 'Lato_700Bold'
    },
})