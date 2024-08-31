import * as SecureStore from 'expo-secure-store'


export async function setSessionKey(key: string) {
    try {
        await SecureStore.setItemAsync('session', key)
    } catch (error) {
        throw new Error("Error setting session key" + error)
    }
}

export async function getSessionKey(): Promise<string>{
    try {
        const sessionID = await SecureStore.getItemAsync('session')
        if (sessionID) {
            return sessionID
        } else {
            return ''
        }
    } catch (error) {
        throw new Error("error getting session key");
    }
}

export async function deleteKey(key: string){
    await SecureStore.deleteItemAsync(key);
}