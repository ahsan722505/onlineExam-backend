const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const auth=require("./auth/auth");
const graphqlSchema=require("./graphql/schema");
const graphqlResolver=require("./graphql/resolvers");
const { graphqlHTTP }  = require('express-graphql');
const app=express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
  console.log("request here");
  next()
})
app.use(auth);
app.use(
    '/graphql',
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,
      customFormatErrorFn(err) {
        console.log("err here");
        console.log(err);
        if (!err.originalError) {
          return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occurred.';
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data };
      }
    })
  );
mongoose.connect(process.env.MONGO_URI).then((result)=>{
    console.log("connected to database");
    app.listen(process.env.PORT || 8080);
}).catch((err)=>{
    console.log(err)
})