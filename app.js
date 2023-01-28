const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()
const graqlSchema = require('./graphql/schema/index')
const graqlResolver = require('./graphql/resolvers/index') 
const isAuth = require('./middleware/is-auth')

app.use(bodyParser.json());

app.use(isAuth);

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

