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

const users = [];

const events = async eventIds => {
    const event = await Event.find({_id:{$in: eventIds}}).lean();
    if (event) {
        return event.map(event => {
            return {
                ...event._doc,
                _id: event._id,
                creator: user.bind(this,event.creator)
            };
        });
    }else{
        return []
    }
}

const user = async userId => {
    const users = await Users.findById(userId).lean();
    console.log("users");
            if (users) {
                    return {
                        ...users._doc,
                        _id: users._id,
                        email: users.email,
                        creatEvents: events.bind(this,users.creatEvents)
                    };
            }else{
                return []
            }
    }


app.use('/graphql',graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id:ID!
            score:String!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String!
            code:String!
            lastName: String!
            firstName: String!
            role: [String!]!
            creatEvents:[Event!]
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
        events:async  () => {
            const event = await Event.find().lean();
            if (event) {
                return event.map(event => {
                    console.log("event.creator");
                    return {
                        ...event._doc,
                        _id: event._id,
                        creator: user.bind(this,event.creator),
                    };
                });
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
                code: args.eventIput.code,
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
                    code:result.code,
                    firstName:arguser.firstName,
                    lastName:arguser.lastName,
                    role:arguser.role
                })
                users.push(user)
                return user.save();   
            })
            .then((result)=> {
                    return {...result.doc,_id: result.id, email:result.email, password:null, firstName:result.firstName, code:result.code, lastName:result.lastName, role:result.role };
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

