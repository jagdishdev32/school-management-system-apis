const router = require("express").Router();
const db = require("../db");

// METH     GET /classes
// DESC     Get all classes with subjects and teachers details
//          sorted by class then section
// ACCESS   Public
router.get("/", (req, res) => {
  query = `
        SELECT 
            c.grade_id as grade,
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
            ON c.grade_id = g.id
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
        -- Sorting
        ORDER BY
            c.grade_id,
            c.section
    `;
  db.query(query)
    .then((response) => {
      return res.json({ data: response.rows });
    })
    .catch((error) => {
      return res.json({ error, message: error.message });
    });
});

// METH     GET /students full
// DESC     Get all classes with students, subjects and teachers
//          sorted by class then section then student name
// ACCESS   Public
router.get("/full", (req, res) => {
  query = `
        SELECT 
            c.grade_id as grade,
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
            ON c.grade_id = g.id
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
        -- Sorting
        ORDER BY
            c.grade_id,
            c.section,
            s.student_name

    `;
  db.query(query)
    .then((response) => {
      let data = response.rows;
      //   TODO add students for each class
      //   console.log(data[98]);
      return res.json({ data });
    })
    .catch((error) => {
      return res.json({ error, message: error.message });
    });
  //   return res.json({ message: "students here" });
});

module.exports = router;
