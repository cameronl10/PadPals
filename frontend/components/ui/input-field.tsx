import { Text, View, TextInput, TextInputProps, StyleSheet } from "react-native";
import { Path, Control, Controller, FieldValues } from 'react-hook-form';
import WarningIcon from '@/assets/icons/warningIcon.svg'
interface inputFieldPropsBase extends TextInputProps {
  variant: "default" | "controlled"
  label: string;
}

interface inputFieldPropsControlled<T extends FieldValues> extends inputFieldPropsBase {
  control: Control<T>
  name: Path<T>
  rules?: any
}
type InputFieldProps<T extends FieldValues> = inputFieldPropsBase | inputFieldPropsControlled<T>
function InputField<T extends FieldValues>(props: InputFieldProps<T>) {
  const { label, variant, ...rest } = props;

  if (variant === "controlled") {
    const { control, name, rules } = props as inputFieldPropsControlled<T>;
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}

        render={({ field: { onChange, value = "", ref }, fieldState: { error } }) => {
          return (
            <View style={styles.inputBox}>
              <Text>{props.label}</Text>
              <TextInput style={styles.input}
                onChangeText={onChange}
                value={value}
                ref={ref}
                {...rest} />
              {error &&
                <View style={styles.errorMessage}>
                  <WarningIcon width={17} height={17} />
                  <Text style={styles.alertMessage}>{error.message}</Text>
                </View>}
            </View>)
        }}
      />

    )
  };
  return (
    <View style={styles.inputBox}>
      <Text>{props.label}</Text>
      <TextInput style={styles.input}{...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "flex-start",
  },
  input: {
    borderColor: "#515151",
    height: 60,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10
  },
  alertMessage: {
    color: "red"
  },
  errorMessage: {
    paddingTop: 5,
    flexDirection: "row"
  }
});
export { InputField };
