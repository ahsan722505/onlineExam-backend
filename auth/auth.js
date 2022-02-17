const jwt = require('jsonwebtoken');
require("dotenv").config();
module.exports = (req, res, next) => {
    console.log("auth here");
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token,process.env.secret);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.userId = decodedToken.userId;
  req.role=decodedToken.role;
  req.username=decodedToken.username;
  req.isAuth = true;
  req.adminId=decodedToken.adminId;
  next();
};