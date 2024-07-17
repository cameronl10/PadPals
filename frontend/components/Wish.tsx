import { Text, View, StyleSheet} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, {useState} from 'react';

type WishType={
    name: string,
    title: string,
    description: string
    price: number
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: "thistle",
        borderRadius: 50,
        width:'50%'
    },
    contentBox:{
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row'
    },
    infoBox:{
        flex:10,
    },
    title:{
        flex: 1,
        fontSize:15
    },
    description:{
        textAlign: 'left'
    },
    buttonBox:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    nameBox:{
        flexDirection: 'row',
    },
    pfp:{
        paddingRight: 10
    },
    name:{
    }
})

    
const Wish = (props: WishType) => {
    const [isDone, setStatus] = useState(true)
    const setWishStatus = () => {
        setStatus(!isDone);
        console.log(isDone);
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentBox}>
                <View style={styles.buttonBox}><BouncyCheckbox onPress={setWishStatus}/></View>
                <View style={styles.infoBox}>
                    <View style = {styles.nameBox}>
                        <img style={styles.pfp} src='./1mages/imagei.jpg'/>
                        <Text style = {styles.name}>{props.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                    <View>
                        <Text>{props.description}</Text>
                        <Text>${props.price}</Text>
                    </View>
                </View>
            </View>

                
        </View>
    );

}


export default Wish;
