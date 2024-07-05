declare global {
    interface User {
        household: any
        userid: String,
        email: String,
        name: String,
        password: String,
        houseid: Household,
        profilepicture: String
    }
    
    interface Household {
        houseid: String,
        name: String,
        address: String,
        users: User[]
    }
    
    interface Wish {
        wishid: String
        userid: String
        name: String
        price: number
        purchased: Boolean
        houseid: String
        group: WishGroup
    }
    
    interface WishGroup {
        title: String
        houseid: String
        color: String
        wishes: Wish[]
    }
    
    interface Bill {
        billid: String,
        houseid: String,
        creatorid: String,
        title: String,
        price: number,
        paid: boolean,
        interval_val: number
    }

    export interface Allocation {
        billid: String,
        userid: String,
        allocation: Number,
        paid: Boolean
    }
}

export {};