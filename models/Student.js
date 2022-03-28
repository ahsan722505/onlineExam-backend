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
    class : {
        type: Schema.Types.ObjectId,
        ref : "Class",
        required : true
    },
    admin : {
        type: Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    },
    role: {
        type: String,
        required: true
      },
      results : [
          {
              exam : {
                type: Schema.Types.ObjectId,
                ref : "Exam",
                required : true
              },
              marks : {
                type : Number,
                required : true
              }
          }
      ],
  
});

module.exports = mongoose.model('Student', studentSchema);
