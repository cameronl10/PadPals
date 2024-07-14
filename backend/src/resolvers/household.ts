import * as householdHandler from '../handlers/householdHandler';
import { getUsers } from '../handlers/userHandler';
import { getWishGroups } from '../handlers/wishGroupHandler';
import { getBills } from '../handlers/billHandler';

export const resolvers = {
    Query: {
        household: async (_: any, { houseid }: { houseid: string }) => {
            return await householdHandler.getHousehold(houseid);
        }
    },
    Mutation: {
        createHousehold: async (_: any, { household }: { household: Household }): Promise<Household> => {
            return await householdHandler.createHousehold(household);
        },
        editHousehold: async (_: any, { editHousehold }: { editHousehold : EditHousehold }): Promise<void> => { // should this be a houseid instead of a whole household?
            return await householdHandler.editHousehold(editHousehold);
        },
        deleteHousehold: async (_: any, { houseid }: { houseid: string }): Promise<void> => {
            return await householdHandler.deleteHousehold(houseid);
        }
    },
    Household: {
        users: async (parent: Household): Promise<User[]> => {
            return await getUsers(parent.houseid);
        },
        wishgroups: async (parent: Household): Promise<WishGroup[]> => {
            return await getWishGroups(parent.houseid)
        },
        bills: async (parent: Household): Promise<Bill[]> => {
            return await getBills(parent.houseid)
        }
    }
};

export default resolvers;