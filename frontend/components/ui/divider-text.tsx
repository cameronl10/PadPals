import { Text, View, StyleSheet } from 'react-native';

const DividerText = () => {
    return (
        <View style={styles.container}>
            <View style={styles.divider} />
            <Text style={styles.text}>or</Text>
            <View style={styles.divider} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    divider: {
        flex: 0.5,
        backgroundColor: 'gray',
        height: 1
    },
    text: {
        marginHorizontal: 10
    },
});

export default DividerText;