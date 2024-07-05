import Pool from '../../config/dbConnect';
import { GetHousehold, CreateHousehold, EditHousehold, DeleteHousehold } from '../handlers/householdHandler';

export const resolvers = {
    Query: {
        household: async (_: any, { houseid }: any, context) => {
            return await GetHousehold(houseid, context);
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
    }
};

export default resolvers;