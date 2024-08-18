import { InputField } from '@/components/ui/input-field';
import { SafeAreaView, KeyboardAvoidingView, Text, View, Platform, StyleSheet } from 'react-native'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import DividerText from '@/components/ui/divider-text';

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
    alert(data.groupName + " " + data.houseAddress);
  }
  const onJoinSubmit = (data: any) => {
    alert(data.inviteCode);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}>

      <SafeAreaView style={styles.container}>

        <View style={styles.section}>
          <Text style={styles.header}>Create a Group</Text>
          <View style={styles.form}>
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
          <View style={styles.form}>
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

        <DividerText/>

        <View style={styles.section}>
          <Text style={styles.header}>Join a Group</Text>
          <View style={styles.form}>
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

      </SafeAreaView>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 10
  },
  container: {
    flex: 1,
  },
  section: {
    paddingVertical: 20,
  },
  form: {
    width: "100%",
    marginBottom: 25,
  },
  header: {
    marginBottom: 25,
    fontSize: 25,
    fontWeight: "bold"
  }
});

export default CreateHouse;
