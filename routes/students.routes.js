const router = require("express").Router();
const db = require("../db");

// METH     GET /students
// DESC     Get all students with class and section details
//          sorted by class then section then name
// ACCESS   Public
router.get("/", (req, res) => {
  query = `
        SELECT 
          -- Student Detiails
          c.grade_id as grade,
          c.section as section,
          s.student_name as name
        FROM students s
        -- Joining tables
        INNER JOIN classes c
          ON s.class_id = c.id
        INNER JOIN grades g
          ON c.grade_id = g.id
        -- Sorting
        ORDER BY
            c.grade_id,
            c.section,
            s.student_name
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
// DESC     Get all students with class and subjects
//          sorted by class then section then name
// ACCESS   Public
router.get("/full", (req, res) => {
  query = `
        SELECT 
            -- Student Detiails
            s.student_name as name,
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
            os2.sub_name as optional_subject_2
        FROM students s
        -- Joining tables
        INNER JOIN classes c
            ON s.class_id = c.id
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
        -- Sorting
        ORDER BY
            c.grade_id,
            c.section,
            s.student_name
    `;
  db.query(query)
    .then((response) => {
      let data = response.rows;
      console.log(data[98]);
      return res.json({ data });
    })
    .catch((error) => {
      return res.json({ error, message: error.message });
    });
  //   return res.json({ message: "students here" });
});

module.exports = router;
