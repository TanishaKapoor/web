import { StudentBatch, Teacher } from "../../db"
import Sequelize from 'sequelize'
import express,{Router,Request} from "express"
const route:Router=Router();

route.get("/",(req,res)=>{
    StudentBatch.findAll()
    .then((carts)=>{
        res.send(carts)
    })
    .catch((err)=>{
        res.send("Error")
    })
    
})
route.post("/",(req,res)=>{
   StudentBatch.create({
       studentId:req.body.sid,
       batchId:req.body.bid
   }).then((student)=>{
       res.send(student);
   }).catch((err)=>{
       res.send(err);
   })
})

export=route