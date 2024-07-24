import { Text, Pressable, StyleSheet, PressableProps } from "react-native";
import { UserTag, userTagProps } from "../ui/usertag"
interface ListItemProps extends PressableProps {
    user: userTagProps,
    title: string,
    description: string
};
const ListItem = (props: ListItemProps) => {

    return (
        <Pressable style={styles.baseItem}{...props}>
            <UserTag username={props.user.username} imgSrc={props.user.imgSrc} />
            <Text style={styles.titleText}>
                {props.title}
            </Text>
            <Text style={styles.description}>
                {props.description}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    baseItem: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "gainsboro",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 15,
        width: "50%"
    },
    titleText: {
        fontSize: 40,
        padding: 4
    },
    description: {
        padding: 4,
        fontSize: 15
    }
})
export { ListItem }