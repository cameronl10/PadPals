import { InputField } from '@/components/ui/input-field';
import { SafeAreaView, KeyboardAvoidingView, Text, View, Platform, StyleSheet } from 'react-native'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { ProfileIcon } from '@/components/ui/profileIcon'
import { requestMediaLibraryPermissionsAsync, MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import { useState } from 'react';
import { useSignUpContext } from '@/hooks/useSignUpContext';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/api/auth';
import { router } from 'expo-router';
import styles from '@/styles/signUpStyle';
import defaultProfile from '@/assets/images/pfp.jpg'
interface FormData {
    username: string
    userEmail: string
    userPassword: string 
    profilepicture: string
}
const ProfileSetup = () => {
    const form = useForm<FormData>();

    const [profilePicture, setPicture] = useState("")
    const {email,password} = useSignUpContext();

    const createUserMutation = useMutation({
        mutationFn: async (userInput: FormData) => await signup(userInput),
        onSuccess: (data) =>{
            alert(data);
        },
        onError:(err) =>{
            alert(err);
        }
    })

    const onSubmitForm = async (formInput: FormData) => {
        formInput.userEmail = email
        formInput.userPassword = password
        formInput.profilepicture = profilePicture
        await createUserMutation.mutate(formInput)
        router.push('/createHouse')

    }
    const handleImagePress = async () => {
        const permissionResult = await requestMediaLibraryPermissionsAsync();

        if (permissionResult) {
            const result = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (result.assets) {
                setPicture(result.assets[0].uri);
            } else {
                alert("error");
            }
        } else {
            alert("permission denied")
        }
    }

    const imageSource = profilePicture ? { uri: profilePicture } : defaultProfile;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Set Up Your Profile</Text>
                <View style={styles.profileIcon}>
                    <ProfileIcon variant='plus' profilePicture={imageSource} onPress={handleImagePress} />
                </View>
                <View style={styles.signUpSection}>
                    <View style={styles.formBox}>
                        <InputField<FormData>
                            control={form.control}
                            name="username"
                            label="Enter Your Name"
                            variant="controlled"
                        />
                    </View>
                    <View>
                        <Button variant="default" title="Submit" onPress={form.handleSubmit(onSubmitForm)} />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ProfileSetup