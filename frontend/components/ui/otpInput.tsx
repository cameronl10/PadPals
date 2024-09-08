import React, { useRef } from 'react';
import { View, StyleSheet, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import Colors from "@/styles/colors";
import styles from '@/styles/signUpStyle';

interface OtpInputProp {
    length: number;
    value: Array<string>;
    disabled: boolean,
    onChange(value: Array<string>): void;
    rules?: any;
}

const OtpInput = (props: OtpInputProp) => {
    type Nullable<T> = T | null;
    const inputRefs = useRef<Array<Nullable<TextInput>>>([]);
    
    const onChangeValue = (text:string, index: number) => {
        const newValue = (props.value ?? []).map((item, valueIndex) => {
            if (index === valueIndex) {
                return text;
            }
            return item;
        })
    
        props.onChange(newValue);
    }


    const handleChange = (text: string, index: number) => {
        onChangeValue(text, index);
        if(text.length !== 0) {
            return inputRefs.current[index + 1]?.focus();
        }
        return inputRefs?.current[index-1]?.focus();
    }

    const handleBackspace = (event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        const {nativeEvent} = event;
        if (nativeEvent.key === 'Backspace' && index !== 0) {
            handleChange('',index);
    }}

    return (
       <View style = {localStyles.container}>
        {[...new Array(props.length)].map((item,index) => (
        <TextInput
        ref={ref => {
            if (ref && !inputRefs.current.includes(ref))
                inputRefs.current = [...inputRefs.current,ref]}}
                key = {index} 
                style = {localStyles.input}
                maxLength = {1}
                contextMenuHidden
                selectTextOnFocus
                keyboardType='decimal-pad'
                onChangeText={text => handleChange(text,index)}
                onKeyPress={event => handleBackspace(event,index)}  
                /> ))}
        </View>

    );
};

const localStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
       
        marginTop: 20,
    },
    input: {
        
        width: 47,
        height: 60,
        borderRadius: 5,
        backgroundColor: Colors.PADPALS_WHITE,
        borderColor: "#D3D3D3",
        borderWidth: 1.6,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',

              
    },
});
export default OtpInput;