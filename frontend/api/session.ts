import {gql} from 'graphql-request'
import { getGraphqlClient } from './client'
import { useQuery } from '@tanstack/react-query';

const SESSION_QUERY = gql`
    query Session {
        session {
            name
            email
            houseid
            userid
        }
    }
`;
export const sessionQuery = async() => {
    const client = await getGraphqlClient();
    return client.request(SESSION_QUERY)
}

export function useSessionInfo(){
    return useQuery({
        queryKey:['sessionQuery'],
        queryFn: sessionQuery
    })
}