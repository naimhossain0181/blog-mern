import  mongoose from 'mongoose'
import  express from 'express'
import { fileURLToPath } from 'url';
import path  from 'path'
import multer from 'multer'
import cors from 'cors'
import  'dotenv/config'

import userRouter from './routes/auth.js'
import postRouter from './routes/post.js'
import commentRouter from './routes/comment.js'
import categoriesRouter from './routes/category.js'
const app = express()

app.use(cors())
app.use(express.json())



//multer setup
//db connection
mongoose.connect(process.env.DB_URI).then(()=>console.log(`app connected with database`)).catch((error)=>console.log(error.message))

app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/comments",commentRouter)
app.use("/categories",categoriesRouter)
//server render
let port =process.env.PORT || 3000
app.listen(port,(()=>{
    console.log(`server connected port number ${port}`)
}))

//font-end backend run concorrently
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,"./client/dist")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./','client','dist','index.html'))
})