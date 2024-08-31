import { InputField } from '@/components/ui/input-field';
import { SafeAreaView, KeyboardAvoidingView, Text, View, Platform, ScrollView } from 'react-native'
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

interface CreateGroupFormData {
  groupName: string,
}

interface JoinGroupFormData {
  inviteCode: string
}

const CreateHouse = () => {

  const createGroupForm = useForm<CreateGroupFormData>();
  const joinGroupForm = useForm<JoinGroupFormData>();

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
    } else {
      alert("Invalid invite code");
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
