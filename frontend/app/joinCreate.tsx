import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const JoinCreate = () => {
  return (
    <View style={styles.container}>
      <Link style={styles.selectable} href="createHouse">
        <View>
          <Text style={styles.text}>First one to setup the app?</Text>
          <Text style={styles.text}>create image</Text>
          {/* There should be an image here */}
        </View>
      </Link>
      <Link style={styles.selectable} href="joinHouse">
        <View>
          <Text style={styles.text}>Have an invite?</Text>
          <Text style={styles.text}>join image</Text>
          {/* There should be an image here */}
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 10,
  },
  selectable: {
    borderWidth: 2,
    borderRadius: 12,
    width: "80%",
    marginBottom: 10,
    borderColor: "black",
    backgroundColor: "white",
  },
});

export default JoinCreate;
