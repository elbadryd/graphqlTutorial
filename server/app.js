// const express = require('express');
// const app = express();
// const graphqlHTTP = require('express-graphql');
// const schema = require('./schema/schema');

// const mongoose = require('mongoose');
// const DB_NAME = "gql-tutorial"
// const MongoClient = require('mongodb').MongoClient;
// let database;


// // bind express with graphql
// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }));

// app.listen(4000, () => {
//     console.log('now listening for requests on port 4000');
//     MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
//         if(error) {
//             console.log(error)
//         } else {
//             database = client.db(DATABASE_NAME);
//             collection = database.collection("library");
//             console.log("Connected to `" + DB_NAME + "`!");
//         }
//         })
// });
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const uri = `mongodb+srv://elbadryd:${process.env.MONGO_PW}@cluster0-mclid.mongodb.net/test?retryWrites=true`

const app = express();

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});