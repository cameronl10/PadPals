import * as wishGroupHandler from '../handlers/wishGroupHandler';

const resolvers = {
    Query: {
        wishGroup: async (_: any, { houseid, title, }: { houseid: string, title: string }): Promise<WishGroup> => {
            return wishGroupHandler.getWishGroup(houseid, title);
        }
    },
    Mutation: {
        editGroupTitle: async (_: any, { editTitle }: { editTitle: EditWishGroupTitle }): Promise<boolean> => {
            return wishGroupHandler.editWishGroupTitle(editTitle.houseID, editTitle.title, editTitle.updatedTitle);
        },
        editGroupColor: async (_: any, { editColor }: { editColor: EditWishGroupColor }): Promise<boolean> => {
            return wishGroupHandler.editWishGroupColor(editColor.houseID, editColor.color, editColor.updatedColor);
        },
        createWishGroup: async (_: any, { wishgroup }: { wishgroup: WishGroup }): Promise<boolean> => {
            return wishGroupHandler.createWishGroup(wishgroup);
        },
        deleteWishGroup: async (_: any, { title, houseid }: any): Promise<boolean> => {
            return wishGroupHandler.deleteWishGroup(title, houseid);
        }
    },
    WishGroup: {
        wishes: async (parent: WishGroup): Promise<Wish[]> => {
            return wishGroupHandler.getWishes(parent.houseid, parent.title);
        }
    }
};


export default resolvers;