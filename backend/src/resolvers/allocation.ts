import * as allocationHandler from '../handlers/allocationHandler';
export const resolvers = {
    Query: {
        allocations: async (_: any, { billid }: {billid: string}): Promise<Allocation[]> => {
            return allocationHandler.getAllocations(billid);
        },
        amountOwed: async(_: any, { userid, owedUserid}: {userid: string, owedUserid: string}): Promise<number> => {
            return allocationHandler.getAllocationOwed(userid, owedUserid);
        }
    },
    Mutation: {
        createAllocation: async (_: any, { allocation }: {allocation: Allocation}): Promise<Allocation> => {
            return allocationHandler.createAllocation(allocation);
        },
        editAllocation: async (_: any, { allocation }: {allocation: Allocation}): Promise<Allocation> => {
            return allocationHandler.editAllocation(allocation);
        },
        deleteAllocation: async (_: any, { billid, userid }: {billid: string, userid: string}): Promise<void> => {
            return allocationHandler.deleteAllocation(billid, userid);
        },
        payOffMultipleAllocations: async (_: any, { payerid, payeeid }: {payerid: string, payeeid: string}): Promise<void> => {
            return allocationHandler.payOffMultipleAllocations(payerid, payeeid);
        }
    }
};

export default resolvers;
