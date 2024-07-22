
import { Text, View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

export interface userTagProps{
    username: string,
    imgSrc: ImageSourcePropType
}

const UserTag = (props: userTagProps) => {
    return (
        <View style={styles.userContainer}>
            <Image source={props.imgSrc} style={styles.imageStyle}/>
            <Text style={styles.textStyle}>{props.username}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        alignItems:"center"
    },
    imageStyle:{
        marginRight:10,
        borderRadius:10,
        width:25,
        height:25
    },
    textStyle:{
        fontSize:15
    }

})
export { UserTag }