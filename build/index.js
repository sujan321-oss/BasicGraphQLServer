"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const db_1 = __importDefault(require("./lib/db"));
const PORT = 8001;
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const gqlserver = new server_1.ApolloServer({
        typeDefs: `
        type userdata{
            name:String!
            houseno:String!
        }

        type Query{
            getData:[userdata]
            userCreation(firstname:String,lastname:String,email:String,profileImageUrl:String):Boolean
        }
        `,
        resolvers: {
            Query: {
                getData: () => [{ name: "khuma pokharel", houseno: 4001 }],
                userCreation: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstname, lastname, email, profileImageUrl }) {
                    yield db_1.default.user.create({
                        data: {
                            firstName: "firstname",
                            lastName: "lastname",
                            email: "email",
                            profileImageUrl: "profileImageUrl",
                        }
                    });
                    console.log("User create in a database");
                    return true;
                })
            }
        }
    });
    yield gqlserver.start();
    app.use(express_1.default.json());
    app.use("/graphql", (0, express4_1.expressMiddleware)(gqlserver));
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});
init();
