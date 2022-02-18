const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examSchema = new Schema({
    examName : String,
    subjectName : String,
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
    }
  
});

module.exports = mongoose.model('Exam', examSchema);
