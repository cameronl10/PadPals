import * as allocationHandler from '../handlers/allocationHandler';
import { createBillWithAllocations, getBill }  from '../handlers/billHandler';
export const resolvers = {
    Query: {
        allocation: async (_: any, { billid, userid }: { billid: string, userid: string }): Promise<Allocation> => {
            return allocationHandler.getAnAllocation(billid, userid);
        },
        amountOwed: async (_: any, { userid, owedUserid }: { userid: string, owedUserid: string }): Promise<number> => {
            return allocationHandler.getAllocationOwed(userid, owedUserid);
        }
    },
    Mutation: {
        createAllocation: async (_: any, { allocation }: { allocation: Allocation }): Promise<boolean> => {
            return allocationHandler.createAllocation(allocation);
        },
        editAllocation: async (_: any, { editAllocation }: { editAllocation: EditAllocation }): Promise<boolean> => {
            return allocationHandler.editAllocation(editAllocation);
        },
        deleteAllocation: async (_: any, { billid, userid }: { billid: string, userid: string }): Promise<boolean> => {
            return allocationHandler.deleteAllocation(billid, userid);
        },
        payOffMultipleAllocations: async (_: any, { payerid, payeeid }: { payerid: string, payeeid: string }): Promise<boolean> => {
            return allocationHandler.payOffMultipleAllocations(payerid, payeeid);
        }
    },
    Allocation: {
        bill: async (parent: Allocation): Promise<Bill> => {
            return getBill(parent.billid);
        }
    }
};

export default resolvers;
