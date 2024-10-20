import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native'; // Import StyleSheet from 'react-native'
import ClickableProfileIcon from './clickable-profileIcon';
import Colors from "@/styles/colors";
import TestIcon from "@/assets/icons/testIcon"

interface TopBarProps {
    header : string;
}

const TopBar = (props: TopBarProps) => {
        return (
            <View style={styles.containerColor}>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <TestIcon height={20} fill={"white"} stroke={"white"}/>
                    </View>
                    <View style={styles.midContainer}>
                        <Text style = {styles.text}>{props.header}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <TestIcon height={20} fill={"white"}/>
                    </View>
                </View>
            </View>
        );
};

const styles = StyleSheet.create({
    containerColor: {
        backgroundColor: Colors.PADPALS_PRIMARY,
        marginTop: 20,
    },
    container: {
        flexDirection: 'row',
    },
    midContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    leftContainer: {
        paddingLeft: 5,
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightContainer: {
        paddingRight: 5,
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.PADPALS_WHITE,
        fontWeight: 'bold',
        fontSize: 25,
    }
});

export default TopBar;