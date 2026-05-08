import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {useEffect, useRef, useState} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../assets/ImageStorage";
import {colors, customFont, globalStyles} from "../theme/themes";

export const StopwatchScreen = () => {

    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTime = useRef(0)

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

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.mainContainer}>

                    <Image style={{alignSelf: 'flex-start'}} source={images.logoImage} resizeMode={"contain"}/>

                    <Text style={styles.pageTitle}>Cronômetro</Text>

                    <View style={styles.mainContent}>
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
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    pageTitle: {
        ...globalStyles.pageTitleStyle
    },
    formatTimeText: {
        fontFamily: customFont.bold,
        fontSize: customFont.sizes.extraLarge,
        color: colors.text
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
    }
})
