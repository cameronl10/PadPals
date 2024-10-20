import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ViewStyle } from 'react-native';
import Colors from '@/styles/colors';

interface filterBubbleProps {
    wishGroups: string[]
    style: ViewStyle
}

const FilterBubble = (props: filterBubbleProps) => {
    return (
        <View style={props.style}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}>
                    {props.wishGroups.map((wishGroup, index) => (
                        <TouchableOpacity key={index} style={styles.bubble}>
                            <Text style={styles.bubbleText}>{wishGroup}</Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        alignItems: 'flex-start',
        left: 10,
    },
    bubble: {
        backgroundColor: Colors.PADPALS_GREY,
        borderRadius: 20,
        padding: 8,
        marginRight: 6,
    },
    bubbleText: {
        fontSize: 12,
        color: Colors.PADPALS_WHITE
    },
});

export default FilterBubble;