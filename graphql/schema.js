const {buildSchema}=require("graphql");
module.exports=buildSchema(`
    type initialResponse {
        role : String
        userId : ID
        username : String
    }
    type AuthData {
        token : String
        userId : ID
        role : String
        username : String
    }
    type Class {
        name : String
        adminId : ID
    }
    type RootQuery {
        initialRequest: initialResponse
        login(username: String, password: String): AuthData
        getClasses : [Class]
    }
    schema {
        query : RootQuery
    }

`);