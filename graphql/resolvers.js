require("dotenv").config();
const Teacher=require("../models/Teacher");
const Student=require("../models/Student");
const Class=require("../models/Class");
const Exam=require("../models/Exam");
const jwt=require("jsonwebtoken");
module.exports={
    initialRequest : async function(args,req){
      console.log("initial");
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
            adminId : user.admin
          },
          process.env.secret,
        );
        return { token: token, userId: user._id.toString(),role : user.role,username : user.username };
      },
      getClasses : async function(args,req){
            const classes=await Class.find({adminId : req.adminId});
            return classes
      },
      createExam : async function({examInputData,examId},req){
        if(examId){
          await Exam.findByIdAndUpdate(examId,examInputData)
        }
        else{
          const exam=new Exam({...examInputData,teacher : req.userId, admin : req.adminId ,attempts : []});
          await exam.save();
        }
          return {success : true}
      },
      getExams : async function (args,req){
        const student=await Student.findById(req.userId);
        const exams= await Exam.find({class : student.class}).populate("teacher").exec();
        return exams.filter(eachExam=>{
          return eachExam.attempts.every(eachAttempt=> eachAttempt != req.userId)
        })
        
      },
      getTeacherExams : async function (args,req){
        const exams= await Exam.find({teacher : req.userId})
        return exams;
      },
      getExamContents : async function({examId,start},req){
        let exam;
        if(start){
          exam=await Exam.findByIdAndUpdate(examId,{ "$push": { "attempts": req.userId } },{new : true});
        }else{
          exam=await Exam.findById(examId).populate("class").exec();
        }
        return exam;
      },
      calculateMarks : async function({answers,examId},req){
        const {correctOptions}=await Exam.findById(examId);
        let marks=0;
        correctOptions.forEach((eachOption,i)=>{
          if(eachOption === answers[i]) marks++;
        })
        await Student.findByIdAndUpdate(req.userId,{ "$push": { "results": {exam : examId,marks} } });
        return {success : true}
      }
    
}