import { StyleSheet, Platform, StatusBar } from 'react-native';
import Colors from "@/styles/colors";

export default StyleSheet.create({
    header: {
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 5 : 0,
        fontFamily: 'Poppins Medium',
    },
    body: {
        position: 'relative',
        top: 10,
        zIndex: 10,
        flex: 1,
    },
    container: {
        backgroundColor: Colors.PADPALS_PRIMARY,
        flex: 0.3
    },
});