export const resolvers = {
    Query :{
        session: (_:any,__:any,context: Express.Request) => {
            if (!context.req.sessionID){
                return null 
            }
            return {
                houseid: context.session.houseid,
                name: context.session.name,
                email: context.session.email,
                userid: context.session.userid
            }
        }
    }
}
export default resolvers