import Pool from '../../config/dbConnect';
import { GetHousehold, CreateHousehold, EditHousehold, DeleteHousehold } from '../handlers/householdHandler';
import { GetUsers } from '../handlers/userHandler';

export const resolvers = {
    Query: {
        household: async (_: any, { houseid }: any, context) => {
            return await GetHousehold(houseid);
        }
    },
    Mutation: {
        createHousehold: async (_: any, { household }: any): Promise<Household> => {
            return await CreateHousehold(household);
        },
        editHousehold: async (_: any, { household }: any): Promise<void> => {
            return await EditHousehold(household);
        },
        deleteHousehold: async (_: any, { houseid }: any): Promise<void> => {
            return await DeleteHousehold(houseid);
        }
    },
    Household: {
        users: async (parent: Household): Promise<User[]> => {
            console.log(parent);
            return await GetUsers(parent.houseid);
        }
    }
};

export default resolvers;