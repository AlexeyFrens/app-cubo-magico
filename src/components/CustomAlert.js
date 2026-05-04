import {Modal, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {customFont, globalStyles} from "../theme/themes";

export const CustomAlert = ({visible, title, message, onClose}) => {
    return (
        <Modal transparent={true} visible={visible} animationType={"fade"} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    <View style={{gap: 10}}>
                        <Text style={styles.modalTitle}>{title}</Text>

                        <Text style={[globalStyles.normalText, {fontSize: customFont.sizes.medium}]}>{message}</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        ...globalStyles.modalOverlay
    },
    modalBox: {
        ...globalStyles.modalBox,
        maxWidth: 320,
        gap: 30
    },
    modalTitle: {
        ...globalStyles.modalTitle,
        textAlign: "center",
        fontSize: customFont.sizes.large
    },
    button: {
        ...globalStyles.roundedButton,
        minWidth: 100
    },
    buttonText: {
        ...globalStyles.buttonTextStyle
    }
})