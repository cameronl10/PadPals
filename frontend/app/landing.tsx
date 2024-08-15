import React from 'react';
import { Text, View } from "react-native";
import { Button } from "../components/ui/button";

export default function Landing() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Button variant="default" title="default" onPress={() => alert("got started!")}/>
    <Text style={{color: "black", fontSize: 10, fontFamily: "Verdana"}}>Have an account? Log in here</Text>
    </View>
  );
}