
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';

import prisma from './lib/db';

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
            userCreation(firstname:String,lastname:String,email:String,profileImageUrl:String):Boolean
        }
        `,
        
        resolvers:{
            Query:{
                getData: ()=>[{name:"khuma pokharel",houseno:4001}],
                userCreation:
                    async (_,{firstname,lastname,email,profileImageUrl}
                    :{firstname:String,email:String,profileImageUrl:String,lastname:String})=>{
                        await prisma.user.create
                        ({
                            data:{
                              firstName:"firstname",
                              lastName:"lastname",
                              email:"email",
                              profileImageUrl:"profileImageUrl",
                    
                            }
                        })
                        console.log("User create in a database")
                        return true;
                    } 
            }
            
        }
    })
    await gqlserver.start()
    


    app.use(express.json())
    app.use("/graphql",expressMiddleware(gqlserver))
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));


}

init()