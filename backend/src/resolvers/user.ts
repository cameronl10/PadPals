import { create } from 'domain';
import Pool from '../../config/dbConnect';
import * as bcrypt from 'bcrypt';

import { CreateUser, UserLogin, EditUser, GetUser, editUserPassword, DeleteUser } from '../handlers/userHandler';

export const resolvers = {
    Query: {
        loginUser: async (_: any, { loginInput }: any, context) => {
            const { email, password } = loginInput;
            return await UserLogin(email, password, context);
        },
        user: async (_: any, { email }: any): Promise<User> => {
            return await GetUser(email);
        }
    },
    Mutation: {
        createUser: async (_: any, { user }: any) => {
            return await CreateUser(user);
        },
        editUserFields: async (_: any, { user }: any): Promise<void> => {
            return await EditUser(user);
        },
        editUserPassword: async (_, { editPassInput }) => {
            const { userid, oldpassword, newpassword } = editPassInput;
            return editUserPassword(userid, oldpassword, newpassword);
        },
        deleteUser: async (_: any, { userid }: any): Promise<void> => {
            return await DeleteUser(userid);
        }
    }
};

export default resolvers;