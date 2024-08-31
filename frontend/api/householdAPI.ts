import {gql} from 'graphql-request'
import { getGraphqlClient } from './client'

const CREATE_HOUSE_MUTATION = gql`
    mutation CreateHousehold($householdName: String) {
        createHousehold(householdName: $householdName)
    }
`


export const createGroup = async (name: any) =>{
    const client = await getGraphqlClient();
    return client.request(CREATE_HOUSE_MUTATION, {name})
}