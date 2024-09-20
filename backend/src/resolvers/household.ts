import * as householdHandler from '../handlers/householdHandler';
import { getUserByID } from '../handlers/userHandler';
export const resolvers = {
    Query: {
        household: async (_: any, { houseid }: { houseid: string }): Promise<Household> => {
            return householdHandler.getHousehold(houseid);
        },
        checkHouseCode: async(_: any, { joinCode }: { joinCode: string }): Promise<string> => {
            return householdHandler.checkHouseCode(joinCode);
        }
    },
    Mutation: {
        createHousehold: async (_: any, { household }: { household: Household }, context: Express.Request): Promise<boolean> => {
            return householdHandler.createHousehold(household, context);
        },
        editHousehold: async (_: any, { editHousehold }: { editHousehold: EditHousehold }): Promise<boolean> => { // should this be a houseid instead of a whole household?
            return householdHandler.editHousehold(editHousehold);
        },
        deleteHousehold: async (_: any, { houseid }: { houseid: string }, context: Express.Request): Promise<boolean> => {
            return householdHandler.deleteHousehold(houseid, context);
        },
        createHouseCode: async (_: any, { houseid }: { houseid: string }): Promise<boolean> => {
            return householdHandler.createHouseCode(houseid);
        },
    },
    Household: {
        users: async (parent: Household): Promise<User[]> => {
            return householdHandler.getUsers(parent.houseid);
        },
        wishgroups: async (parent: Household): Promise<WishGroup[]> => {
            return householdHandler.getWishGroups(parent.houseid)
        },
        bills: async (parent: Household): Promise<Bill[]> => {
            return householdHandler.getBills(parent.houseid)
        },
        admin: async (parent: Household): Promise<User> => {
            return getUserByID(parent.adminid)
        }
    }
};

export default resolvers;