const {
  getAllTeachersName,
  getAllTeachers,
  checkValidSection,
  checkValidClass,
  getAllClassesWithSubjectsAndTeachers,
  convertClassesObjsIntoTeachersWithSubsObjs,
  createTeacher,
  deleteTeacherWithName,
  deleteTeacherWithId,
} = require("../handlers");

const db = require("../db");
const {
  getWhereTeacherOrSectionOrClassQuerySnip,
  getWhereAllSearchQuerySnip,
  getWhereSectionOrClassQuerySnip,
} = require("../helper");

const router = require("express").Router();

// METH     GET /teachers
// DESC     Get all teachers names
// ACCESS   Public
router.get("/", async (req, res) => {
  try {
    const teachers = await getAllTeachers();

    return res.json({ teachers });
  } catch (error) {
    return res.status(400).json({ error, message: error.message });
  }
});

// METH     GET /teachers
// DESC     Get all subjects tought by given teacher
// ACCESS   Public
router.get("/full", async (req, res) => {
  try {
    const section = req.query.section;
    const c = +req.query.class || +req.query.grade;
    const teacher = req.query.teacher;
    const subject = req.query.subject;

    let validClass = checkValidClass(c);
    let validSection = checkValidSection(section);

    if (c && !validClass) {
      throw new Error("Class is not valid (class range is 1-10)");
    }
    if (section && !validSection) {
      throw new Error("Section is not valid (sections range is A-D)");
    }

    // const response = await db.query(query);
    const classesWithSubjectsAndTeachersObjs =
      await getAllClassesWithSubjectsAndTeachers(c, section, teacher, subject);

    const teachersObjs = convertClassesObjsIntoTeachersWithSubsObjs(
      classesWithSubjectsAndTeachersObjs,
      teacher
    );

    const response = await createTeacher("hello world");
    console.log(response);

    return res.json({ teachersObjs });
  } catch (error) {
    return res.status(400).json({ error, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const teacher_name = req.body.teacher_name;
    const teacherObj = await createTeacher(teacher_name);

    return res.status(201).json({ message: "Teacher Added", teacherObj });
  } catch (error) {
    return res.status(400).json({ error, message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const teacher_name = req.body.teacher_name;
    const teacherObj = await updateTeacherName(id, teacher_name);

    return res.status(200).json({ message: "Teacher Updated", teacherObj });
  } catch (error) {
    return res.status(400).json({ error, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const teacherObj = await deleteTeacherWithId(id);

    if (teacherObj.length < 1) {
      throw new Error("Invalid Teacher ID");
    }

    return res.status(201).json({ message: "Teacher Deleted", teacherObj });
  } catch (error) {
    return res.status(400).json({ error, message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const teacher_name = req.body.teacher_name;
    const teacherObj = await deleteTeacherWithName(teacher_name);

    if (teacherObj.length < 1) {
      throw new Error("Invalid Teacher Name");
    }

    return res.status(201).json({ message: "Teacher Deleted", teacherObj });
  } catch (error) {
    return res.status(400).json({ error, message: error.message });
  }
});

module.exports = router;
