import * as wishGroupHandler from '../handlers/wishGroupHandler';

const resolvers = {
    Query: {
        wishGroup: async (_: any, { houseid, title, }: { houseid: string, title: string }): Promise<WishGroup> => {
            return await wishGroupHandler.getWishGroup(houseid, title);
        }
    },
    Mutation: {
        editGroupTitle: async (_: any, { editTitle }: { editTitle: EditWishGroupTitle }): Promise<WishGroup> => {
            return await wishGroupHandler.editWishGroupTitle(editTitle.houseID, editTitle.title, editTitle.updatedTitle);
        },
        editGroupColor: async (_: any, { editColor }: { editColor: EditWishGroupColor }): Promise<WishGroup> => {
            return await wishGroupHandler.editWishGroupColor(editColor.houseID, editColor.color, editColor.updatedColor);
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