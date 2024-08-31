import { gql } from 'graphql-request'
import { getGraphqlClient } from './client';
import { useMutation } from '@tanstack/react-query';
import { setSessionKey } from '@/managers/sessionManager';

const LOGIN_MUTATION = gql`
    mutation LoginUser($loginInput: LoginInput!) {
        loginUser(loginInput: $loginInput) {
            userid
            sessionid
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
    return client.request(SIGNUP_MUTATION, { user: { email: userInput.userEmail, password: userInput.userPassword, name: userInput.username, profilepicture: userInput.profilepicture } });
}

export function loginMutation() {
    return useMutation({
        mutationFn: async (loginInput: { email: string, password: string }) => await login(loginInput),
        onSuccess: async (data) => {
            await setSessionKey(data.loginUser.sessionid)
        },
        onError: (err) => {
            alert("Email or Password is not correct" + err)
        }
    })
}

export function createUserMutation() {
    return useMutation({
        mutationFn: async (userInput: {username: string, userEmail: string, userPassword: string, profilepicture: string}) => 
            await signup(userInput),
        onSuccess: (data) => {
            alert(data);
        },
        onError: (err) => {
            alert(err);
        }
    });
}