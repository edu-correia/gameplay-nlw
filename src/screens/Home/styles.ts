import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { abs } from "react-native-reanimated";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    header: {
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getStatusBarHeight() + 26,
        marginBottom: 42
    },

    matches: {
        marginTop: 24,
        marginLeft: 24
    },

    addButton: {
        position: 'absolute',
        bottom: 24,
        right: 24
    },

    settingsBtn: {
        width: '100%',
        height: 70,
        backgroundColor: theme.colors.secondary40,
        marginTop: 20,
        alignItems: "center",
        justifyContent: 'center'
    },

    settingsBtnText: {
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700,
        fontSize: 18
    }
});