import {Course} from "../../db"
import {Batch} from "../../db"
import { Lecture } from "../../db"
import { Subject } from "../../db"
import { Teacher } from "../../db"
import {Student } from "../../db"
import {StudentBatch} from "../../db"
import Sequelize from 'sequelize'
import express,{Router,Request} from "express"
const route:Router=Router();

route.get('/', (req, res) => {

    Course.findAll()
        .then((courses) => {
            res.send(courses)
        })
        .catch((err) => {
            res.send(err);
        })
})
route.post("/", (req, res) => {
    Course.create({
        name: req.body.name
    })
        .then((course) => {
            res.send(course)
        })
        .catch((err) => {
            res.send("error sendind")
        })
})
route.get('/:id', (req, res) => {
    Course.find({
        where: {
            id: {
                [Sequelize.Op.eq]: req.params.id
            }
        }
    }).then((course) => {
        res.send(course)
    }).catch((err) => {
        res.send("Id invalid")
    })

})
route.delete('/:id', (req, res) => {
    Course.destroy({
        where: {
            id: {
                [Sequelize.Op.eq]: req.params.id
            }
        }
    }).then((course) => {
        res.send("The id " + req.params.id + " has been deleted")
    }).catch((err) => {
        res.send("Id invalid")
    })

})
route.get("/:id/batches",(req,res)=>{
    Course.find({
        where:{
            id:{
                [Sequelize.Op.eq]:req.params.id
            }
        }
    }).then((course)=>{
        Batch.findAll({
            where:{
                courseId:req.params.id
            }
        }).then((batch)=>{
            res.send(batch);
        })
    }).catch((err)=>{
        res.send("Invalid Id")
    })
})
route.get("/:id/batches/:id1",(req,res)=>{
    Course.find({
        where:{
            id:{
                [Sequelize.Op.eq]:req.params.id
            }
        }
    }).then((course)=>{
        Batch.findAll({
            where:{
                courseId:req.params.id,
                id:req.params.id1
            }
        }).then((batch)=>{
            if(batch.length==0)  res.send("Invalid batch id for this course")
           else res.send(batch);
        })
    }).catch((err)=>{
        res.send("Invalid Id")
    })
})
route.get("/:id/batches/:id1/lectures",(req,res)=>{
    Course.find({
        where:{
            id:{
                [Sequelize.Op.eq]:req.params.id
            }
        }
    }).then((course)=>{
        Batch.findAll({
            where:{
                courseId:req.params.id,
                id:req.params.id1
            }
        }).then((batch)=>{
            if(batch.length==0)
                {
                    res.send("Invalid batch id for this course")
                }
            else
                {
                     Lecture.findAll({
                         where:{
                             batchId:req.params.id1
                         }
                     }).then((lectures)=>{
                         if(lectures.length==0)
                            {
                                res.send("no lectures for this batch")
                            }
                        else
                            {
                                 res.send(lectures)
                            }
                        
                     }).catch((err)=>{
                         res.send("No lecture for this batch")
                     })
                }
           
        }).catch((err)=>{
            res.send("Invalid batch id for this course")
        })
    }).catch((err)=>{
        res.send("Invalid Id")
    })
})
route.get("/:id/batches/:id1/lectures/:id2",(req,res)=>{
    Course.find({
        where:{
            id:{
                [Sequelize.Op.eq]:req.params.id
            }
        }
    }).then((course)=>{
        Batch.findAll({
            where:{
                courseId:req.params.id,
                id:req.params.id1
            }
        }).then((batch)=>{
            if(batch.length==0)
                {
                    res.send("Invalid batch id for this course")
                }
            else
                {
                     Lecture.findAll({
                         where:{
                             batchId:req.params.id1,
                             id:req.params.id2
                         }
                     }).then((lectures)=>{
                         if(lectures.length==0)
                            {
                                res.send("no lectures for this batch")
                            }
                        else
                            {
                                 res.send(lectures)
                            }
                        
                     }).catch((err)=>{
                         res.send("Invalid lecture Id")
                     })
                }
           
        }).catch((err)=>{
            res.send("Invalid batch id for this course")
        })
    }).catch((err)=>{
        res.send("Invalid Id")
    })
})

route.get("/:id/batches/:id1/teachers",(req,res)=>{
    
 Lecture.findAll({
     where:{
         batchId:req.params.id1
     },
    include:[{
            model:Teacher,
            as:'teacher'
     }]
 }).then((l:any)=>{
     var tech:object[]=[];
     l.forEach(element=>{
         tech.push(element.teacher)
     });
        res.send(tech);
 }).catch((err)=>{
     res.send("Error")
 })

})
route.get("/:id/batches/:id1/students",(req,res)=>{
   let students:number[]=[];
    StudentBatch.findAll({
        where:{
            batchId:req.params.id1
        }
    }).then((batches:any)=>{
       batches.forEach(element=>{
          students.push(element.studentId)
       })
            Student.findAll({
                where: {
                    id: students
                }
            })
            .then((batches) => {
                res.json(batches);
            })
    }).catch((err)=>{
        res.send("no related students")
    })

})

export=route