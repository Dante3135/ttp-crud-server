var express = require("express");
var router = express.Router();
const { Student } = require("../database/models");

/* GET all students. */
// /api/students
router.get("/", async (req, res, next) => {
  // try to get students object from database
  try {
    // students will be the result of the Campus.findAll promise
    const students = await Student.findAll();
    // if students is valid, it will be sent as a json response
    console.log(students);
    res.status(200).json(students);
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { campusId } = req.body;
  const updatedObj = { campusId: campusId };
  try {
    const student = await Student.findByPk(id);
    await student.set(updatedObj);
    const updatedStudent = await student.save();
    res.status(201).send(updatedStudent);
  } catch (err) {
    next(err);
  }
});

// // Route to handle adding a Student
// // /api/students/
// router.post("/", async (req, res, next) => {
//   // Take the form data from the request body
//   const { firstName, lastName, email, imageUrl, gpa } = req.body;
//   // Create a Student object
//   const studentObj = {
//     firstName: firstName,
//     lastName: lastName,
//     imageUrl: imageUrl,
//     email: email,
//     gpa: gpa,
//   };
//   try {
//     // Create a new Student on the database
//     const newStudent = await Student.create(StudentObj);
//     // The database would return a Student
//     // send that Student as a json to the client
//     res.status(201).send(newStudent);
//   } catch (err) {
//     next(err);
//   }
// });



router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  // get an id for a Student to delete
  try {
    // pass the id to the database to find Student to be deleted
    // database would either respond succcess or fail
    const student = await Student.findByPk(id);
    // invoke the .destroy() method on the returned Student
    await student.destroy();
    // send a success message to the client
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
