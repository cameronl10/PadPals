import * as billHandler from '../handlers/billHandler';
import { GetAllocations } from '../handlers/allocationHandler';

export const resolvers = {
    Query: {
        bills: async (_: any, { houseid }: {houseid: String}) => {
            return await billHandler.GetBills(houseid);
        }
    },
    Mutation: {
        createBill: async (_: any, { bill }: {bill: Bill}): Promise<Bill> => {
            return await billHandler.CreateBill(bill);
        },
        editBill: async (_: any, { bill }: {bill: Bill}): Promise<void> => {
            return await billHandler.EditBill(bill);
        },
        deleteBill: async (_: any, { billid }: {billid: String}): Promise<void> => {
            return await billHandler.DeleteBill(billid);
        }
    },
    Bill: {
        allocations: async (parent: Bill): Promise<Allocation[]> => {
            return await GetAllocations(parent.billid);
        }
    }
};
export default resolvers;