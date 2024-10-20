import TopBar from "@/components/ui/topBar"
import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import styles from "@/styles/mainPageStyle"

export default function Home(){
    return(
        <View style = {styles.container}>
            <SafeAreaView style = {styles.header}>
                <TopBar header="Home"/>
            </SafeAreaView>
            <View style = {styles.body}>    
                <Text>HOMEEEE</Text>
            </View>
        </View>
    )
}

const localStyles = StyleSheet.create({
});