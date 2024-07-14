import * as billHandler from '../handlers/billHandler';
import { getAllocations } from '../handlers/allocationHandler';

export const resolvers = {
    Query: {
        bill: async (_: any, { houseid }: { houseid: string }) => {
            return billHandler.getBill(houseid);
        }
    },
    Mutation: {
        createBill: async (_: any, { bill }: { bill: Bill }): Promise<boolean> => {
            return billHandler.createBill(bill);
        },
        editBill: async (_: any, { editBill }: { editBill: EditBill }): Promise<boolean> => {
            return billHandler.editBill(editBill);
        },
        deleteBill: async (_: any, { billid }: { billid: string }): Promise<boolean> => {
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