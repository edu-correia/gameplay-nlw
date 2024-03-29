import { Inter_800ExtraBold } from "@expo-google-fonts/inter";
import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { theme } from './../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: 104,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginRight: 8
    },

    content: {
        width: 100,
        height: 116,
        borderRadius: 8,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20
    },

    title: {
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        fontSize: 15
    },

    unchecked: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 12,
        height: 12,
        backgroundColor: theme.colors.secondary100,
        borderColor: theme.colors.secondary100,
        borderWidth: 2,
        borderRadius: 3
    },

    checked: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 10,
        height: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 3
    },
    
    image: {
        width: 48,
        height:48
    }
})