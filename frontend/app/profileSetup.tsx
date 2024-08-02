import { InputField } from '@/components/ui/input-field';
import { SafeAreaView, KeyboardAvoidingView, Text, View, Platform, StyleSheet } from 'react-native'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { ProfileIcon } from '@/components/ui/profileIcon'
import { requestMediaLibraryPermissionsAsync, MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import { useState } from 'react';

interface FormData {
    username: string
}
const ProfileSetup = () => {
    const form = useForm<FormData>();

    const [profilePicture, setPicture] = useState("")

    const onSubmitForm = () => {
        alert("pressed")
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

    const imageSource = profilePicture ? { uri: profilePicture } : require('@/assets/images/pfp.jpg');

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
    profileIcon: {
        alignSelf: "center"
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

export default ProfileSetup