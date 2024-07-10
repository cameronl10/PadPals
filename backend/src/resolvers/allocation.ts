import Pool from '../../config/dbConnect';
import { getAllocations, createAllocation, editAllocation, deleteAllocation, getAllocationOwed } from '../handlers/allocationHandler';
export const resolvers = {
    Query: {
        allocations: async (_: any, { billid }: any): Promise<Allocation[]> => {
            return await getAllocations(billid);
        },
        amountOwed: async(_: any, { userid, owedUserid}: any): Promise<Number> => {
            return await getAllocationOwed(userid, owedUserid);
        }
    },
    Mutation: {
        createAllocation: async (_: any, { allocation }: any): Promise<Allocation> => {
            return await createAllocation(allocation);
        },
        editAllocation: async (_: any, { allocation }: any): Promise<Allocation> => {
            return await editAllocation(allocation);
        },
        deleteAllocation: async (_: any, { billid, userid }: any): Promise<void> => {
            return await deleteAllocation(billid, userid);
        }
    }
};

export default resolvers;