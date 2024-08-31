import { InputField } from '@/components/ui/input-field';
import { SafeAreaView, KeyboardAvoidingView, Text, View, Platform, ScrollView, StyleSheet } from 'react-native'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import DividerText from '@/components/ui/divider-text';
import styles from '@/styles/signUpStyle';
import { createGroup } from '@/api/householdAPI';
import { useMutation } from '@tanstack/react-query'
import OtpInput from '@/components/ui/otpInput'; 
import React, { useState } from 'react';
import WarningIcon from '@/assets/icons/warningIcon.svg';

interface CreateGroupFormData {
  groupName: string,
  houseAddress: string
}

const CreateHouse = () => {

  const createGroupForm = useForm<CreateGroupFormData>();
  const [otpValue, setOtpValue] = useState(['', '', '', '', '', '']);
  const [otpFilled, setOtpFilled] = useState(true);


  const createGroupMutation = useMutation({
    mutationFn: async (createForm: CreateGroupFormData) => createGroup(createForm.groupName),
    onSuccess: () => {
      alert("done")
    },
    onError: (err) => {
      alert(err)
    }
  })
  const onCreateSubmit = async (data: CreateGroupFormData) => {
    await createGroupMutation.mutate(data);
  }

  const onJoinSubmit = (data: any) => {
    if (otpValue.every((value) => value !== '')) { 
      setOtpFilled(true);
      const otpString = otpValue.join('');
      alert(otpString);
    } else {
      setOtpFilled(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <View style={styles.section}>
            <Text style={styles.title}>Create a Group</Text>
            <View style={styles.formBox}>
              <InputField<CreateGroupFormData>
                control={createGroupForm.control}
                name="groupName"
                label="Group Name"
                variant="controlled"
                rules={{
                  required: "Group name is required!"
                }}
              />
            </View>
            <Button variant="default" title="Create" onPress={createGroupForm.handleSubmit(onCreateSubmit)} />
          </View>

          <DividerText />

          <View style={styles.section}>
            <Text style={styles.title}>Join a Group</Text>
            <View style={styles.formBox}>
            <OtpInput length={6} value={otpValue} disabled onChange={setOtpValue} 
            />
            </View>
            {!otpFilled && 
              <View style={localStyles.errorMessage}>
                <WarningIcon width={17} height={17} />
                <Text style={localStyles.alertMessage}>Please enter a valid OTP!</Text>
              </View> 
            }
            <Button variant="default" title="Join" onPress={onJoinSubmit} />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1, justifyContent: 'flex-end' }}>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  alertMessage: {
    color: "red"
  },
  errorMessage: {
    bottom: 20,
    flexDirection: "row"
  }
});
export default CreateHouse;
