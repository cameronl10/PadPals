import Pool from '../../config/dbConnect';
import { GetAllocations, CreateAllocation, EditAllocation, DeleteAllocation, GetAllocationOwed } from '../handlers/allocationHandler';

export const resolvers = {
    Query: {
        allocations: async (_: any, { billid }: any): Promise<Allocation[]> => {
            return await GetAllocations(billid);
        },
        amountOwed: async(_: any, { userid, owedUserid}: any): Promise<Number> => {
            return await GetAllocationOwed(userid, owedUserid);
        }
    },
    Mutation: {
        createAllocation: async (_: any, { allocation }: any): Promise<Allocation> => {
            return await CreateAllocation(allocation);
        },
        editAllocation: async (_: any, { allocation }: any): Promise<Allocation> => {
            return await EditAllocation(allocation);
        },
        deleteAllocation: async (_: any, { billid, userid }: any): Promise<void> => {
            return await DeleteAllocation(billid, userid);
        }
    }
};

export default resolvers;