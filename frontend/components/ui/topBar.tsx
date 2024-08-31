import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Import StyleSheet from 'react-native'
import ClickableProfileIcon from './clickable-profileIcon';
import Colors from "@/styles/colors";
interface TopBarProps {
    // prob pass the image url?
    Header : string;
}

const TopBar = (props: TopBarProps) => {
        return (
            <View style={styles.container}>
                    <View style={styles.leftContainer}> 
                        <ClickableProfileIcon onPress={() => { alert('pfp pressed'); }} variant="default" profilePicture={require('@/assets/images/pfp.jpg')}/>
                    </View>
                <View style={styles.midContainer}>
                    <Text style = {styles.text}>{props.Header}</Text>
                </View>
                <View style={styles.rightContainer}></View>

            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        backgroundColor: Colors.PADPALS_PRIMARY,
        paddingBottom: 5,
    },
    midContainer: {
        flex: 0.333,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftContainer: {
        width: 1,
        height: 1,
        flex: 0.333,
        alignItems: 'flex-start',
        left: 10,
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 0.333,
    },
    text: {
        color: Colors.PADPALS_BLACK,
        fontSize: 25,
    }
});

export default TopBar;