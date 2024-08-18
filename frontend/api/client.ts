import { GraphQLClient } from 'graphql-request'

const API_URL = 'http://localhost:3000/graphql';

export const getGraphqlClient = async () => {
    return new GraphQLClient(API_URL, {
      headers:{
      }
    })
}