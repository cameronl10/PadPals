import { StyleSheet, Platform } from 'react-native';
import Colors from "@/styles/colors";

export default StyleSheet.create({
    header: {
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 5 : 0,
    },
    body: {
        position: 'absolute',
        top: 100,
        zIndex: 10,
        flex: 1,
    },
    container: {
        backgroundColor: Colors.PADPALS_PRIMARY,
        flex: 0.3
    },
});