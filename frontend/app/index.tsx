import { View } from "react-native";
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
      <Link href={{pathname: "profileSetup"}}>Profile Setup</Link>
      <Link href={{pathname: "loginPage"}}>Login Page</Link>
      <Link href={{pathname: "createHouse"}}>Create or Join a House</Link>
      <Link href={{pathname:'/(tabs)/home'}}>Tabs</Link>
    </View>
  );
}
