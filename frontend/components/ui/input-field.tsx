import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

type InputFieldProps = {
  type: "text" | "password";
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
};

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingVertical: 5,
  },
});

const InputField: React.FC<InputFieldProps> = ({
  type,
  containerStyle,
  inputStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, inputStyle]}
        secureTextEntry={type === "password"}
      />
    </View>
  );
};

export default InputField;
