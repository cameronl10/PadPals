import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  ButtonProps,
  KeyboardAvoidingView,
} from "react-native";
import GoogleIcon from "@/assets/icons/googleIcon.svg";
import Colors from "@/styles/colors";

export interface ButtonProp extends ButtonProps {
  variant: "default" | "bottom" | "google";
}

export function Button(props: ButtonProp) {
  let buttonStyle;
  const { variant, onPress, title } = props;

  //stylesheet select logic
  switch (variant) {
    case "default":
      buttonStyle = styles.default;
      break;
    case "bottom":
      buttonStyle = styles.bottom;
      break;
    case "google":
      buttonStyle = styles.google;
      break;
  }
  const style = StyleSheet.compose(styles.common, buttonStyle);

  return (
    <Pressable style={style} onPress={onPress}>
      {variant === "google" && (
        <GoogleIcon width={15} height={15} style={styles.googleButton} />
      )}
      <Text>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  common: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    backgroundColor: Colors.PADPALS_PRIMARY,
  },
  default: {
    borderRadius: 12,
    padding: 10,
  },
  googleButton: {
    paddingRight: 30,
  },
  bottom: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderWidth: 0,
    borderTopWidth: 2,
  },
  google: {
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.PADPALS_GREY,
  },
});
