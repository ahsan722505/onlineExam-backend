const {buildSchema}=require("graphql");
module.exports=buildSchema(`
    type initialResponse {
        role : String
        userId : ID
        username : String
    }
    type Result {
        success : Boolean
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
        _id : ID
    }
    input Option {
        statement : String
    }
    input Question {
        questionStatement : String
        options : [Option]
    }
    input ExamInput {
        examName : String
        subjectName : String
        questions : [Question]
        classId : ID
    }
    type RootQuery {
        initialRequest: initialResponse
        login(username: String, password: String): AuthData
        getClasses : [Class]
    }
    type RootMutation {
        createExam(examInputData : ExamInput) : Result
    }
    schema {
        query : RootQuery
        mutation : RootMutation
    }

`);