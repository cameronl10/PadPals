import { InputField } from '@/components/ui/input-field';
import { SafeAreaView, KeyboardAvoidingView, Text, View, Platform, StyleSheet } from 'react-native'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import DividerText from '@/components/ui/divider-text';

interface FormData {
    email: string,
    password: string
}
const LoginPage = () => {
    const form = useForm<FormData>();
    const onSubmitForm = (data: any) => {
        alert(data.email + " " + data.password);

    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Log in</Text>
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
                            rules={{ required: "Password is required!"}}
                            secureTextEntry
                        />
                    </View>
                    <View>
                        <Button variant="default" title="Log in" onPress={form.handleSubmit(onSubmitForm)} />
                    </View>
                </View>
                <DividerText />
                <Button variant="google" title="Log in with Google" />
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

export default LoginPage