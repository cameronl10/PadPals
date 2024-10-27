import TopBar from "@/components/ui/topBar"
import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import FilterBubble from "@/components/ui/filter-bubble";
import styles from '@/styles/mainPageStyle';

export default function Wishes() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TopBar header="Wishes" />
            </SafeAreaView>
            <View style={styles.body}>
                <FilterBubble
                    wishGroups={["Groceries", "Chores", "Actions", "Apple", "Carrot", "Potato", "Pie", "dsjnk", "nxjlksa"]}
                    style={localStyles.filter}>
                </FilterBubble>
            </View>
        </View>
    )
}

const localStyles = StyleSheet.create({
    filter: {
        marginTop: 8,
        marginBottom: 8
    }
});