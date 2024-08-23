import React from 'react';
import { View, TextInput } from 'react-native';
import { useForm, Controller } from "react-hook-form"

export default function JoinHouse() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    //need to implement an obSubmit
    const onSubmit = (data : any) => {
        console.log(data);
    };

  return (
    <View>
        <Controller
         control = {control}
            rules = {{
                required: true
            }}
            render = {({field: {onChange, onBlur, value}}) => (
                <TextInput
                    style = {{height: 40}}
                    onBlur = {onBlur}
                    onChangeText = {onChange}
                    value = {value}
                />)}
                name = "Household Name"
        />
    </View>
  );
}