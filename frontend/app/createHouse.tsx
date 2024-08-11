import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";

const containerHeight = Dimensions.get('window').height * 0.4
const CreateHouse = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Create a new household</Text>
      <InputField label="Household Name" />
      <InputField label="Address" />
      <Button
        variant="default"
        title="Create Household"
        onPress={() => alert("Created")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: containerHeight,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: "auto",
  },
  padding: {
    flex: 3,
  },
});

export default CreateHouse;
