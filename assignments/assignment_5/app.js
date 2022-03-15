const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
SECRET = "RESTAPI"

const loginRoutes = require("./routes/login")
const userRoutes = require("./routes/users")
const postRoutes = require("./routes/posts")

const app = express(); // create a new express application

mongoose.connect('mongodb://localhost:27017/assignment_5')



app.use("/posts",(req,res,next)=>{

    var token = req.headers.authorization.split("Bearer ")[1];
    if(!token){
        return res.status(401).json({
            status:"failed",
            message:"token is missing"
        })
    }
    jwt.verify(token,SECRET,function(err,decoded){
        if(err){
            return res.status(401).json({
                status:"failed",
                message:"invalid token"
            })
        }
        else{
            req.user = decoded.data
            next();
        }
    })
})


app.use("/",loginRoutes)
app.use("/users",userRoutes)
app.use("/",postRoutes)

app.listen(process.env.PORT,()=>{  // bind the connections on this port and listen to it
    console.log(`photo app listening on ${3000}`);
})