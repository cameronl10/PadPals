import * as billHandler from '../handlers/billHandler';

export const resolvers = {
    Query: {
        bill: async (_: any, { billid }: { billid: string }) => {
            return billHandler.getBill(billid);
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
        },
        createBillWithAllocations: async (_: any, { bill, allocations }: { bill: Bill, allocations: PartialAllocationInput[] }): Promise<boolean> => {
            return billHandler.createBillWithAllocations(bill, allocations);
        }
    },
    Bill: {
        allocations: async (parent: Bill): Promise<Allocation[]> => {
            return billHandler.getAllocations(parent.billid);
        }
    }
};
export default resolvers;