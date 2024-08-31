import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  ButtonProps,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Squircle } from "@squircle-js/react"

import GoogleIcon from "@/assets/icons/googleIcon.svg";
import AppleIcon from "@/assets/icons/appleLogo.svg";
import Colors from "@/styles/colors";

export interface ButtonProp extends ButtonProps {
  variant: "default" | "bottom" | "google" | "apple";
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
      buttonStyle = styles.external;
      break;
    case "apple":
      buttonStyle = styles.external;
      break;
  }
  const style = [styles.common, buttonStyle];

  return (
    <Pressable style = { style } onPress={onPress}>
      {variant === "google" && (
        <GoogleIcon width={19} height={19} style = {styles.googleIcon}/>
      )}
      {variant === "apple" && (
        <AppleIcon height={44}/>
      )}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  common: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    height: 44,
    backgroundColor: Colors.PADPALS_PRIMARY,
  },
  default: {
    borderRadius: 6,
    padding: 10,
  },
  bottom: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderWidth: 0,
    borderTopWidth: 2,
  },
  googleIcon: {
    marginHorizontal: 7
  },
  external: {
    gap : 0,
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PADPALS_BLACK
  
  },
  text: {
    marginHorizontal: 6,
    textAlignVertical: "center",
    fontSize: 17,
    fontWeight: '600',
    color: "white",
  },

});
