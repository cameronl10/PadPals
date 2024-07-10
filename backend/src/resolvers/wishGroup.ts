import * as wishGroupHandler from '../handlers/wishGroupHandler';

const resolvers = {
    Query: {
        wishGroup: async (_: any, { houseid, title, }: { houseid: string, title: string }): Promise<WishGroup> => {
            return await wishGroupHandler.getWishGroup(houseid, title);
        }
    },
    Mutation: {
        editGroupTitle: async (_: any, { houseid, title, updatedTitle }: {houseid: string, title: string, updatedTitle: string}): Promise<WishGroup> => {
            return await wishGroupHandler.editWishGroupTitle(houseid, title, updatedTitle);
        },
        editGroupColor: async (_: any, { houseid, title, updatedColor }: {houseid: string, title: string, updatedColor: string}): Promise<WishGroup> => {
            return await wishGroupHandler.editWishGroupColor(houseid, title, updatedColor);
        },
        createWishGroup: async (_: any, { wishgroup }: { wishgroup: WishGroup }): Promise<void> => {
            return await wishGroupHandler.createWishGroup(wishgroup);
        },
        deleteWishGroup: async (_: any, { title, houseid }: any): Promise<void> => {
            return await wishGroupHandler.deleteWishGroup(title, houseid);
        }
    },
    WishGroup: {
        wishes: async (parent: WishGroup): Promise<Wish[]> => {
            return await wishGroupHandler.getWishes(parent.houseid, parent.title);
        }
    }
};


export default resolvers;