import * as userHandler from '../handlers/userHandler';
import { getHouseholdByUser } from '../handlers/householdHandler';

export const resolvers = {
    Query: {
        loginUser: async (_: any, { loginInput }: { loginInput: LoginInput }, context) => {
            return await userHandler.userLogin(loginInput.email, loginInput.password, context);
        },
        user: async (_: any, { email }: { email: string }): Promise<User> => {
            return await userHandler.getUser(email);
        }
    },
    Mutation: {
        createUser: async (_: any, { user }: { user: User }) => {
            return await userHandler.createUser(user);
        },
        editUserFields: async (_: any, { user }: { user: User }): Promise<void> => {
            return await userHandler.editUser(user);
        },
        editUserPassword: async (_: any, { editPassword }: { editPassword: EditPassword }) => {
            return userHandler.editUserPassword(editPassword.userid, editPassword.oldpassword, editPassword.newpassword);
        },
        deleteUser: async (_: any, { userid }: { userid: string }): Promise<void> => {
            return await userHandler.deleteUser(userid);
        },
        logoutUser: async (_: any, __: any, context): Promise<boolean> => {
            return userHandler.userLogout(context);
        }
    },
    User: {
        household: async (parent: User): Promise<Household> => {
            return await getHouseholdByUser(parent.userid);
        }
    }

};

export default resolvers;