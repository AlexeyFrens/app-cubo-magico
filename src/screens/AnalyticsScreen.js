import {
    Image,
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Dimensions,
    ActivityIndicator
} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import {colors, customFont, globalStyles} from "../theme/themes";
import {useEffect, useState} from "react";
import {historicalTimeService} from "../services/historicalTimeService";
import {useAlert} from "../contexts/AlertContext";
import {Feather} from "@expo/vector-icons";
import {LineChart} from "react-native-gifted-charts";

export const AnalyticsScreen = ({route}) => {

    const [isModalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [timesList, setTimesList] = useState(route.params.data)

    const {showAlert} = useAlert()

    useEffect(() => {
        if (route.params.data) {
            setTimesList(route.params.data)
        }
    }, [route.params.data])

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

    const convertTime = (time) => {
        const fields = time.split(":")

        const minutes = parseInt(fields[0])
        const seconds = parseInt(fields[1])
        const hundredths = parseInt(fields[2])

        return (minutes * 60) + seconds + (hundredths / 100)
    }

    const getChartData = () => {
        return timesList.map((time, index) => {
            const timeConverted = convertTime(time.time_cs)

            return {
                value: timeConverted,
                label: `Res. ${index + 1}`,
                dataPointText: time.time_cs
            }
        })
    }

    const chartData = getChartData();

    const screenWidth = Dimensions.get("window").width;
    const chartWidth = screenWidth - 120
    const dinamicSpacing = chartData.length > 1
        ? Math.max(60, (chartWidth - 60) / (chartData.length - 1))
        : 70

    const getScramble = (scramble) => {
        let scrambleString = ""

        scramble.map(scramble => {
            if (scrambleString.length > 0) {
                scrambleString += ` ${scramble}`
            } else {
                scrambleString += `${scramble}`
            }
        })

        return scrambleString
    }

    const deleteTime = async () => {
        setIsLoading(true)

        try {
            await historicalTimeService.deleteHistoricalTime(idToDelete)

            setTimesList(oldTimes => oldTimes.filter(oldTime => oldTime.id !== idToDelete))

            showAlert("Sucesso", "Tempo deletado com sucesso!")
            setModalVisible(false)
        } catch (error) {
            showAlert("Erro", error.message)
            setModalVisible(false)
        } finally {
            setIsLoading(false)
        }
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
                                            style={[styles.totalResolutionsText, {
                                                color: colors.categoryBeginner,
                                                textAlign: 'center'
                                            }]}>{betterTime()}</Text>
                                    </View>
                                    <View style={[styles.totalResolutions, {
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 10,
                                        flex: 1
                                    }]}>
                                        <Text style={[styles.menorEMaiorText, {color: colors.text}]}>Pior Tempo</Text>
                                        <Text
                                            style={[styles.totalResolutionsText, {
                                                color: colors.categoryBeginner,
                                                textAlign: 'center'
                                            }]}>{lossTime()}</Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={[styles.pageTitle, {fontSize: 16, marginTop: 10}]}>Gráfico de Evolução</Text>

                            {timesList.length < 2 ? (
                                <View style={styles.warningsStyle}>
                                    <Text style={globalStyles.normalText}>Salve 2 tempos para desbloquear o gráfico de
                                        evolução</Text>
                                </View>
                            ) : (
                                <View style={{width: '100%'}}>
                                    <LineChart
                                        data={chartData}
                                        width={chartWidth}
                                        areaChart={true}
                                        color={colors.primary}
                                        thickness={3}
                                        startFillColor={colors.primary}
                                        endFillColor={colors.primary}
                                        startOpacity={0.6}
                                        endOpacity={0.1}
                                        dataPointsColor={"white"}
                                        dataPointsRadius={5}
                                        textColor={"white"}
                                        textFontSize={12}
                                        textShiftX={-10}
                                        textShiftY={-12}
                                        yAxisTextStyle={{color: colors.textPlaceholder, fontSize: 11}}
                                        xAxisLabelTextStyle={{color: colors.textPlaceholder, fontSize: 11}}
                                        yAxisColor={colors.textPlaceholder}
                                        xAxisColor={colors.textPlaceholder}
                                        hideRules={true}
                                        initialSpacing={20}
                                        spacing={dinamicSpacing}
                                        backgroundColor={"transparent"}
                                        scrollAnimation={true}
                                    />
                                </View>
                            )}

                            <Text style={[styles.pageTitle, {fontSize: 16}]}>Tabela de Resoluções</Text>

                            {timesList.length === 0 ? (
                                <View style={styles.warningsStyle}>
                                    <Text style={globalStyles.normalText}>
                                        Seus tempos salvos aparecem aqui. Você ainda não tem tempos salvos
                                    </Text>
                                </View>
                            ) : (
                                <View style={{width: '100%'}}>
                                    {timesList.map((time, index) => (
                                        index > 0 ? (
                                            <View key={time.id} style={styles.timersListStyle}>
                                                <View style={{flex: 2, gap: 5}}>
                                                    <Text style={globalStyles.normalText}>{time.time_cs}</Text>
                                                </View>
                                                <View style={{flex: 4, gap: 5, flexShrink: 1}}>
                                                    <Text style={globalStyles.normalText}>
                                                        {getScramble(time.scramble)}
                                                    </Text>
                                                </View>
                                                <View style={{flex: 1, alignItems: 'flex-end', alignSelf: 'center'}}>
                                                    <TouchableOpacity onPress={() => {
                                                        setModalVisible(true)
                                                        setIdToDelete(time.id)
                                                    }}>
                                                        <Feather name="trash-2" size={24} color={colors.cardsAndMenus}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ) : (
                                            <View key={time.id} style={styles.timersListStyle}>
                                                <View style={{flex: 2, gap: 5}}>
                                                    <Text style={styles.labelTimeList}>Tempo</Text>
                                                    <Text style={globalStyles.normalText}>{time.time_cs}</Text>
                                                </View>
                                                <View style={{flex: 4, gap: 5, flexShrink: 1}}>
                                                    <Text style={styles.labelTimeList}>Scramble</Text>
                                                    <Text style={globalStyles.normalText}>
                                                        {getScramble(time.scramble)}
                                                    </Text>
                                                </View>
                                                <View style={{flex: 1, alignItems: 'flex-end', alignSelf: 'center'}}>
                                                    <TouchableOpacity onPress={() => {
                                                        setModalVisible(true)
                                                        setIdToDelete(time.id)
                                                    }}>
                                                        <Feather name="trash-2" size={24} color={colors.cardsAndMenus}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    ))}
                                </View>
                            )}

                            <Modal transparent={true} visible={isModalVisible} animationType={"fade"}
                                   onRequestClose={() => setModalVisible(false)}
                            >
                                <View style={styles.modalOverlay}>
                                    <View style={styles.modalBox}>
                                        <Text style={styles.modalTitle}>Você tem certeza que deseja deletar o
                                            tempo?</Text>

                                        <View style={{flexDirection: 'row', gap: 10}}>
                                            <TouchableOpacity style={[styles.button, styles.cancelButton]}
                                                              onPress={() => setModalVisible(false)}>
                                                <Text
                                                    style={[{fontWeight: 'bold'}, globalStyles.normalText]}>Cancelar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.button, styles.deleteButton]}
                                                              onPress={deleteTime}>
                                                {isLoading ? (
                                                    <ActivityIndicator color={"white"} />
                                                ) : (
                                                    <Text style={[{fontWeight: 'bold'}, globalStyles.normalText]}>
                                                        Deletar
                                                    </Text>
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
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
    },
    warningsStyle: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.cardsAndMenus,
        padding: 20,
    },
    modalOverlay: {
        ...globalStyles.modalOverlay
    },
    modalBox: {
        ...globalStyles.modalBox,
        maxWidth: 320
    },
    modalTitle: {
        ...globalStyles.modalTitle,
        textAlign: "center"
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    deleteButton: {
        backgroundColor: colors.primary
    },
    cancelButton: {
        backgroundColor: colors.backgroundPrimary
    },
    timersListStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: colors.cardsAndMenus
    },
    labelTimeList: {
        fontFamily: customFont.bold,
        fontSize: customFont.sizes.small,
        color: colors.categoryBeginner
    }
})