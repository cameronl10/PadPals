import { View } from "react-native";
import { Button } from "../components/ui/button";
import { Link, router } from "expo-router";
import styles from '@/styles/globalStyle';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  return (
<<<<<<< HEAD
    <GestureHandlerRootView style={{flex: 1}}>
=======
    <GestureHandlerRootView style={{ flex: 1 }}>
>>>>>>> main
      <View style={styles.viewContainer}>
        <Button variant="bottom" title="bottom" onPress={() => { router.push("/joinCreate") }} />
        <Button variant="default" title="default" />
        <Link href={{ pathname: "getStarted" }}>Get Started!</Link>
        <Link href={{ pathname: "profileSetup" }}>Profile Setup</Link>
        <Link href={{ pathname: "loginPage" }}>Login Page</Link>
        <Link href={{ pathname: "createHouse" }}>Create or Join a House</Link>
      </View>
    </GestureHandlerRootView>
  );
}
