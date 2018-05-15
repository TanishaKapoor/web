import {Subject} from "../../db"
import { Course, Teacher } from "../../db"
import Sequelize from 'sequelize'
import express,{Router,Request} from "express"
const route:Router=Router();

route.get("/",(req,res)=>{

    Subject.findAll()
    .then((subject)=>{
        res.send(subject);
    })
    .catch((err)=>{
        res.send('error')
    })
 })
route.post("/",(req,res)=>{
    Subject.create({
        name:req.body.name,
        courseId:req.body.id
    })
    .then((subjects)=>{
        res.send(subjects)
    })
    .catch((err)=>{
        res.send(err);
    })
})
route.get('/:id',(req,res)=>{
    Subject.find({
        where:{
            id:{
                [Sequelize.Op.eq]:req.params.id
            }
        }
    }).then((subject)=>{
        res.send(subject)
    }).catch((err)=>{
        res.send("Id invalid")
    })
})

route.delete('/:id',(req,res)=>{
    Subject.destroy({
        where:{
            id:{
                [Sequelize.Op.eq]:req.params.id
            }
        }
    }).then((course)=>{
        res.send("The id "+req.params.id+" has been deleted")
    }).catch((err)=>{
        res.send("Id invalid")
    })
    
})
route.get("/:id/teachers",(req,res)=>{
    Subject.find({
        where:{
            id:{
                [Sequelize.Op.eq]:req.params.id
            }
        }
    }).then((course)=>{
        Teacher.findAll({
            where:{
                subjectId:req.params.id
            }
        }).then((teachers)=>{
            res.send(teachers);
        }).catch((err)=>{
            res.send("No batches for this course")
        })
    }).catch((err)=>{
        res.send("Invalid Id")
    })
})

export=route