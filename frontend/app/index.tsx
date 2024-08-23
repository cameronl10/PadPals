import { View } from "react-native";
import { Button } from "../components/ui/button";
import { Link, router } from "expo-router";
import styles from "@/styles/globalStyle";

export default function Index() {
  return (
    <View style={styles.viewContainer}>
      <Link href={{ pathname: "landingPage" }}>Landing Page</Link>
      <Button
        variant="bottom"
        title="bottom"
        onPress={() => {
          router.push("/joinCreate");
        }}
      />
      <Button variant="default" title="default" />
      <Link href={{ pathname: "getStarted" }}>Get Started!</Link>
      <Link href={{ pathname: "profileSetup" }}>Profile Setup</Link>
      <Link href={{ pathname: "loginPage" }}>Login Page</Link>
      <Link href={{ pathname: "createHouse" }}>Create or Join a House</Link>
      <Link href={{ pathname: "/(tabs)/home" }}>Tabs</Link>
    </View>
  );
}
