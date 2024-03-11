import express from 'express'
import data from '../data/student-info.json' assert {type: 'json'}

export const students = express.Router()

function appendLocationInfoText(request, responseMessage){
    const userIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    const userDevice = request.header('User-Agent');
    return responseMessage + `\nuser ip: ${userIp}\nuser device: ${userDevice}`
}

function appendLocationInfoJSON(request, responseMessage){
    const userIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    const userDevice = request.header('User-Agent');
    responseMessage["user-ip"] = userIp
    responseMessage["device-type"] = userDevice
    return responseMessage
}

//GET all students info
students.get('/', (req, res) => {
    res.json(appendLocationInfoJSON(req, {"student-info":data}))
})
//POST to retrieve student info based on studentid
//sample payload: {"studentid":"19938"}
students.post('/student-info', (req, res) => {
    console.log(req.body)
    const { studentid } = req.body
    if (studentid === undefined) {
        res.send(appendLocationInfoText(req,'Invalid param'))
    }
    else {
        let student = data.find(s => s.student_id === studentid)
        if (student){
            // res.json(student)
            res.json(appendLocationInfoJSON(req,student))
        }
        else
            res.send(appendLocationInfoText(req,'Cannot find the student'))
    }
})
//POST to retrieve student's info who take a particular course
//sample payload: {"course":"CS548"}
students.post('/students-by-course', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userDevice = req.header('User-Agent');
    console.log(req.body)
    const { course } = req.body
    let result = data.filter(s =>
        s.courses.some((val, index, array) =>
            val.course_id === course))
        .map(s => s.student_id)

    if (result.length > 0){
        res.json(appendLocationInfoJSON(req,{ "student-id": result }))
    }
    else
        res.send(appendLocationInfoText(req,`There is no student taking course ${course}`))
})
//POST to retrieve students who take the same courses as the specified student
//example {"studentid":"19938"}
students.post('/students-same-courses', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userDevice = req.header('User-Agent');
    console.log(req.body)
    const { studentid } = req.body
    let courses = data.find(s => s.student_id === studentid)?.courses
    if(courses===undefined){
        res.send(appendLocationInfoText(req, `Cannot find student ${studentid}`))
        return
    }
    let result = { "student-id": studentid, courses: [] }
    courses.forEach((course) => {
        let item = {
            "course_id": course.course_id,
            "course_name": course.course_name,
            "classmates": []
        }
        item.classmates = data.filter(s => s.courses.some(c => c.course_id === course.course_id)).map(s => s.student_id)
        result.courses.push(item)
    })

    res.json(appendLocationInfoJSON(req,result))
})