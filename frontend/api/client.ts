import { GraphQLClient } from 'graphql-request'
import { getSessionKey } from '@/managers/sessionManager';
const API_URL = 'http://18.220.131.95:3000/graphql';

export const getGraphqlClient = async () => {
    const sessionKey = await getSessionKey();
    return new GraphQLClient(API_URL, {
      headers:{
        'Session-Id': sessionKey
      }
    })
}