
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
            return wishHandler.createWish(wish);
        },
        editWish: async (_: any, { wish }: { wish: Wish }): Promise<Boolean> => {
            return wishHandler.editWish(wish);
        },
        deleteWish: async (_: any, { wishID }: { wishID: String }): Promise<Boolean> => {
            return wishHandler.deleteWish(wishID);
        },
        markMultipleWishesAsDone: async(_: any, { wishes }: { wishes: String[] }): Promise<Boolean> => {
            return wishHandler.markMultipleWishesAsDone(wishes);
        }
    },
    Wish: {
        wishGroup: async (parent: Wish): Promise<WishGroup> => {
            return getWishGroup(parent.houseid, parent.wishgrouptitle);
        }
    }
};

export default resolvers;