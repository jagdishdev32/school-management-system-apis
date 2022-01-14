const { checkId } = require("./inputChecker");

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

const getSubjectIdFromSubjectName = async (subject_name) => {
  try {
    //   TODO add name validator
    // const valid = checkName(subject_name);

    // if (!valid) {
    //   throw new Error("Id is not valid");
    // }

    let query = `select id from subs WHERE lower(sub_name) = lower('${subject_name}')`;
    let response = await db.query(query);
    let data = response.rows[0].id;
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getSubjectNameFromId,
  getSubjectIdFromSubjectName,
};
