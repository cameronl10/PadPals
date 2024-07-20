import React from 'react';
import { Text, StyleSheet, Pressable, ButtonProps, KeyboardAvoidingView} from 'react-native';

export interface ButtonProp extends ButtonProps {
    variant: 'default' | 'bottom'
};

export function Button(props: ButtonProp) {
    let buttonStyle;
    const { variant, onPress, title } = props;

    //stylesheet select logic
    switch (variant) {
        case('default'):
            buttonStyle = styles.default;
            break;
        case('bottom'):
            buttonStyle = styles.bottom;
            break;
    }
    const style = StyleSheet.compose(styles.common, buttonStyle)

    return (
        <Pressable style={style} onPress={onPress}>
            <Text>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    common: {
        alignItems: 'center',
        justifyContent: 'center',   
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'white'
    },
    default: {
        borderRadius: 12,
        width: '80%',   
        padding: 10
    },
    bottom: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderWidth: 0,
        borderTopWidth: 2
    }
})