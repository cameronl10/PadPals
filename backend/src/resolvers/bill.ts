import * as billHandler from '../handlers/billHandler';
import { getAllocations } from '../handlers/allocationHandler';

export const resolvers = {
    Query: {
        bills: async (_: any, { houseid }: {houseid: string}) => {
            return billHandler.getBills(houseid);
        }
    },
    Mutation: {
        createBill: async (_: any, { bill }: {bill: Bill}): Promise<Bill> => {
            return billHandler.createBill(bill);
        },
        editBill: async (_: any, { bill }: {bill: Bill}): Promise<void> => {
            return billHandler.editBill(bill);
        },
        deleteBill: async (_: any, { billid }: {billid: string}): Promise<void> => {
            return billHandler.deleteBill(billid);
        }
    },
    Bill: {
        allocations: async (parent: Bill): Promise<Allocation[]> => {
            return getAllocations(parent.billid);
        }
    }
};
export default resolvers;