import express,{Router,Request} from "express";
const route:Router=Router();

import courseRoute from "./courses"
import batchRoute from "./batches"
import teacherRoute from "./teachers"
import studentRoute from "./students"
import lectureRoute from "./lectures"
import subjectRoute from "./subjects"


route.use("/courses",courseRoute)
route.use("/batches",batchRoute)
route.use("/teachers",teacherRoute)
route.use("/students",studentRoute)
route.use("/lectures",lectureRoute)
route.use("/subjects",subjectRoute)




export=route