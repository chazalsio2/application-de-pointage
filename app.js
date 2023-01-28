const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const {ApolloServer} = require('apollo-server-express');
const {buildSchema} = require('graphql')
const mongoose = require('mongoose');
const {gql} = require('apollo-server-express')
const app = express();
const bcrypt = require('bcryptjs')
require('dotenv').config()
const Event = require('./models/event')
const Users = require('./models/users')
const graqlSchema = require('./graphql/schema/index')
const graqlResolver = require('./graphql/resolvers/index') 

app.use(bodyParser.json());

const users = [];



app.use('/graphql',graphqlHTTP({
    schema:graqlSchema,
    rootValue:graqlResolver,
    graphiql: true
}))
mongoose.connect(`${process.env.URL_MONGO}`)
.then(() => {
    app.listen(3000);
    console.log("connexion with mongo db")
})
.catch(err => {
    console.error(err);
})

