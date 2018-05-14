import Sequelize from 'sequelize'
const db= new Sequelize("schooldb","schooluser","schoolpass",{
    dialect:'sqlite',
    storage:'./schooldb'
})
const Course=db.define('courses',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
const Batch=db.define('batches',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
const Teacher = db.define("teachers",{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

const Student = db.define("students",{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
const Lecture=db.define("lectures",{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
const Subject = db.define("subjects",{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
const StudentBatch=db.define("studentbatch",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
})
Teacher.belongsTo(Subject)
Batch.belongsTo(Course)
Lecture.belongsTo(Batch)
Lecture.belongsTo(Teacher)
Subject.belongsTo(Course)
Student.belongsToMany(Batch,{through:StudentBatch})
Batch.belongsToMany(Student,{through:StudentBatch})

db.sync()
.then(()=>console.log("database has been synced"))
.catch((err)=>console.log("Error creating database"))

export{
    Course,
    Batch,
    Teacher,
    Student,
    Lecture,
    Subject,
    StudentBatch
}