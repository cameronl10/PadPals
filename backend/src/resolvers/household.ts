import * as householdHandler from '../handlers/householdHandler';
import { GetUsers } from '../handlers/userHandler';

export const resolvers = {
    Query: {
        household: async (_: any, { houseid }: {houseid: String}, context) => {
            return await householdHandler.GetHousehold(houseid);
        }
    },
    Mutation: {
        createHousehold: async (_: any, { household }: {household: Household}): Promise<Household> => {
            return await householdHandler.CreateHousehold(household);
        },
        editHousehold: async (_: any, { household }: {household: Household}): Promise<void> => { // should this be a houseid instead of a whole household?
            return await householdHandler.EditHousehold(household);
        },
        deleteHousehold: async (_: any, { houseid }: {houseid: String}): Promise<void> => {
            return await householdHandler.DeleteHousehold(houseid);
        }
    },
    Household: {
        users: async (parent: Household): Promise<User[]> => {
            return await GetUsers(parent.houseid);
        }
    }
};

export default resolvers;