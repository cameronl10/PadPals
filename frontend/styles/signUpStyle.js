import { StyleSheet } from 'react-native';
import {default as c} from '@/styles/colors';

export default StyleSheet.create({
    keyboardView: {
        flex: 1,
        backgroundColor: c.PADPALS_WHITE,
        paddingTop: 80,
        paddingHorizontal: 10
    },
    title: {
        marginBottom: 25,
        fontSize: 25,
        fontWeight: "bold"
    },
    info: {
        color: c.PADPALS_GREY
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
    },
    googleButton: {
        alignSelf: "center"
    },
    formBox: {
        width: "100%",
        marginBottom: 25,
    },
    alertText: {
        color: "red"
    },
    signUpSection: {
        justifyContent: "space-evenly",
    },
    section: {
        paddingVertical: 20,
    },
    text: {
        padding: 10,
    },
    selectable: {
        borderWidth: 2,
        borderRadius: 12,
        width: "80%",
        marginBottom: 10,
        borderColor: c.PADPALS_BLACK,
        backgroundColor: c.PADPALS_WHITE,
    },
    profileIcon: {
        alignSelf: "center"
    },
});