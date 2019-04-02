const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const uri = `mongodb+srv://elbadryd:${process.env.MONGO_PW}@cluster0-mclid.mongodb.net/gql-tutorial`
const cors = require('cors');

const app = express();

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});
app.use(cors())
// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});