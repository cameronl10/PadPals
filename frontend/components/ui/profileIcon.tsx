import {Image, ImageSourcePropType, Pressable, StyleSheet } from "react-native"

interface ProfileIconProps{
    onPress: () => void;
    profilePicture: ImageSourcePropType;
    variant: 'default' | 'plus'
}

const ProfileIcon = (props : ProfileIconProps) =>{

    return(
        <Pressable style={styles.profileIcon} onPress={props.onPress}>
            <Image style={styles.image} source={props.profilePicture}/>
            {props.variant === 'plus' && <Image style={styles.imagePlus} source={require('@/assets/images/plusButton.png')}/>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    profileIcon:{
        width: 150,
        height: 150,
    },
    image:{
        flex:1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: (150/2)
    },
    imagePlus:{
        position:'absolute',
        resizeMode:'contain',
        width:'35%',
        height:'35%',
        left:95,
        top:95
    }
})
export  {ProfileIcon};