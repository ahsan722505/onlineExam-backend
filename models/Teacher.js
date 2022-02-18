const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    admin : {
        type: Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    },
    role: {
        type: String,
        required: true
    }
  
});

module.exports = mongoose.model('Teacher', teacherSchema);
