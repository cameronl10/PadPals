import TopBar from "@/components/ui/topBar"
import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native"
import Colors from "@/styles/colors";
import FilterBubble from "@/components/ui/filter-bubble";

export default function Wishes() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TopBar Header="Wishes" />
            </SafeAreaView>
            <View style={styles.body}>
                <FilterBubble
                    wishGroups={["Groceries", "Chores", "Actions", "Apple", "Carrot", "Potato", "Pie"]}
                    style={styles.filter}>
                </FilterBubble>
                <Text>Wishes test</Text>
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
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 5 : 0,
    },
    body: {
        flex: 3,
        backgroundColor: Colors.PADPALS_WHITE,
    },
    filter: {
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 8
    }
});