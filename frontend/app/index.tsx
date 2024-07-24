import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../components/ui/button";
import { Link, router } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="bottom" title="bottom" onPress={() => { router.push("/joinCreate") }} />
      <Button variant="default" title="default" />
      <Link href={{ pathname: "getStarted" }}>Get Started!</Link>
    </View>
  );
}
