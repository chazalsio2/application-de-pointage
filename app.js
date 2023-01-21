const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const {ApolloServer} = require('apollo-server-express');
const {buildSchema} = require('graphql')
const mongoose = require('mongoose');
const {gql} = require('apollo-server-express')
const app = express();

const Event = require('./models/event')

app.use(bodyParser.json());

const events = [];

app.use('/graphql',graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id:ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventIput: EventInput): Event
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
        createEvent: async (args) => {

                
            const event = await new Event({
                title: args.eventIput.title,
                description: args.eventIput.description,
                price: +args.eventIput.price,
                date: new Date(args.eventIput.date),
            })
            event.save()
            .then((result)=> {
                console.log(result);
                return {...result.doc};
                })
            .catch((err) => { console.log(err);});

            events.push(event)

            return event;

        }
    },
    graphiql: true
}))

console.log(process.env.MAGNO);
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.lrejt.mongodb.net/${process.env.MAGNO}?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000);
    console.log("connexion with mongo db")
})
.catch(err => {
    console.error(err);
})

// const URL = "mongodb+srv://chazal:chanel976@cluster0.lrejt.mongodb.net/TestTechnique"

// mongoose.connect(URL, {
//     useUnifiedTopology: true,userNewUrlParser: true,
// },()=>console.log("DB CONNECTED"))

// const PORT= 4000;


// //queries
// const typeDefs =gql`
//  type Query{
//     hello:String
//  }
// `

// //resolvers
// const resolvers ={
//     Query: {
//         hello: ()=>{
//             return"hello world"
//         }
//     }
// }

// const StartServer = async()=>{
//     const apolloServer= new ApolloServer({
//         typeDefs, resolvers
//     })
//     await apolloServer.start();
//     apolloServer.applyMiddleware({app:app});
//     app.listen(PORT,()=>console.log("Server up and runnig p 4000"))
// };

// StartServer();
