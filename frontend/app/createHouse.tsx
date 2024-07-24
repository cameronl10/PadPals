import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";

const CreateHouse = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create a new household</Text>
      <InputField label="Household Name" style={styles.item} />
      <InputField label="Address" style={styles.item} />
      <Button
        variant="default"
        title="Create Household"
        onPress={() => alert("Created")}
      />
      <View style={styles.padding}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    width: "80%",
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
