import * as billHandler from '../handlers/billHandler';

export const resolvers = {
    Query: {
        bill: async (_: any, { billid }: { billid: string }) => {
            return billHandler.getBill(billid);
        }
    },
    Mutation: {
        createBill: async (_: any, { bill }: { bill: Bill }): Promise<Bill> => {
            return billHandler.createBill(bill);
        },
        editBill: async (_: any, { editBill }: { editBill: EditBill }): Promise<void> => {
            return billHandler.editBill(editBill);
        },
        deleteBill: async (_: any, { billid }: { billid: string }): Promise<void> => {
            return billHandler.deleteBill(billid);
        }
    },
    Bill: {
        allocations: async (parent: Bill): Promise<Allocation[]> => {
            return billHandler.getAllocations(parent.billid);
        }
    }
};
export default resolvers;