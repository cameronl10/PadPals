export const typeDefs = `#graphql
    type Wish{
        wishid: String
        userid: String
        houseid: String
        name: String
        price: int
        purchased: Boolean
    }

    type Mutation {
    createWish(wishid: String, userid: String, houseid: String, name: String, price: int, purchased: Boolean): Wish}

`;


export const resolvers = {
    createWish: async (_: any, {wishid, userid, houseid, name, price, purchased}: any) => {
}