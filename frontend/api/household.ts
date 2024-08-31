import { gql } from 'graphql-request'
import { getGraphqlClient } from './client';

const CREATE_HOUSE_MUTATION = gql`
    mutation CreateHousehold($householdName: String) {
        createHousehold(householdName: $householdName)
    }
`

const ADDUSER_MUTATION = gql`
    mutation AssignHousehold($user: string, $household: string) {
        assignHousehold(userid: $user, houseid: $household)
    }
`;

const CHECKHOUSECODE_QUERY = gql`
    query CheckHouseCode($code: string) {
        checkHouseCode(joinCode: $code)
    }
`;

export const createGroup = async (name: any) =>{
    const client = await getGraphqlClient();
    return client.request(CREATE_HOUSE_MUTATION, {name})
}

export const addUser = async (userID: any, houseID: any) => {
    const client = await getGraphqlClient();
    return client.request(ADDUSER_MUTATION, { user: userID, household: houseID });
}

export const checkHouseCode = async (joinCode: any) => {
    const client = await getGraphqlClient();
    return client.request(CHECKHOUSECODE_QUERY, { code: joinCode });
}