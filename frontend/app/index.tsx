import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../components/ui/button";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="bottom" title="bottom" />
      <Button variant="default" title="default" />
    </View>
  );
}
