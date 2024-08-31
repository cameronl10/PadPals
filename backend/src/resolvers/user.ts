import * as userHandler from '../handlers/userHandler';
import { getHouseholdByUser } from '../handlers/householdHandler';



export const resolvers = {
    Query: {
        user: async (_: any, { email }: { email: string }): Promise<User> => {
            return userHandler.getUser(email);
        }
    },
    Mutation: {
        loginUser: async (_: any, { loginInput }: { loginInput: LoginInput }, context: Express.Request) => {
            return userHandler.userLogin(loginInput.email, loginInput.password, context);
        },
        createUser: async (_: any, { user }: { user: User }): Promise<boolean> => {
            return userHandler.createUser(user);
        },
        editUserFields: async (_: any, { user }: { user: User }): Promise<boolean> => {
            return userHandler.editUser(user);
        },
        editUserPassword: async (_: any, { editPassword }: { editPassword: EditPassword }): Promise<boolean> => {
            return userHandler.editUserPassword(editPassword.userid, editPassword.oldpassword, editPassword.newpassword);
        },
        deleteUser: async (_: any, { userid }: { userid: string }): Promise<boolean> => {
            return userHandler.deleteUser(userid);
        },
        logoutUser: async (_: any, __: any, context: Express.Request): Promise<boolean> => {
            return userHandler.userLogout(context);
        },
        assignHousehold: async (_: any, { userid, houseid }: { userid: string, houseid: string }): Promise<boolean> => {
            return userHandler.assignHousehold(userid, houseid);
        },
        uploadProfilePhoto: async (_: any, { userid }: { userid: string }): Promise<string> => {
            return userHandler.uploadProfilePhoto(userid);
        }
    },
    User: {
        household: async (parent: User): Promise<Household> => {
            return getHouseholdByUser(parent.userid);
        }
    }

};

export default resolvers;