import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../components/ui/button";
import { Link, router } from "expo-router";
import { InputField } from "@/components/ui/input-field";
import {useForm} from 'react-hook-form'
export default function Index() {
  const form = useForm();

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
      <InputField
       variant="controlled"
       label="test"
       control={form.control}
       name="test"
      />
    </View>
  );
}
