import {Lecture} from "../../db"
import {Batch} from "../../db"
import{ StudentBatch} from "../../db"
import Sequelize from 'sequelize'
import express,{Router,Request} from "express"
const route:Router=Router();

route.get("/",(req,res)=>{
    Lecture.findAll()
    .then((lecture)=>{
        res.send(lecture)
    }).catch((err)=>{
        res.send(err)
    })
})
route.post("/",(req,res)=>{
    Lecture.create({
        name:req.body.name,
        batchId:req.body.bid,
        teacherId:req.body.tid
    }).then((lecture)=>{
        res.send(lecture)
    }).catch((err)=>{
        res.send("error creating lectures");
    })
})

export=route