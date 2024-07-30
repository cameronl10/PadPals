import { InputField } from '@/components/ui/input-field';
import { SafeAreaView, KeyboardAvoidingView, Text, View, Platform, StyleSheet } from 'react-native'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import DividerText from '@/components/ui/divider-text';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

interface FormData {
    email: string,
    password: string
}
const GetStarted = () => {
    const form = useForm<FormData>();

    const onSubmitForm = (data: any) => {
        alert(data.email + " " + data.password);

    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Create an Account</Text>
                <View style={styles.signUpSection}>
                    <View style={styles.formBox}>
                        <InputField<FormData>
                            control={form.control}
                            name="email"
                            label="Email"
                            variant="controlled"
                            rules={{
                                required: "Email is required!", pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address',
                                },
                            }}
                        />
                    </View>
                    <View style={styles.formBox}>
                        <InputField<FormData>
                            control={form.control}
                            name="password"
                            label="Password"
                            variant="controlled"
                            rules={{ required: "Password is required!", minLength: { value: 8, message: "Password must be at least 8 characters!" } }}
                            secureTextEntry
                        />
                        <Text style={styles.info}>Password must contain 8 characters.</Text>
                    </View>
                    <View>
                        <Button variant="default" title="Sign Up" onPress={form.handleSubmit(onSubmitForm)} />
                    </View>
                </View>
                <DividerText />
                <Button variant="google" title="Sign in with Google" />
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
        backgroundColor: "#F6F6F6",
        paddingTop: 80,
        paddingHorizontal: 10
    },
    title: {
        marginBottom: 25,
        fontSize: 25,
        fontWeight: "bold"
    },
    info: {
        color: "gray"
    },
    container: {
        flex: 1,
        paddingHorizontal: 25
    },
    googleButton: {
        alignSelf: "center"
    },
    formBox: {
        width: "100%",
        marginBottom: 25,
    },

    alertText: {
        color: "red"
    },
    signUpSection: {
        justifyContent: "space-evenly",
    }

})

export default GetStarted