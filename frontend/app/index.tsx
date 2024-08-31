import { View } from "react-native";
import { Button } from "../components/ui/button";
import { Link } from "expo-router";
import styles from "@/styles/globalStyle";
import { useEffect } from "react";
import { deleteKey } from "@/managers/sessionManager";
import { useSessionInfo } from "@/api/session";
export default function Index() {
    const {data, isLoading, error} = useSessionInfo();
    useEffect(() => {
      if(data){
        console.log(data)
      }
      if(error){
        console.log(error);
      }
    }, [data,error])

  return (
    <View style={styles.viewContainer}>
      <Link href={{ pathname: "landingPage" }}>Landing Page</Link>
      <Button
        variant="bottom"
        title="bottom"
        onPress={() => {
          deleteKey('session').then(() => {
            alert("deleted");
          });
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
