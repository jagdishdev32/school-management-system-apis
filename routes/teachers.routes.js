const {
  getAllTeachersName,
  getAllTeachers,
  checkValidSection,
  checkValidClass,
  getAllClassesWithSubjectsAndTeachers,
  convertClassesObjsIntoTeachersWithSubsObjs,
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
    const teachers = await getAllTeachersName();

    return res.json({ teachers });
  } catch (error) {
    return res.json({ error, message: error.message });
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

    return res.json({ teachersObjs });
  } catch (error) {
    return res.json({ error, message: error.message });
  }
});

module.exports = router;
