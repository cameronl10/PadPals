import { InputField } from '@/components/ui/input-field';
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Text, View, Platform } from 'react-native'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import DividerText from '@/components/ui/divider-text';
import { router } from 'expo-router';
import { useSignUpContext } from '@/hooks/useSignUpContext';
import styles from '@/styles/signUpStyle';
interface FormData {
    email: string,
    password: string
}
const GetStarted = () => {
    const form = useForm<FormData>();
    const { updateForm }: any = useSignUpContext();
    const onSubmitForm = (formInput: FormData) => {
        updateForm(formInput.email, formInput.password)
        router.push('/profileSetup')
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}>
            <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                    <Button variant="google" title="Sign in with Google"/>

                    {/* SHOES Sign Up with Apple only for ios device */}
                    {/* {
                        Platform.OS === 'ios' && <Button variant="apple" title="Sign in with Apple"/>
                    } */}

                    </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default GetStarted