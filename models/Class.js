const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    admin : {
        type: Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    }
});

module.exports = mongoose.model('Class', classSchema);
