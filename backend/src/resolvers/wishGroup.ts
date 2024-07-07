import * as wishGroupHandler from '../handlers/wishGroupHandler';

const resolvers = {
    Query: {
        wishGroup: async (_: any, { houseid, title, }: { houseid: String, title: String }): Promise<WishGroup> => {
            return await wishGroupHandler.getWishGroup(houseid, title);
        }
    },
    Mutation: {
        editGroupTitle: async (_: any, { houseid, title, updatedTitle }: {houseid: String, title: String, updatedTitle: String}): Promise<WishGroup> => {
            return await wishGroupHandler.editWishGroupTitle(houseid, title, updatedTitle);
        },
        editGroupColor: async (_: any, { houseid, title, updatedColor }: {houseid: String, title: String, updatedColor: String}): Promise<WishGroup> => {
            return await wishGroupHandler.editWishGroupColor(houseid, title, updatedColor);
        },
        createWishGroup: async (_: any, { wishgroup }: { wishgroup: WishGroup }): Promise<void> => {
            return await wishGroupHandler.CreateWishGroup(wishgroup);
        },
        deleteWishGroup: async (_: any, { title, houseid }: any): Promise<void> => {
            return await wishGroupHandler.DeleteWishGroup(title, houseid);
        }
    },
    WishGroup: {
        wishes: async (parent: WishGroup): Promise<Wish[]> => {
            return await wishGroupHandler.getWishes(parent.houseid, parent.title);
        }
    }
};


export default resolvers;