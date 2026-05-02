import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {colors, customFont, globalStyles} from "../theme/themes";

export default function ClassButtonNavigator({classImage, actionNav, buttonColor, title, subtitle}) {
    return(
        <>
            <TouchableOpacity onPress={actionNav} style={[styles.container, {backgroundColor: buttonColor}]}>
                <View style={styles.content}>
                    <Image source={classImage} resizeMode={"contain"}/>

                    <View style={styles.textContainer}>
                        <Text style={[styles.title, {color: checkColor(buttonColor)}]}>{title}</Text>
                        <Text style={[styles.subtitle, {color: checkColor(buttonColor)}]}>{subtitle}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

const checkColor = (color) => {
    switch(color) {
        case colors.categoryCubePieces:
            return colors.text
        case colors.categoryBeginner:
            return colors.backgroundPrimary
        case colors.categoryIntermediary:
            return colors.backgroundPrimary
        case colors.categoryAdvanced:
            return colors.text
    }
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.defaultShadow,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 50,
        marginLeft: 5
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: 30
    },
    textContainer: {
        flex: 1,
        alignItems: "center",
        gap: 10
    },
    title: {
        fontSize: customFont.sizes.large,
        textAlign: "center",
        fontFamily: customFont.bold
    },
    subtitle: {
        fontSize: customFont.sizes.small,
        fontFamily: customFont.regular
    }
})