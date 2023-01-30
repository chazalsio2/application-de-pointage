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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next();
});

app.use(isAuth);

app.use('/graphql',graphqlHTTP({
    schema:graqlSchema,
    rootValue:graqlResolver,
    graphiql: true
}))
mongoose.connect(`${process.env.URL_MONGO}`)
.then(() => {
    app.listen(4000);
    console.log("connexion with mongo db")
})
.catch(err => {
    console.error(err);
})

