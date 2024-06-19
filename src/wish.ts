

export const typeDefs = `#graphql
    type Wish {
        wishid: String
        userid: String
        houseid: String
        group: String
        name: String
        price: Int
        purchased: Boolean
    }
    input WishInput{
        userid: String!
        houseid: String!
        group: String
        name: String!
        price: Int
        purchased: Boolean!
    }
    input EditWishInput {
        wishid: String!
        name: String
        householdid: String
        group: String
        price: Int
        purchased: Boolean
    }
    type Mutation {
        createWish(wish: WishInput!): Wish
        editWish(wishid: String, column: String, value: String): Wish
        editEntireWish(wish: EditWishInput!): Wish
        deleteWish(wishid: String): Wish
    }
    type Query{
        getWishes: [Wish]
        getWish(wishID: String!): Wish
    }
`;

