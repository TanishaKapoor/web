import { Teacher, Batch,Subject ,Lecture} from "../../db"
import Sequelize from 'sequelize'
import express,{Router,Request} from "express"
const route:Router=Router();

route.get("/",(req,res)=>{
    Teacher.findAll()
    .then((teachers)=>{
        res.send(teachers)
    }).catch((err)=>{
        res.send("error")
    })
   
})
route.post("/",(req,res)=>{
    Teacher.create({
        name:req.body.name,
        subjectId:req.body.subjectId
    }).then((teachers)=>{
        res.send(teachers)
    })
})
route.get('/:id',(req,res)=>{
    Teacher.find({
        where:{
            id:{
                [Sequelize.Op.eq]:req.params.id
            }
        }
    }).then((teacher)=>{
        res.send(teacher)
    }).catch((err)=>{
        res.send("Id invalid")
    })
})
route.delete('/:id',(req,res)=>{
    Teacher.destroy({
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
route.get("/:id/batches",(req,res)=>{
    Teacher.find({
        where:{
            id:{
                [Sequelize.Op.eq]:req.params.id
            }
        }
    }).then((teache:any)=>{
        Subject.find({
            where:{
                id:teache.subjectId
            }
        }).then((subject:any)=>{
            if(subject.length==0)
                res.send("no related data");
            Batch.findAll({
                where:{
                    courseId:subject.courseId
                }
            }).then((batch)=>{
                res.send(batch);
            })
        })
    }).catch((err)=>{
        res.send("Invalid Id")
    })  
})

route.get("/")
export=route