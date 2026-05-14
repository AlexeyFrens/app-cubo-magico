import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import {colors, customFont, globalStyles} from "../theme/themes";
import {useAlert} from "../contexts/AlertContext";
import {historicalTimeService} from "../services/historicalTimeService";
import {useNavigation} from "@react-navigation/native";

const Scramble = require('scrambo')

export const StopwatchScreen = () => {

    const navigation = useNavigation();

    const [isRunning, setIsRunning] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTime = useRef(0)
    const [scramble, setScramble] = useState([])
    const {showAlert} = useAlert()

    useEffect(() => {
        return navigation.addListener('blur', () => {
            setIsRunning(false)
            setIsLoading(false)
            setElapsedTime(0)
            intervalIdRef.current = null
            startTime.current = 0
            setScramble([])
        })
    }, [navigation]);

    useEffect(() => {

        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTime.current)
            }, 10)

            return () => {
                clearInterval(intervalIdRef.current)
            }
        }

    }, [isRunning])

    const start = () => {
        setIsRunning(true)
        startTime.current = Date.now() - elapsedTime
    }

    const stop = () => {
        setIsRunning(false)
    }

    const reset = () => {
        setElapsedTime(0)
        setIsRunning(false)
    }

    const formatTime = () => {

        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsedTime / (1000) % 60)
        let miliseconds = Math.floor((elapsedTime % 1000) / 10)

        minutes = String(minutes).padStart(2, '0')
        seconds = String(seconds).padStart(2, '0')
        miliseconds = String(miliseconds).padStart(2, '0')

        return `${minutes}:${seconds}:${miliseconds}`
    }

    const getScramble = () => {
        try {
            const generatedScramble = new Scramble().length(20).get(1)

            const arrayScramble = generatedScramble.toString().split(" ")

            setScramble(arrayScramble)
        } catch (error) {
            showAlert("Erro", "Falha em gerar sequência!")
        }
    }

    const saveSolve = async () => {

        setIsLoading(true)

        try {
            if (scramble.length > 0) {

                const formatedTime = formatTime()

                await historicalTimeService.saveHistoricalTime(formatedTime, scramble)

                showAlert("Sucesso", "Tempo e sequência salvos com sucesso!")
            } else {
                showAlert("Atenção", "Antes de salvar o tempo, " +
                    "é necessário gerar uma sequência aleatória utilizando o botão \"Gerar Sequência\".")
            }
        } catch (error) {
            showAlert("Erro", "Falha ao salvar tempo!")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.mainContainer}>

                    <Image style={{alignSelf: 'flex-start'}} source={images.logoImage} resizeMode={"contain"}/>

                    <View style={styles.mainContent}>
                        <View style={{gap: 20}}>
                            <Text style={styles.pageTitle}>Cronômetro</Text>

                            <Text style={styles.formatTimeText}>{formatTime()}</Text>

                            <View style={{flexDirection: "row", gap: 20}}>
                                <TouchableOpacity onPress={reset} style={[styles.button, styles.resetButton]}>
                                    <Text style={globalStyles.buttonTextStyle}>Reset</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={isRunning ? stop : start}
                                                  style={[styles.button, isRunning ? styles.stopButton : styles.startButton]}>
                                    {isRunning ? (
                                        <Text style={globalStyles.buttonTextStyle}>Stop</Text>
                                    ) : (
                                        <Text style={globalStyles.buttonTextStyle}>Start</Text>
                                    )}
                                </TouchableOpacity>
                            </View>

                            {elapsedTime !== 0 && isRunning === false && (
                                <TouchableOpacity onPress={saveSolve} style={globalStyles.roundedButton}>
                                    {isLoading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text style={globalStyles.buttonTextStyle}>Salvar Tempo</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={{gap: 20}}>
                            {scramble.length > 0 && (
                                <>
                                    <Text style={styles.pageTitle}>
                                        Sequência
                                    </Text>

                                    <View
                                        style={{backgroundColor: colors.cardsAndMenus, padding: 15, borderRadius: 10}}>
                                        <View style={styles.classScrambleContainer}>
                                            {scramble.map((word, index) => (
                                                <View key={index} style={styles.classScrambleBox}>
                                                    <Text style={styles.classScrambleText}>{word}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </>
                            )}

                            <TouchableOpacity onPress={getScramble} style={globalStyles.roundedButton}>
                                <Text style={globalStyles.buttonTextStyle}>Gerar Sequência</Text>
                            </TouchableOpacity>
                        </View>
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
    mainContent: {
        width: '100%',
        gap: 30
    },
    pageTitle: {
        ...globalStyles.pageTitleStyle,
        textAlign: 'center',
    },
    formatTimeText: {
        fontFamily: customFont.bold,
        fontSize: customFont.sizes.extraLarge,
        color: colors.text,
        textAlign: 'center'
    },
    button: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10,
    },
    startButton: {
        backgroundColor: colors.stopwatchStart
    },
    stopButton: {
        backgroundColor: colors.stopwatchStop
    },
    resetButton: {
        backgroundColor: colors.stopwatchReset
    },
    classScrambleContainer: {
        ...globalStyles.classScrambleContainer
    },
    classScrambleBox: {
        ...globalStyles.classScrambleBox
    },
    classScrambleText: {
        ...globalStyles.classScrambleText
    },
})
