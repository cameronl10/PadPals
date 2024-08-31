import { InputField } from '@/components/ui/input-field';
import { SafeAreaView, KeyboardAvoidingView, Text, View, Platform, ScrollView } from 'react-native'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import DividerText from '@/components/ui/divider-text';
import styles from '@/styles/signUpStyle';
import { useQuery } from '@tanstack/react-query'
import { addUser } from '@/api/household';
import { checkHouseCode } from '@/api/household';

interface CreateGroupFormData {
  groupName: string,
  houseAddress: string
}

interface JoinGroupFormData {
  inviteCode: string
}

const CreateHouse = () => {

  const createGroupForm = useForm<CreateGroupFormData>();
  const joinGroupForm = useForm<JoinGroupFormData>();

  const onCreateSubmit = (data: any) => {
    const groupName = data.groupName;
    const houseAddress = data.houseAddress;
  }
  
  async function onJoinSubmit(formInput: FormData): Promise<boolean> {
    const cleanFormInput = formInput.toString();
    const checkHouseCodeQuery = useQuery({
      queryKey: [cleanFormInput],
      queryFn: async ({queryKey}) => {
        console.log(queryKey);
        await checkHouseCode(queryKey);
      }
    });
    console.log(checkHouseCodeQuery);
    if (checkHouseCodeQuery) {
      return await addUser(, checkHouseCodeQuery);
    } else {
      alert("Invalid invite code");
      return false;
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
            <View style={styles.formBox}>
              <InputField<CreateGroupFormData>
                control={createGroupForm.control}
                name="houseAddress"
                label="House Address"
                variant="controlled"
                rules={{
                  required: "House address is required!"
                }}
              />
            </View>
            <Button variant="default" title="Create" onPress={createGroupForm.handleSubmit(onCreateSubmit)} />
          </View>

          <DividerText />

          <View style={styles.section}>
            <Text style={styles.title}>Join a Group</Text>
            <View style={styles.formBox}>
              <InputField<JoinGroupFormData>
                control={joinGroupForm.control}
                name="inviteCode"
                label="Invite Code"
                variant="controlled"
                rules={{
                  required: "Invite code is required!"
                }}
              />
            </View>
            <Button variant="default" title="Join" onPress={joinGroupForm.handleSubmit(onJoinSubmit)} />
          </View>

        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateHouse;
