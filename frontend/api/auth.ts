import { gql } from 'graphql-request'
import { getGraphqlClient } from './client';

const LOGIN_MUTATION = gql`
    mutation LoginUser($loginInput: LoginInput!) {
        loginUser(loginInput: $loginInput) {
            userid
        }
    }
`;

const SIGNUP_MUTATION = gql`
    mutation CreateUser($user: UserInput!) {
        createUser(user: $user)
    }
`;

export const login = async (loginInput: any) => {
    const client = await getGraphqlClient();
    return client.request(LOGIN_MUTATION, { loginInput });

};

export const signup = async (userInput: any) => {
    const client = await getGraphqlClient();
    return client.request(SIGNUP_MUTATION, { user: {email: userInput.userEmail, password: userInput.userPassword, name: userInput.username, profilepicture: userInput.profilepicture} });
}