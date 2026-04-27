import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";

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
        case "#0D6402":
            return "#FFFFFF"
        case "#FFC107":
            return "#313131"
        case "#FF9800":
            return "#313131"
        case "#9C27B0":
            return "#FFFFFF"
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 50,
        boxShadow: [{
            color: 'rgba(0, 0, 0, 0.5)',
            blurRadius: 4,
            offsetX: -4,
            offsetY: 5
        }],
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
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Lato_700Bold'
    },
    subtitle: {
        fontSize: 10,
        fontFamily: 'Lato_400Regular'
    }
})