import {Image, Text, StyleSheet, View, ScrollView} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import {colors, customFont, globalStyles} from "../theme/themes";

export const AnalyticsScreen = ({route}) => {

    const timesList = route.params.data

    const betterTime = () => {

        if (!timesList || timesList.length === 0) return "Não há tempos salvos";

        let menorTempo = timesList[0].time_cs

        timesList.forEach(time => {
            if (time.time_cs < menorTempo) {
                menorTempo = time.time_cs
            }
        })

        return menorTempo;
    }

    const lossTime = () => {

        if (!timesList || timesList.length === 0) return "Não há tempos salvos";

        let maiorTempo = timesList[0].time_cs

        timesList.forEach(time => {
            if (time.time_cs > maiorTempo) {
                maiorTempo = time.time_cs
            }
        })

        return maiorTempo;
    }

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundPrimary}}>
                    <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <Image style={{alignSelf: 'flex-start'}} source={images.logoImage} resizeMode={"contain"}/>

                            <Text style={styles.pageTitle}>Analytics</Text>

                            <View style={{gap: 20, width: '100%'}}>
                                <View style={styles.totalResolutions}>
                                    <Text style={[styles.totalResolutionsText, {color: colors.text}]}>Total de
                                        Resoluções</Text>
                                    <Text
                                        style={[styles.totalResolutionsText, {color: colors.categoryBeginner}]}>{timesList.length}</Text>
                                </View>
                                <View style={{flexDirection: 'row', gap: 20}}>
                                    <View style={[styles.totalResolutions, {
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 10,
                                        flex: 1
                                    }]}>
                                        <Text style={[styles.menorEMaiorText, {color: colors.text}]}>Melhor Tempo</Text>
                                        <Text
                                            style={[styles.totalResolutionsText, {color: colors.categoryBeginner}]}>{betterTime()}</Text>
                                    </View>
                                    <View style={[styles.totalResolutions, {
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 10,
                                        flex: 1
                                    }]}>
                                        <Text style={[styles.menorEMaiorText, {color: colors.text}]}>Pior Tempo</Text>
                                        <Text
                                            style={[styles.totalResolutionsText, {color: colors.categoryBeginner}]}>{lossTime()}</Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={[styles.pageTitle, {fontSize: 16}]}>Gráfico de Evolução</Text>

                            {timesList.length < 2 ? (
                                <View style={{
                                    borderWidth: 2,
                                    borderRadius: 10,
                                    borderColor: colors.cardsAndMenus,
                                    padding: 20,
                                    marginTop: -20
                                }}>
                                    <Text style={globalStyles.normalText}>Salve 2 tempos para desbloquear o gráfico de
                                        evolução</Text>
                                </View>
                            ) : (
                                <View>

                                </View>
                            )}

                            <Text style={[styles.pageTitle, {fontSize: 16}]}>Tabela de Resoluções</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        ...globalStyles.container
    },
    pageTitle: {
        ...globalStyles.pageTitleStyle
    },
    totalResolutions: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.cardsAndMenus
    },
    totalResolutionsText: {
        fontFamily: customFont.bold,
        fontSize: customFont.sizes.medium
    },
    menorEMaiorText: {
        fontFamily: customFont.bold,
        fontSize: customFont.sizes.small
    }
})