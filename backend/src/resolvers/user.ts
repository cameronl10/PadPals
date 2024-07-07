import * as userHandler from '../handlers/userHandler';
import { GetHouseholdByUser} from '../handlers/householdHandler';

export const resolvers = {
    Query: {
        loginUser: async (_: any, {email, password }: {email: String, password: String}, context) => {
            return await userHandler.UserLogin(email, password, context);
        },
        user: async (_: any, { email }: {email: String}): Promise<User> => {
            return await userHandler.GetUser(email);
        }
    },
    Mutation: {
        createUser: async (_: any, { user }: {user: User}) => {
            return await userHandler.CreateUser(user);
        },
        editUserFields: async (_: any, { user }: {user: User}): Promise<void> => {
            return await userHandler.EditUser(user);
        },
        editUserPassword: async (_, {userid, oldPassword, newPassword}: {userid: String, oldPassword: String, newPassword:String}) => {
            return userHandler.editUserPassword(userid, oldPassword, newPassword);
        },
        deleteUser: async (_: any, { userid }: {userid: String}): Promise<void> => {
            return await userHandler.DeleteUser(userid);
        }
    },
    User: {
        household: async (parent: User): Promise<Household> => {
            return await GetHouseholdByUser(parent.userid);
        }
    } 

};

export default resolvers;