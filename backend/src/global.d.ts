import session from 'express-session'
declare global {
    namespace Express {
        interface SessionData {
            userID: string,
            houseID: string,
            username: string,
            email: string
        }
        interface Request {
            session: session.Session & Partial<SessionData>;
        }
    }
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
        adminid: string
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
        allocation: number,
        paid: boolean
    }
    interface EditPassword {
        userid: string
        oldpassword: string
        newpassword: string
    }
    interface LoginInput {
        email: string
        password: string
    }
    interface EditWishGroupTitle {
        houseID: string
        title: string
        updatedTitle: string
    }
    interface EditWishGroupColor {
        houseID: string
        color: string
        updatedColor: string
    }
    interface EditHousehold {
        houseid: string
        name: string
        address: string
    }
    interface EditBill {
        billid: string
        creatorid: string
        title: string
        price: number
        paid: boolean
        interval_val: number
    }
    interface EditAllocation {
        billid: string
        userid: string
        allocation: number
        paid: boolean
    }
    interface PartialAllocationInput {
        userid: string
        allocation: number
    }
    interface CreateAllocation {
        billid: string
        userid: string
        allocation: number
    }


}

export { };
