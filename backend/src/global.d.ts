declare global {
    interface User {
        userid: String,
        email: String,
        name: String,
        password: String,
        houseid: String,
        profilepicture: String
    }
    
    interface Household {
        houseid: String,
        name: String,
        address: String,
    }
    
    interface Wish {
        wishid: String
        userid: String
        name: String
        price: number
        purchased: Boolean
        houseid: String
        wishgrouptitle: String
    }
    
    interface WishGroup {
        title: String
        houseid: String
        color: String
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
    interface Allocation {
        billid: String,
        userid: String,
        allocation: Number,
        paid: Boolean
    }
}

export {};