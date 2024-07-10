declare global {
    interface User {
        userid: string,
        email: string,
        name: string,
        password: string,
        houseid: string,
        profilepicture: string
    }
    
    interface Household {
        houseid: string,
        name: string,
        address: string,
    }
    
    interface Wish {
        wishid: string
        userid: string
        name: string
        price: number
        purchased: boolean
        houseid: string
        wishgrouptitle: string
    }
    
    interface WishGroup {
        title: string
        houseid: string
        color: string
    }
    
    interface Bill {
        billid: string,
        houseid: string,
        creatorid: string,
        title: string,
        price: number,
        paid: boolean,
        interval_val: number
    }
    interface Allocation {
        billid: string,
        userid: string,
        allocation: Number,
        paid: boolean
    }
}

export {};