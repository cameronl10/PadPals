import { get } from 'http';
import { CreateBill, DeleteBill, EditBill, GetBills } from '../handlers/billHandler';
import { GetAllocations } from '../handlers/allocationHandler';

export const resolvers = {
    Query: {
        bills: async (_: any, { houseid }: any) => {
            return await GetBills(houseid);
        }
    },
    Mutation: {
        createBill: async (_: any, { bill }: any): Promise<Bill> => {
            return await CreateBill(bill);
        },
        editBill: async (_: any, { bill }: any): Promise<void> => {
            return await EditBill(bill);
        },
        deleteBill: async (_: any, { billid }: any): Promise<void> => {
            return await DeleteBill(billid);
        }
    },
    Bill: {
        allocations: async (parent: Bill): Promise<Allocation[]> => {
            console.log(parent);
            return await GetAllocations(parent.billid);
        }
    }
};
export default resolvers;