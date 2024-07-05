
import {getAWish,CreateWish,EditWish,DeleteWish} from '../handlers/wishHandler'
import {getWishGroup} from '../handlers/wishGroupHandler'

const resolvers = {
    Query: {
        wish: async (_: any, wishID: String): Promise<Wish> => {
            return await getAWish(wishID);
        }
    },
    Mutation: {
        createWish: async (_: any, wish: Wish): Promise<Wish> => {
            return await CreateWish(wish);
        },
        editWish: async (_: any, wish: Wish): Promise<void> => {
            return await EditWish(wish);
        },
        deleteWish: async (_: any, wishid: String): Promise<void> => {
            return await DeleteWish(wishid);
        }
    },
    Wish: {
        wishGroup: async (parent: Wish): Promise<WishGroup> => {
            return await getWishGroup(parent.houseid, parent.wishgrouptitle);
        }
    }
};




export default resolvers;