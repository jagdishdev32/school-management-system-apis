const {
  extractSubjectsIdsFromSubjectsList,
} = require("../helper/extractors.helpers");

const db = require("../db");

const createGrade = async (
  grade_no,
  sub1,
  sub2,
  sub3,
  sub4,
  sub5,
  osub1,
  osub2,
  osub3
) => {
  try {
    let subs = [sub1, sub2, sub3, sub4, sub5, osub1, osub2, osub3];

    const subsIds = await extractSubjectsIdsFromSubjectsList(subs);

    let query = `INSERT INTO grades (grade_no, sub1_id, sub2_id, sub3_id, sub4_id, sub5_id, osub1_is, osub2_id, osub3_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    let values = [
      grade_no,
      subsIds[0],
      subsIds[1],
      subsIds[2],
      subsIds[3],
      subsIds[4],
      subsIds[5],
      subsIds[6],
    ];

    const data = await db.query(query, values);

    const grade = data.rows[0];

    return grade;
  } catch (error) {
    throw error;
  }
};

const deleteGrade = async (grade_no) => {
  try {
    let query = `DELETE FROM grades WHERE grade_no = '${grade_no}' RETURNING *`;
    let response = await db.query(query);
    const data = response.rows[0];
    return data;
  } catch (error) {
    throw error;
  }
};

// TODO add update grade function
// TODO add get grade by grade_no
const checkGradeSupportOptionalSubject = async (grade_no, os_id) => {
  try {
    let query = `SELECT * FROM grades where grade_no = '${grade_no}' AND (osub1_id = '${os_id}' OR osub2_id = '${os_id}' )`;

    const response = await db.query(query);

    const data = response.rows;

    if (data.length == 0) return false;

    return data[0].grade_no == grade_no;
  } catch (error) {
    throw error;
  }
};

const checkGradeSupportOptionalSubjects = async (grade_no, os1_id, os2_id) => {
  // If both are same subjects
  if (os1_id == os2_id) return false;

  // TODO complete this function
  let validOs1 = await checkGradeSupportOptionalSubject(grade_no, os1_id);
  let validOs2 = await checkGradeSupportOptionalSubject(grade_no, os2_id);

  if (validOs1 && validOs2) {
    return true;
  }
  return false;
};

module.exports = {
  createGrade,
  deleteGrade,
  checkGradeSupportOptionalSubject,
  checkGradeSupportOptionalSubjects,
};
