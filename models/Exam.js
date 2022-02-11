const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examSchema = new Schema({
    questions : [
        {
            statement:{
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
    classId : {
        type: Schema.Types.ObjectId,
        ref : "Class",
        required : true
    },
    teacherId : {
        type: Schema.Types.ObjectId,
        ref : "Teacher",
        required : true
    },
    adminId : {
        type: Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    }
  
});

module.exports = mongoose.model('Exam', examSchema);
