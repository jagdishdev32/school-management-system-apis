const {
  checkId,
  checkValidClass,
  checkValidSection,
} = require("./inputChecker");

const db = require("../db");

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

const getAllStudentsOfPerticularSubjectAndSection = async () => {};

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

module.exports = {
  getAllStudents,
  getAllStudentsOfPerticularClass,
  getAllStudentsOfPerticularClassAndSection,
  getOnlyStudentNamesListOfPerticularClassAndSection,
};
