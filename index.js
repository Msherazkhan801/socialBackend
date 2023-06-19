import  express from "express"
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import { notFound,errorHandler } from "./middlerware/error_middleware.js";
import mongoose from 'mongoose'
import getUserPost from "./routes/getUserRoute.js";
import getPost from "./routes/PostRoute.js";
dotenv.config();
const app =express();

app.use(express.json())
app.use(express.urlencoded({extended :true}))
// app.use(cookieParse())
app.use('/api/users',userRoutes)
app.use('/api/users/get',getUserPost)
app.use('/api/users/post',getPost)

app.use(notFound)
app.use(errorHandler)

app.get('/',(req,res)=> res.send('req send'))
var port = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true ,useUnifiedTopology:true}).then(()=>{
    console.log('db  conected');
}).catch(err=>{
    console.log('something went wrong'+err);
});
app.listen(5000,()=>console.log('server runing on '+ port))