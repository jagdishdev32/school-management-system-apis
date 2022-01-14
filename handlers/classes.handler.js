const { checkValidSection, checkValidClass } = require("./inputChecker");
const db = require("../db");
const { getWhereTeacherOrSectionOrClassQuerySnip } = require("../helper");

const getClassesObjFromId = async (class_id) => {
  try {
    const valid = checkId(class_id);

    if (!valid) {
      throw new Error("Id is not valid");
    }

    let query = `select * from classes WHERE id = '${class_id}'`;
    let response = await db.query(query);
    let data = response.rows[0];
    return data;
  } catch (error) {
    return error;
  }
};

const getSectionFromClassId = async (class_id) => {
  try {
    const valid = checkId(class_id);

    if (!valid) {
      throw new Error("Id is not valid");
    }

    let query = `select section from classes WHERE id = '${class_id}'`;
    let response = await db.query(query);
    let data = response.rows[0].section;
    return data;
  } catch (error) {
    return error;
  }
};

const getGradeNoFromClassId = async (class_id) => {
  try {
    const valid = checkId(class_id);

    if (!valid) {
      throw new Error("Id is not valid");
    }

    let query = `select grade_no from classes WHERE id = '${class_id}'`;
    let response = await db.query(query);
    let data = response.rows[0].grade_no;
    return data;
  } catch (error) {
    return error;
  }
};

const getClassIdFromGradeAndSection = async (grade, section) => {
  try {
    const validGrade = checkValidClass(grade);
    const validSection = checkValidSection(section);

    if (!validGrade) {
      throw new Error("Grade No is not valid");
    }

    if (!validSection) {
      throw new Error("Section is not valid");
    }

    let query = `select id from classes WHERE grade_no = '${grade}' AND section = '${section}'`;
    let response = await db.query(query);
    let data = response.rows[0].id;
    return data;
  } catch (error) {
    return error;
  }
};

const getAllClassesWithSubjectsAndTeachers = async (
  c,
  section,
  teacher,
  subject
) => {
  try {
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
    const response = await db.query(query);
    const data = response.rows;
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllClassesWithSubjectsAndTeachers,
  getClassesObjFromId,
  getGradeNoFromClassId,
  getSectionFromClassId,
  getClassIdFromGradeAndSection,
};
