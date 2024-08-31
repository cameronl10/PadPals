import TopBar from "@/components/ui/topBar"
import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar} from "react-native"
import Colors from "@/styles/colors";
import { Stack } from "expo-router";

export default function Home(){
    return(
        <View style = {styles.container}>
            <Stack.Screen options={{ header: () => null }} />
            <SafeAreaView style = {styles.header}>
                <TopBar Header="Home"/>
            </SafeAreaView>
            <View style = {styles.body}>    
                <Text>HOMEEEE</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PADPALS_PRIMARY,
       
        flex: 1
    },
    header: {
        paddingTop: Platform.OS === "android" ?( StatusBar.currentHeight || 0) + 5: 0,
    },
    body: {
        flex: 3,
        backgroundColor: Colors.PADPALS_WHITE,
    }
});