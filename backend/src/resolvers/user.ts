import * as userHandler from '../handlers/userHandler';
import { getHouseholdByUser} from '../handlers/householdHandler';

export const resolvers = {
    Query: {
        loginUser: async (_: any, {email, password }: {email: string, password: string}, context) => {
            return await userHandler.userLogin(email, password, context);
        },
        user: async (_: any, { email }: {email: string}): Promise<User> => {
            return await userHandler.getUser(email);
        }
    },
    Mutation: {
        createUser: async (_: any, { user }: {user: User}) => {
            return await userHandler.createUser(user);
        },
        editUserFields: async (_: any, { user }: {user: User}): Promise<void> => {
            return await userHandler.editUser(user);
        },
        editUserPassword: async (_, {userid, oldPassword, newPassword}: {userid: string, oldPassword: string, newPassword:string}) => {
            return userHandler.editUserPassword(userid, oldPassword, newPassword);
        },
        deleteUser: async (_: any, { userid }: {userid: string}): Promise<void> => {
            return await userHandler.deleteUser(userid);
        }
    },
    User: {
        household: async (parent: User): Promise<Household> => {
            return await getHouseholdByUser(parent.userid);
        }
    } 

};

export default resolvers;