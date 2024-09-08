import { InputField } from '@/components/ui/input-field';
import { SafeAreaView, KeyboardAvoidingView, Text, View, Platform, ScrollView, StyleSheet } from 'react-native'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import DividerText from '@/components/ui/divider-text';
import styles from '@/styles/signUpStyle';
import { createGroup } from '@/api/household';
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { addUser } from '@/api/household';
import { checkHouseCode } from '@/api/household';
import { useSessionInfo } from '@/api/session';
import OtpInput from '@/components/ui/otpInput'; 
import React, { useState } from 'react';
import WarningIcon from '@/assets/icons/warningIcon.svg';

interface CreateGroupFormData {
  groupName: string,
}

const CreateHouse = () => {

  const createGroupForm = useForm<CreateGroupFormData>();
  const joinGroupForm = useForm<JoinGroupFormData>();
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
  
  const onCreateSubmit = async (createData: CreateGroupFormData) => {
    await createGroupMutation.mutate(createData);
  }
  
  const onJoinSubmit = async (joinData: JoinGroupFormData) => {
      if (otpValue.every((value) => value !== '')) { 
        setOtpFilled(true);
        const otpString = otpValue.join('');
        alert(otpString);
        const cleanFormInput = joinData.toString();
        const checkHouseCodeQuery = useQuery({
          queryKey: [cleanFormInput],
          queryFn: async ({queryKey}) => {
            await checkHouseCode(queryKey);
          }
        });
        const {data} = useSessionInfo();
        if (checkHouseCodeQuery.isSuccess) {
          await addUser(data.userid, checkHouseCodeQuery.data);
          alert("Success!! :3");
        } else {
          alert("Invalid invite code");
        }
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
