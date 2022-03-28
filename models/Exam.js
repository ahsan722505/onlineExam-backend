const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examSchema = new Schema({
    examName : String,
    subjectName : String,
    duration : String,
    dateAndTime : String,
    instructions : [{instruction : ""}],
    questions : [
        {
            questionStatement:{
                type : "String",
                required : true,
            },
            options : [
                {
                    statement : {
                        type : "String",
                        required : true,
                    }
                }
            ]
        }
    ],
    correctOptions : [{
        type : Number
    }],
    class : {
        type: Schema.Types.ObjectId,
        ref : "Class",
        required : true
    },
    teacher : {
        type: Schema.Types.ObjectId,
        ref : "Teacher",
        required : true
    },
    admin : {
        type: Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    },
    attempts : [
        {
            type: Schema.Types.ObjectId,
            ref : "Student",
        }
    ]
  
});

module.exports = mongoose.model('Exam', examSchema);
