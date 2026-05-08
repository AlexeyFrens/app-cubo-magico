export const colors = {
    backgroundOverlay: 'rgba(0, 0, 0, 0.6)',
    backgroundPrimary: '#313131',
    cardsAndMenus: '#585858',
    textPlaceholder: '#798489',
    stopwatchStart: '#00E676',
    stopwatchStop: '#FF3D00',
    stopwatchReset: '#585858',
    primary: '#2962FF',
    categoryCubePieces: '#0D6402',
    categoryBeginner: '#FFC107',
    categoryIntermediary: '#FF9800',
    categoryAdvanced: '#9C27B0',
    text: '#FFFFFF'
}

export const customFont = {
    regular: 'Lato_400Regular',
    bold: 'Lato_700Bold',
    sizes: {
        smaller: 10,
        small: 12,
        medium: 16,
        large: 20,
        xlarge: 22,
        xxlarge: 24,
        extraLarge: 60
    }
};

export const globalStyles = {
    defaultShadow: {
        boxShadow: [{
            color: 'rgba(0, 0, 0, 0.5)',
            blurRadius: 4,
            offsetX: -4,
            offsetY: 5
        }],
    },
    container: {
        flex: 1,
        justifyItems: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#313131',
        gap: 45
    },
    backButtonStyle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        alignSelf: "flex-start"
    },
    backButtonTextStyle: {
        color: colors.text,
        fontSize: customFont.sizes.medium,
        fontFamily: customFont.bold
    },
    pageTitleStyle: {
        fontSize: customFont.sizes.xxlarge,
        color: colors.text,
        fontFamily: customFont.bold,
    },
    inputStyle: {
        borderWidth: 2,
        padding: 5,
        borderRadius: 5,
        borderColor: colors.cardsAndMenus,
        width: '100%',
        maxWidth: 322,
        fontSize: customFont.sizes.small,
        color: colors.text,
        fontFamily: customFont.regular
    },
    normalText: {
        fontSize: customFont.sizes.small,
        color: colors.text,
        fontFamily: customFont.regular
    },
    roundedButton: {
        backgroundColor: colors.primary,
        borderRadius: 15,
        padding: 10
    },
    buttonTextStyle: {
        fontSize: customFont.sizes.medium,
        color: colors.text,
        textAlign: 'center',
        fontFamily: customFont.bold
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.backgroundOverlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: colors.cardsAndMenus,
        padding: 25,
        borderRadius: 15,
        alignItems: 'center',
        gap: 15,
    },
    modalTitle: {
        color: colors.text,
        fontFamily: customFont.bold,
        fontSize: customFont.sizes.medium,
    }
}