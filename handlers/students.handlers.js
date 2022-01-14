const {
  checkId,
  checkValidClass,
  checkValidSection,
  checkValidName,
} = require("./inputChecker");

const db = require("../db");

const { getSubjectIdFromSubjectName } = require("./subjects.handler");

const { getClassIdFromGradeAndSection } = require("./classes.handler");

const { checkGradeSupportOptionalSubjects } = require("./grades.handlers");

const getAllStudents = async () => {
  try {
    let query = `select * from students ORDER BY student_name`;
    let response = await db.query(query);
    let data = response.rows;
    return data;
  } catch (error) {
    return error;
  }
};

const deleteStudentWithId = async (id) => {
  try {
    let query = `DELETE FROM students WHERE id = '${id}' RETURNING *`;
    let response = await db.query(query);
    const data = response.rows;
    return data;
  } catch (error) {
    throw error;
  }
};

const getStudentObjFromId = async (student_id) => {
  try {
    const valid = checkId(student_id);

    if (!valid) {
      throw new Error("Id is not valid");
    }

    let query = `select * from students WHERE id = '${student_id}'`;
    let response = await db.query(query);
    let data = response.rows[0];
    return data;
  } catch (error) {
    return error;
  }
};

const getStudentIdFromStudentNameAndClassId = async (
  student_name,
  class_id
) => {
  try {
    const validStudentName = checkValidName(student_name);
    const validClassId = checkValidClass(class_id);

    if (!validStudentName) {
      throw new Error("Student Name is not valid");
    }

    if (!validClassId) {
      throw new Error("Student Id is not valid");
    }

    let query = `select id from students WHERE lower(student_name) = lower('${student_name}') AND class_id = '${class_id}'`;
    let response = await db.query(query);
    let data = response.rows[0].id;
    return data;
  } catch (error) {
    return error;
  }
};

const getStudentNameFromId = async (student_id) => {
  try {
    const valid = checkId(student_id);

    if (!valid) {
      throw new Error("Id is not valid");
    }

    let query = `select student_name from students WHERE id = '${student_id}'`;
    let response = await db.query(query);
    let data = response.rows[0].student_name;
    return data;
  } catch (error) {
    return error;
  }
};

const getAllStudentsOfPerticularClass = async (c) => {
  try {
    let valid = checkValidClass(c);

    if (valid) {
      let query = `
                SELECT 
                    s.*
                FROM students 
                INNER JOIN classes c
                    ON c.grade_no = ${c}
                ORDER BY
                    c.section
                    s.student_name
            `;
      let response = await db.query(query);
      let data = response.rows;
      return data;
    } else {
      throw new Error("Not valid class");
    }
  } catch (error) {
    return error;
  }
};

const getAllStudentsOfPerticularClassAndSection = async (c, section) => {
  try {
    let validClass = checkValidClass(c);
    let validSection = checkValidSection(section);

    if (validClass && validSection) {
      // console.log(section, c);
      let query = `
                SELECT 
                    s.student_name,
                    s.id as student_id,
                    c.*
                FROM students s
                INNER JOIN classes c
                    ON s.class_id = c.id
                WHERE
                    c.grade_no = '${c}' AND
                    c.section = '${section}'
                ORDER BY
                    c.section,
                    s.student_name
            `;
      let response = await db.query(query);
      let data = response.rows;
      return data;
    } else {
      throw new Error("Not valid class or section");
    }
  } catch (error) {
    throw error;
  }
};

const extractNameFromStudentObj = (studentObj) => {
  return studentObj.student_name;
};

const convertListOfStudentObjsIntoListOfStudentName = (studentObjsList) => {
  let students_names_list = [];
  for (let i = 0; i < studentObjsList.length; i++) {
    const name = extractNameFromStudentObj(studentObjsList[i]);
    students_names_list.push(name);
  }
  return students_names_list;
};

const getOnlyStudentNamesListOfPerticularClassAndSection = async (
  c,
  section
) => {
  try {
    const studentObjs = await getAllStudentsOfPerticularClassAndSection(
      c,
      section
    );
    const studentNamesList =
      convertListOfStudentObjsIntoListOfStudentName(studentObjs);
    return studentNamesList;
  } catch (error) {
    throw error;
  }
};

const createStudent = async (student_name, grade_no, section, osub1, osub2) => {
  try {
    const validGrade = checkValidClass(grade_no);
    const validSection = checkValidSection(section);

    if (!validGrade)
      throw new Error("Class is not valid (class range is 1-10)");
    if (!validSection)
      throw new Error("Section is not valid (sections range is A-D)");

    let osub1_id = await getSubjectIdFromSubjectName(osub1);
    let osub2_id = await getSubjectIdFromSubjectName(osub2);
    // console.log(osub2_id, osub1_id);

    // TODO fix subjects wrong name error

    if (!osub1_id || !osub2_id) {
      throw new Error("Invalid Optional Subjects");
    }

    // // TODO add subject check for perticular class while adding new stud
    const validOptionalSubjects = await checkGradeSupportOptionalSubjects(
      grade_no,
      osub1_id,
      osub2_id
    );

    if (!validOptionalSubjects) {
      throw new Error("Invalid Optional Subjects");
    }

    const classId = await getClassIdFromGradeAndSection(grade_no, section);

    let query = `INSERT INTO students (student_name, class_id, osub1_id, osub2_id) VALUES ($1, $2, $3, $4) RETURNING *`;
    let values = [student_name, classId, osub1_id, osub2_id];

    const response = await db.query(query, values);
    const data = response.rows[0];
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllStudents,
  getAllStudentsOfPerticularClass,
  getAllStudentsOfPerticularClassAndSection,
  getOnlyStudentNamesListOfPerticularClassAndSection,
  getStudentNameFromId,
  getStudentObjFromId,
  getStudentIdFromStudentNameAndClassId,
  createStudent,
  deleteStudentWithId,
};
