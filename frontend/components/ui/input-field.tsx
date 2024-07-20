import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

const InputField = () => {
  return (
    <View>
      <TextInput style={styles.input} />
    </View>
  );
};

export default InputField;
