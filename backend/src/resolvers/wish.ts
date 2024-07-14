
import * as wishHandler from '../handlers/wishHandler'
import { getWishGroup } from '../handlers/wishGroupHandler'

const resolvers = {
    Query: {
        wish: async (_: any, { wishID }: { wishID: String }): Promise<Wish> => {
            return await wishHandler.getAWish(wishID);
        }
    },
    Mutation: {
        createWish: async (_: any, { wish }: { wish: Wish }): Promise<Wish> => {
            return await wishHandler.createWish(wish);
        },
        editWish: async (_: any, { wish }: { wish: Wish }): Promise<void> => {
            return await wishHandler.editWish(wish);
        },
        deleteWish: async (_: any, { wishID }: { wishID: String }): Promise<void> => {
            return await wishHandler.deleteWish(wishID);
        },
        markMultipleWishesAsDone: async(_: any, { wishes }: { wishes: String[] }): Promise<void> => {
            return wishHandler.markMultipleWishesAsDone(wishes);
        }
    },
    Wish: {
        wishGroup: async (parent: Wish): Promise<WishGroup> => {
            return await getWishGroup(parent.houseid, parent.wishgrouptitle);
        }
    }
};




export default resolvers;