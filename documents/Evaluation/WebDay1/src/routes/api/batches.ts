import {Batch} from "../../db"
import {Lecture} from "../../db"
import Sequelize from 'sequelize'
import express,{Router,Request} from "express"
const route:Router=Router();

route.get("/",(req,res)=>{
    Batch.findAll()
    .then((carts)=>{
        res.send(carts)
    })
    .catch((err)=>{
        res.send("Error")
    })
    
    
})
route.post("/",(req,res)=>{
    Batch.create({
        name:req.body.name,
        courseId:req.body.id
    }).then((batch)=>{
        res.send(batch)
    }).catch((err)=>{
        res.send("Error creating batches ")
    })
})

export=route