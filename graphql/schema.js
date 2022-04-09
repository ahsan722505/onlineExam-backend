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
    input Instruction {
        instruction : String
    }
    type OutInstruction {
        instruction : String
    }
    input ExamInput {
        examName : String
        correctOptions : [Int]
        subjectName : String
        dateAndTime : String
        instructions : [Instruction]
        duration : String
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
        duration : String
        dateAndTime : String
        instructions : [OutInstruction]
        questions : [OutQuestion]
        teacher : Teacher
        admin : ID
        class : Class
        correctOptions : [Int]
    }
    type RootQuery {
        initialRequest: initialResponse
        login(username: String, password: String): AuthData
        getClasses : [Class]
        getExams : [Exam]
        getTeacherExams : [Exam]
        getExamContents(examId : ID,start : Boolean) : Exam
    }
    type RootMutation {
        createExam(examInputData : ExamInput , examId : ID) : Result
        calculateMarks(answers : [Int] , examId : ID) : Result
        deleteExam(examId : ID) : Result
    }
    schema {
        query : RootQuery
        mutation : RootMutation
    }

`);