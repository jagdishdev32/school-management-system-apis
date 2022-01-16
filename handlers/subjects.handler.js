const { checkId, checkValidName } = require("./inputChecker");

const db = require("../db");

const getSubjectNameFromId = async (subject_id) => {
  try {
    const valid = checkId(subject_id);

    if (!valid) {
      throw new Error("Id is not valid");
    }

    let query = `select sub_name from subs WHERE id = '${subject_id}'`;
    let response = await db.query(query);
    let data = response.rows[0].sub_name;
    return data;
  } catch (error) {
    return error;
  }
};

const getSubjectObjFromSubjectName = async (subject_name) => {
  try {
    const valid = checkValidName(subject_name);

    if (!valid) {
      throw new Error("Subject Name is not valid");
    }

    let query = `select * from subs WHERE lower(sub_name) = lower('${subject_name}')`;
    let response = await db.query(query);
    let data = response.rows[0];
    return data;
  } catch (error) {
    return error;
  }
};

const getSubjectIdFromSubjectName = async (subject_name) => {
  try {
    const isId = checkId(subject_name);
    if (isId) {
      return subject_name;
    }

    const valid = checkValidName(subject_name);

    if (!valid) {
      throw new Error("Subject Name is not valid");
    }

    let query = `select id from subs WHERE lower(sub_name) = lower('${subject_name}')`;
    let response = await db.query(query);
    let data = response.rows[0].id;
    return data;
  } catch (error) {
    return error;
  }
};

const createSubject = async (subject_name) => {
  try {
    let query = `INSERT INTO subs (sub_name) VALUES ('${subject_name}') RETURNING *`;
    let response = await db.query(query);
    let data = response.rows[0];
    return data;
  } catch (error) {
    throw error;
  }
};

const updateSubject = async (id, subject_name) => {
  try {
    let query = `UPDATE subs set subs_name = '${subject_name}' WHERE id = '${id}' RETURNING *`;
    let response = await db.query(query);
    let data = response.rows[0];
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteSubjectWithName = async (subject_name) => {
  try {
    let query = `DELETE FROM subs WHERE sub_name = '${subject_name}' RETURNING *`;
    let response = await db.query(query);
    const data = response.rows[0];
    return data;
    return;
  } catch (error) {
    throw error;
  }
};

const deleteSubjectWithId = async (id) => {
  try {
    let query = `DELETE FROM subs WHERE id = '${id}' RETURNING *`;
    let response = await db.query(query);
    const data = response.rows[0];
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSubjectNameFromId,
  getSubjectIdFromSubjectName,
  getSubjectObjFromSubjectName,
  createSubject,
  updateSubject,
  deleteSubjectWithId,
  deleteSubjectWithName,
};
