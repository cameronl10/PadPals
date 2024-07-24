import { InputField } from '@/components/ui/input-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native';
import { Button } from '@/components/ui/button';

const halfHeight = Dimensions.get('window').height * 0.4
const GetStarted = () => {
    return (
        <SafeAreaView style={styles.container}>
            <InputField label="Email" inputMode='email' placeholder='email' />

            <InputField label="Password" inputMode='text' secureTextEntry placeholder='password' />

            <Button variant="default" title="Sign Up" onPress={() => { alert("hello") }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
        alignItems: "center",
        height: halfHeight
    }

})

export default GetStarted