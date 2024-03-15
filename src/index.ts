import { ApolloServer } from '@apollo/server';
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'



const app = express()
const PORT = Number(process.env.PORT) || 8001;

async function startServer() {
    const gqlserver = new ApolloServer(
        {
            typeDefs: `
          type UserData{
            id:ID!,
            name:String!
          }
          type Query{
            getUserData:[UserData]
            say(name:String):String
          }
        `,
            resolvers: {
                Query: {
                    getUserData: () => [{ id: 12, name: "khuma Pokharel" }],
                    say: (_, { name }: { name: String }) => "khuma"

                }
            }
        }
    )

    await gqlserver.start();
    app.use(express.json())
    app.use("/graphql", expressMiddleware(gqlserver)); // Call the imported expressMidlleware function

    app.listen(PORT, () => console.log("listening to the port no " + PORT));

}



startServer()

