const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    classId : {
        type: Schema.Types.ObjectId,
        ref : "Class",
        required : true
    },
    adminId : {
        type: Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    },
    role: {
        type: String,
        required: true
      }
  
});

module.exports = mongoose.model('Student', studentSchema);
