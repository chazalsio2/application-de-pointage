const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const {ApolloServer} = require('apollo-server-express');
const {buildSchema} = require('graphql')
const mongoose = require('mongoose');
const {gql} = require('apollo-server-express')
const app = express();
const bcrypt = require('bcryptjs')

const Event = require('./models/event')
const Users = require('./models/users')

app.use(bodyParser.json());

const events = [];
const users = [];

app.use('/graphql',graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id:ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            email: String!
            password: String!
            lastName: String!
            firstName: String!
            role: [String!]!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
        }

        input UserInput {
            email: String!
            password: String!
            lastName: String!
            firstName: String!
            role: [String!]!
        }

        type RootQuery {
            events: [Event!]!
            users: [User!]!
        }

        type RootMutation {
            createEvent(eventIput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            const event = Event.find();
            if (event) {
                return event;
            }else{
                return []
            }
            
        },
        users: () => {
            const user = Users.find();
            if (user) {
                return user;
            }else{
                return []
            }
            
        },
        createEvent: async (args) => {
            const event = await new Event({
                title: args.eventIput.title,
                description: args.eventIput.description,
                price: +args.eventIput.price,
                date: new Date().toISOString(),
                creator:'63cba25a8d05fc96c3a30819'
            })
            event.save()
            .then((result)=> {
                return {...result.doc};
                })
            .catch(() => { throw new Error;});

            const user = await Users.findById({_id:'63cba25a8d05fc96c3a30819'}).lean();
            if (!user) {
                throw new Error('utilisateur inexistant')
            }else{
                await Users.updateOne({_id:'63cba25a8d05fc96c3a30819'},{
                    $addToSet:{creatEvents:event._id}
                })
                console.log(user);
                console.log(event);
                // user.creatEvents.push(event);
            }


            events.push(event)

            return event;

        }, 
        createUser : async (args) => {
            const arguser = args.userInput;
            const checkEmail =  Users.findOne({email: arguser.email}).exec();
            if (checkEmail){
                throw new Error('utilisateur déja existent')
            }
            return bcrypt
            .hash(args.userInput.password,12)
            .then(async result => {
                const user = await new Users({
                    email:arguser.email,
                    password:result,
                    firstName:arguser.firstName,
                    lastName:arguser.lastName,
                    role:arguser.role
                })
                users.push(user)
                return user.save();   
            })
            .then((result)=> {
                    return {...result.doc,_id: result.id, email:result.email, password:null, firstName:result.firstName, lastName:result.lastName, role:result.role };
                    })
            .catch((err) => { throw new Error;});
                
          
        }
    },
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.lrejt.mongodb.net/${process.env.MAGNO}?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000);
    console.log("connexion with mongo db")
})
.catch(err => {
    console.error(err);
})

