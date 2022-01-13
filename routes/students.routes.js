const router = require("express").Router();
const db = require("../db");
const { checkValidClass, checkValidSection } = require("../handlers");
const { getWhereSectionOrClassQuerySnip } = require("../helper");

// METH     GET /students
// DESC     Get all students with class and section details
//          sorted by class then section then name
// ACCESS   Public
router.get("/", async (req, res) => {
  try {
    const section = req.query.section;
    const c = +req.query.class;

    let validClass = checkValidClass(c);
    let validSection = checkValidSection(section);

    if (c && !validClass) {
      throw new Error("Class is not valid (class range is 1-10)");
    }
    if (section && !validSection) {
      throw new Error("Section is not valid (sections range is A-D)");
    }

    let whereQuery = getWhereSectionOrClassQuerySnip(c, section);

    // if (section && c) {
    //   whereQuery = `
    //     WHERE
    //       c.section = '${section}' AND
    //       c.grade_no = '${c}'
    //       `;
    // } else if (section || c) {
    //   whereQuery = `
    //     WHERE
    //       ${section ? "c.section = '" + section + "'" : ""}
    //       ${c ? "c.grade_no = '" + c + "'" : ""}
    //       `;
    // } else {
    //   whereQuery = "";
    // }

    let query = `
        SELECT 
          -- Student Detiails
          c.grade_no as grade,
          c.section as section,
          s.student_name as name
        FROM students s
        -- Joining tables
        INNER JOIN classes c
          ON s.class_id = c.id
        INNER JOIN grades g
          ON c.grade_no = g.grade_no
        -- Condition query
        ${whereQuery}
        -- Sorting
        ORDER BY
            c.grade_no,
            c.section,
            s.student_name
    `;

    const response = await db.query(query);
    const data = response.rows;

    return res.json({ data });
  } catch (error) {
    return res.json({ error, message: error.message });
  }
});

// METH     GET /students full
// DESC     Get all students with class and subjects
//          sorted by class then section then name
// ACCESS   Public
router.get("/full", async (req, res) => {
  try {
    const section = req.query.section;
    const c = +req.query.class;

    let validClass = checkValidClass(c);
    let validSection = checkValidSection(section);

    if (c && !validClass) {
      throw new Error("Class is not valid (class range is 1-10)");
    }
    if (section && !validSection) {
      throw new Error("Section is not valid (sections range is A-D)");
    }

    let whereQuery = getWhereSectionOrClassQuerySnip(c, section);

    let query = `
        SELECT 
            -- Student Detiails
            s.student_name as name,
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
            os2.sub_name as optional_subject_2
        FROM students s
        -- Joining tables
        INNER JOIN classes c
            ON s.class_id = c.id
        INNER JOIN grades g
            ON c.grade_no = g.grade_no
        -- Subjects Tables (No need for all subjects but still showing them)
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
        ${whereQuery}
        -- Sorting
        ORDER BY
            c.grade_no,
            c.section,
            s.student_name
    `;

    const response = await db.query(query);
    const data = response.rows;

    return res.json({ data });
  } catch (error) {
    return res.json({ error, message: error.message });
  }
});

module.exports = router;
