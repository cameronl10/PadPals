import Pool from '../config/dbConnect';

interface WishGroup {
    title: String
    houseid: String
    color: String

};


export const typeDefs = `#graphql
    input WishGroupInput{
        title: String!
        houseid: String!
        color: String!
    }
    input WishGroupDelete{
        title: String!
        housid: String!
    }
    type WishGroup{
        title: String
        houseid: String
        color: String
    }
    type Mutation {
        createWishGroup(wishgroup: WishGroupInput!): WishGroup
        deleteWishGroup(title: String, houseid: String): WishGroup
        editGroupTitle(houseID: String!, title: String!, updatedTitle: String!): WishGroup
        editGroupColor(houseID: String!, title: String!, updatedColor: String!): WishGroup
    }
    type Query {
        getGroup(houseID: String!, title: String!): WishGroup
    }
`;




