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
                <View style={localStyles.pieChart}>
                    <Text style={localStyles.text}>Spent this month</Text>
                    <Text style={localStyles.text1}>$1200</Text>
                </View>
            </View>
        </View>
    )
}

const localStyles = StyleSheet.create({
    text: {
        paddingTop: 20,
        paddingLeft: 20
    },
    text1: {
        paddingTop: 5,
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    pieChart: {
        width: '90%',
        height: 300,
        backgroundColor: 'white',
        alignSelf: 'center',
        top: 20,
        borderRadius: 20,
        shadowColor: '#ababab',
        shadowOpacity: 20,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10
    }
});