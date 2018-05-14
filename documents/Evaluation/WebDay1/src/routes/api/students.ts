import { Student } from "../../db"
import { StudentBatch, Batch} from "../../db"
import Sequelize from 'sequelize'
import express,{Router,Request} from "express"
const route:Router=Router();


route.get("/",(req,res)=>{
    Student.findAll()
    .then((students)=>{
        res.send(students)
    }).catch((err)=>{
        res.send("error")
    })
})
route.post("/",(req,res)=>{

    Student.create({
        name:req.body.name
    }).then((students)=>{
        res.send(students)
    }).catch((err)=>{
        res.send("error creating students")
    })
})

route.delete('/:id',(req,res)=>{
    Student.destroy({
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
route.get('/:id', (req, res) => {
    Student.find({
        where: {
            id: {
                [Sequelize.Op.eq]: req.params.id
            }
        }
    }).then((student) => {
        res.send(student)
    }).catch((err) => {
        res.send("Id invalid")
    })
})
route.get('/:id/batches',(req,res)=>{
    let  ids: number[] = [];
    StudentBatch.findAll({
        where: {
            studentId: req.params.id
        }
    })
        .then((studentBatches: any) => {
            studentBatches.forEach(element  =>  {
                ids.push(element.batchId)
            });
            Batch.findAll({
                where: {
                    id: ids
                }
            })
                .then((batches) => {
                    res.json(batches);
                })
        })
}) 
export=route