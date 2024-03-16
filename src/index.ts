
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';

const PORT=8001
const init=async ()=>{
    
    const app=express()

    const gqlserver=new ApolloServer({
        typeDefs:`
        type userdata{
            name:String!
            houseno:String!
        }

        type Query{
            getData:[userdata]
            say(name:String):String
        }
        `,
        
        resolvers:{
            Query:{
                getData: ()=>[{name:"khuma pokharel",houseno:4001}],
                say:(_,{name}:{name:String})=>name
                
                
            }
        }
    })
    await gqlserver.start()
    


    app.use(express.json())
    app.use("/graphql",expressMiddleware(gqlserver))
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));


}

init()