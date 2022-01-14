const router = require("express").Router();

const db = require("../db");

const {
  getOnlyStudentNamesListOfPerticularClassAndSection,
  checkValidClass,
  checkValidSection,
} = require("../handlers");

const {
  getWhereSectionOrClassQuerySnip,
  getWhereTeacherOrSectionOrClassQuerySnip,
  getWhereAllSearchQuerySnip,
  extractSubjectsIdsFromBody,
  extractTeachersIdsFromBody,
} = require("../helper");

// METH     GET /classes
// DESC     Get all classes with subjects and teachers details
//          sorted by class then section
// ACCESS   Public
router.get("/", (req, res) => {
  const section = req.query.section;
  const c = +req.query.class || +req.query.grade;
  const teacher = req.query.teacher;

  let validClass = checkValidClass(c);
  let validSection = checkValidSection(section);

  if (c && !validClass) {
    throw new Error("Class is not valid (class range is 1-10)");
  }
  if (section && !validSection) {
    throw new Error("Section is not valid (sections range is A-D)");
  }

  //   let whereQuery = getWhereSectionOrClassQuerySnip(c, section);
  let whereQuery = getWhereTeacherOrSectionOrClassQuerySnip(
    teacher,
    c,
    section
  );

  let query = `
        SELECT 
            c.grade_no as grade,
            c.section as section,
            -- Subjects
            s1.sub_name as subject_1,
            s2.sub_name as subject_2,
            s3.sub_name as subject_3,
            s4.sub_name as subject_4,
            s5.sub_name as subject_5,
            -- Optional Subjects
            os1.sub_name as optional_subject_1,
            os2.sub_name as optional_subject_2,
            os3.sub_name as optional_subject_3,
            -- Teachers
            t1.teacher_name as sub1_teacher,
            t2.teacher_name as sub2_teacher,
            t3.teacher_name as sub3_teacher,
            t4.teacher_name as sub4_teacher,
            t5.teacher_name as sub5_teacher,
            -- Teachers for Optional Subjects
            ot1.teacher_name as optional_sub1_teacher,
            ot2.teacher_name as optional_sub2_teacher,
            ot3.teacher_name as optional_sub3_teacher
        FROM classes c
        -- Joining tables
        INNER JOIN grades g
            ON c.grade_no = g.grade_no
        -- Subjects Tables 
        INNER JOIN subs s1
            ON g.sub1_id = s1.id
        INNER JOIN subs s2
            ON g.sub2_id = s2.id
        INNER JOIN subs s3
            ON g.sub3_id = s3.id
        INNER JOIN subs s4
            ON g.sub4_id = s4.id
        INNER JOIN subs s5
            ON g.sub5_id = s5.id
        -- Optional Subjects Tables
        INNER JOIN subs os1
            ON g.osub1_id = os1.id
        INNER JOIN subs os2
            ON g.osub2_id = os2.id
        INNER JOIN subs os3
            ON g.osub3_id = os3.id
        -- Teachers Tables 
        INNER JOIN teachers t1
            ON c.sub1_teacher_id = t1.id
        INNER JOIN teachers t2
            ON c.sub2_teacher_id = t2.id
        INNER JOIN teachers t3
            ON c.sub3_teacher_id = t3.id
        INNER JOIN teachers t4
            ON c.sub4_teacher_id = t4.id
        INNER JOIN teachers t5
            ON c.sub5_teacher_id = t5.id
        -- Optional Subjects Tables
        INNER JOIN teachers ot1
            ON c.osub1_teacher_id = ot1.id
        INNER JOIN teachers ot2
            ON c.osub2_teacher_id = ot2.id
        INNER JOIN teachers ot3
            ON c.osub3_teacher_id = ot3.id
        ${whereQuery}
        -- Sorting
        ORDER BY
            c.grade_no,
            c.section
    `;
  db.query(query)
    .then((response) => {
      return res.json({ data: response.rows });
    })
    .catch((error) => {
      return res.status(400).json({ error, message: error.message });
    });
});

// METH     GET /students full
// DESC     Get all classes with students, subjects and teachers
//          sorted by class then section then student name
// ACCESS   Public
router.get("/full", async (req, res) => {
  try {
    const section = req.query.section;
    const c = +req.query.class || +req.query.grade;
    const teacher = req.query.teacher;
    const student = req.query.student;
    const subject = req.query.subject;

    let validClass = checkValidClass(c);
    let validSection = checkValidSection(section);

    if (c && !validClass) {
      throw new Error("Class is not valid (class range is 1-10)");
    }
    if (section && !validSection) {
      throw new Error("Section is not valid (sections range is A-D)");
    }

    let whereQuery = getWhereAllSearchQuerySnip(
      c,
      section,
      subject,
      teacher,
      student
    );

    let query = `
        SELECT 
            c.grade_no as grade,
            c.section as section,
            -- Subjects
            s1.sub_name as subject_1,
            s2.sub_name as subject_2,
            s3.sub_name as subject_3,
            s4.sub_name as subject_4,
            s5.sub_name as subject_5,
            -- Optional Subjects
            os1.sub_name as optional_subject_1,
            os2.sub_name as optional_subject_2,
            os3.sub_name as optional_subject_3,
            -- Teachers
            t1.teacher_name as sub1_teacher,
            t2.teacher_name as sub2_teacher,
            t3.teacher_name as sub3_teacher,
            t4.teacher_name as sub4_teacher,
            t5.teacher_name as sub5_teacher,
            -- Teachers for Optional Subjects
            ot1.teacher_name as optional_sub1_teacher,
            ot2.teacher_name as optional_sub2_teacher,
            ot3.teacher_name as optional_sub3_teacher
        FROM classes c
        -- Joining tables
        INNER JOIN grades g
            ON c.grade_no = g.grade_no
        -- Subjects Tables 
        INNER JOIN subs s1
            ON g.sub1_id = s1.id
        INNER JOIN subs s2
            ON g.sub2_id = s2.id
        INNER JOIN subs s3
            ON g.sub3_id = s3.id
        INNER JOIN subs s4
            ON g.sub4_id = s4.id
        INNER JOIN subs s5
            ON g.sub5_id = s5.id
        -- Optional Subjects Tables
        INNER JOIN subs os1
            ON g.osub1_id = os1.id
        INNER JOIN subs os2
            ON g.osub2_id = os2.id
        INNER JOIN subs os3
            ON g.osub3_id = os3.id
        -- Teachers Tables 
        INNER JOIN teachers t1
            ON c.sub1_teacher_id = t1.id
        INNER JOIN teachers t2
            ON c.sub2_teacher_id = t2.id
        INNER JOIN teachers t3
            ON c.sub3_teacher_id = t3.id
        INNER JOIN teachers t4
            ON c.sub4_teacher_id = t4.id
        INNER JOIN teachers t5
            ON c.sub5_teacher_id = t5.id
        -- Optional Subjects Tables
        INNER JOIN teachers ot1
            ON c.osub1_teacher_id = ot1.id
        INNER JOIN teachers ot2
            ON c.osub2_teacher_id = ot2.id
        INNER JOIN teachers ot3
            ON c.osub3_teacher_id = ot3.id
        INNER JOIN students s
            ON s.class_id = c.id
        ${whereQuery}
        -- Sorting
        ORDER BY
            c.grade_no,
            c.section
    `;

    const response = await db.query(query);

    let data = response.rows;

    for (let i = 0; i < data.length; i++) {
      const currClass = data[i].grade;
      const currSection = data[i].section;

      const currStudentsList =
        await getOnlyStudentNamesListOfPerticularClassAndSection(
          currClass,
          currSection
        );

      //   const currStudentsList = await getAllStudentsOfPerticularClassAndSection(
      //     currClass,
      //     currSection
      //   );

      //   Adding names of all the student in perticular class
      data[i].students = currStudentsList;
    }
    return res.json({ data });
  } catch (error) {
    return res.status(400).json({ error, message: error.message });
  }
});

// METH     POST /classes
// DESC     Create new class
// ACCESS   Public
router.post("/", async (req, res) => {
  try {
    //   body = {grade_no, section, subject1, subject2, ..., optional_subject1, ...,  optional_subject3
    //              subject1_teacher, ..., subject5_teacher, optional_subject1_teacher, ..., optional_subject3_teacher }
    const clss = await createClass({ ...req.body });
    return res.status(201).json({ message: "class created", clss });
  } catch (error) {
    return res.status(400).json({ error, message: error.message });
  }
});

module.exports = router;
