import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import {default as globalStyles} from '@/styles/globalStyle';
import {default as signUpStyles} from '@/styles/signUpStyle';

const JoinCreate = () => {
  return (
    <View style={globalStyles.viewContainer}>
      <Link style={signUpStyles.selectable} href="createHouse">
        <View>
          <Text style={signUpStyles.text}>First one to setup the app?</Text>
          <Text style={signUpStyles.text}>create image</Text>
          {/* There should be an image here */}
        </View>
      </Link>
      <Link style={signUpStyles.selectable} href="joinHouse">
        <View>
          <Text style={signUpStyles.text}>Have an invite?</Text>
          <Text style={signUpStyles.text}>join image</Text>
          {/* There should be an image here */}
        </View>
      </Link>
    </View>
  );
};

export default JoinCreate;
