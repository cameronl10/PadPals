import {
  Text,
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

interface inputFieldProps extends TextInputProps {
  label: string;
}

const InputField = (props: inputFieldProps) => {
  return (
    <View style={styles.inputBox}>
      <Text>{props.label}</Text>
      <TextInput style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
    width: "80%",
    justifyContent: "flex-start",
  },
  input: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export { InputField };
