require("dotenv").config();
const Teacher=require("../models/Teacher");
const Student=require("../models/Student");
const Class=require("../models/Class");
const jwt=require("jsonwebtoken");
module.exports={
    initialRequest : async function(args,req){
        if(!req.isAuth){
            const error = new Error('Not authenticated!');
            error.code = 401;
            throw error;
        }
        return {userId : req.userId , role : req.role , username : req.username}
    },
    login: async function({ username, password }) {
        console.log("yep");
        console.log(username,password);
        let user;
         user = await Student.findOne({ username: username });
        if (!user) {
            user=await Teacher.findOne({username : username});
        }
        if(!user){
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        // const isEqual = await bcrypt.compare(password, user.password);
        const isEqual=password === user.password;
        if (!isEqual) {
          const error = new Error('Password is incorrect.');
          error.code = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            userId: user._id.toString(),
            username: user.username,
            role : user.role,
            adminId : user.adminId
          },
          process.env.secret,
        );
        return { token: token, userId: user._id.toString(),role : user.role,username : user.username };
      },
      getClasses : async function(args,req){
          console.log(req.adminId);
            const classes=await Class.find({adminId : req.adminId});
            console.log(classes);
            return classes
      }
}