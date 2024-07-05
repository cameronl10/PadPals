import { getWishGroup, editWishGroupColor, editWishGroupTitle, CreateWishGroup, DeleteWishGroup, getWishes } from '../handlers/wishGroupHandler';

const resolvers = {
    Query: {
        wishGroup: async (_: any, { houseid, title, }: Partial<WishGroup>): Promise<WishGroup> => {
            return await getWishGroup(houseid, title);
        }
    },
    Mutation: {
        editGroupTitle: async (_: any, { houseid, title, updatedTitle }: {houseid: String, title: String, updatedTitle: String}): Promise<WishGroup> => {
            return await editWishGroupTitle(houseid, title, updatedTitle);
        },
        editGroupColor: async (_: any, { houseid, title, updatedColor }: {houseid: String, title: String, updatedColor: String}): Promise<WishGroup> => {
            return await editWishGroupColor(houseid, title, updatedColor);
        },
        createWishGroup: async (_: any, wishgroup : WishGroup): Promise<void> => {
            return await CreateWishGroup(wishgroup);
        },
        deleteWishGroup: async (_: any, { title, houseid }: any): Promise<void> => {
            return await DeleteWishGroup(title, houseid);
        }
    },
    WishGroup: {
        wishes: async (parent: WishGroup): Promise<Wish[]> => {
            return await getWishes(parent.houseid, parent.title);
        }
    }
};


export default resolvers;