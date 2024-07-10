import { get } from 'http';
import { createBill, deleteBill, editBill, getBills } from '../handlers/billHandler';
import { getAllocations } from '../handlers/allocationHandler';

export const resolvers = {
    Query: {
        bills: async (_: any, { houseid }: any) => {
            return await getBills(houseid);
        }
    },
    Mutation: {
        createBill: async (_: any, { bill }: any): Promise<Bill> => {
            return await createBill(bill);
        },
        editBill: async (_: any, { bill }: any): Promise<void> => {
            return await editBill(bill);
        },
        deleteBill: async (_: any, { billid }: any): Promise<void> => {
            return await deleteBill(billid);
        }
    },
    Bill: {
        allocations: async (parent: Bill): Promise<Allocation[]> => {
            return await getAllocations(parent.billid);
        }
    }
};
export default resolvers;