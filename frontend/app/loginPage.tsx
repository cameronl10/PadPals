import { InputField } from '@/components/ui/input-field';
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Text, View, Platform, StyleSheet } from 'react-native'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import DividerText from '@/components/ui/divider-text';
import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/auth';
import styles from '@/styles/signUpStyle';
import { setSessionKey} from '@/managers/sessionManager';
interface FormData {
    email: string,
    password: string
}
const LoginPage = () => {
    const form = useForm<FormData>();

    const loginMutation = useMutation({
        mutationFn: async (loginInput: FormData) => await login(loginInput),
        onSuccess: async (data) => {
            await setSessionKey(data.loginUser.sessionid)
        },
        onError: (err) => {
            alert("Email or Password is not correct" + err)
        }
    })

    const onSubmitForm = async (formInput: FormData) => {
        await loginMutation.mutateAsync(formInput);
        alert("done");
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}>
            <SafeAreaView style={styles.container}>
                
                <ScrollView style={{ flexGrow: 1 }}>
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
                                rules={{ required: "Password is required!" }}
                                secureTextEntry
                            />
                        </View>
                        <View>
                            <Button variant="default" title="Log in" onPress={form.handleSubmit(onSubmitForm)} />
                        </View>
                    </View>
                    <DividerText />
                    <Button variant="google" title="Log in with Google" />
                
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default LoginPage