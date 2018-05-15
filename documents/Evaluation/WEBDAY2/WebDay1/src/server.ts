import express,{Router,Request} from "express"
import path from 'path'
import session from 'express-session'

const app=express();
import apiRoute from "./routes/api"
const rotespecify=apiRoute;

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use('/',express.static(path.join(__dirname,'..','/public')))

app.use('/api',rotespecify)
app.listen(8080,()=>{
    console.log("server started at http://localhost:8080")
})