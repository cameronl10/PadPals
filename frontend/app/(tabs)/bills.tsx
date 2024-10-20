import TopBar from "@/components/ui/topBar"
import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import styles from "@/styles/mainPageStyle"

export default function Bill(){
    return(
        <View style = {styles.container}>
            <SafeAreaView style = {styles.header}>
                <TopBar header="Bill"/>
            </SafeAreaView>
            <View style = {styles.body}>    
                <Text>BILL</Text>
            </View>
        </View>
    )
}

const localStyles = StyleSheet.create({
});