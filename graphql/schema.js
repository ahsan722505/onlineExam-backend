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
        admin : ID
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
        class : ID
    }
    type OutOption {
        statement : String
    }
    type OutQuestion {
        questionStatement : String
        options : [OutOption]
    }
    type Teacher {
        username : String

    }
    type Exam {
        _id : ID
        examName : String
        subjectName : String
        questions : [OutQuestion]
        teacher : Teacher
        admin : ID
        class : ID
    }
    type RootQuery {
        initialRequest: initialResponse
        login(username: String, password: String): AuthData
        getClasses : [Class]
        getExams : [Exam]
    }
    type RootMutation {
        createExam(examInputData : ExamInput) : Result
    }
    schema {
        query : RootQuery
        mutation : RootMutation
    }

`);