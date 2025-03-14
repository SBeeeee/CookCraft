import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import  cookieParser from "cookie-parser";
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js"
import recepierouter from "./routes/recipe.js"
import cors from  "cors";

const app=express()  

dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))

app.use("/",userRouter);
app.use("/recipe",recepierouter);

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server listen at port ${PORT}`);
})