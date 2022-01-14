const { name_fixer } = require("./other");
const db = require("../db");
const { checkId } = require("./inputChecker");

const getAllTeachers = async () => {
  try {
    let query = `SELECT * FROM teachers ORDER BY teacher_name`;
    let response = await db.query(query);
    let data = response.rows;
    return data;
  } catch (error) {
    return error;
  }
};

const getTeacherObjFromId = async (teacher_id) => {
  try {
    const valid = checkId(teacher_id);

    if (!valid) {
      throw new Error("Id is not valid");
    }

    let query = `select * from teachers WHERE id = '${teacher_id}'`;
    let response = await db.query(query);
    let data = response.rows[0];
    return data;
  } catch (error) {
    return error;
  }
};

const getTeacherNameFromId = async (teacher_id) => {
  try {
    const valid = checkId(teacher_id);

    if (!valid) {
      throw new Error("Id is not valid");
    }

    let query = `select teacher_name from teachers WHERE id = '${teacher_id}'`;
    let response = await db.query(query);
    let data = response.rows[0].teacher_name;
    return data;
  } catch (error) {
    return error;
  }
};

const getTeacherIdFromTeacherName = async (teacher_name) => {
  try {
    // TODO add name validator
    // const valid = checkName(teacher_id);

    // if (!valid) {
    //   throw new Error("teacher_name is not valid");
    // }

    let query = `select id from teachers WHERE lower(teacher_name) = lower('${teacher_id})'`;
    let response = await db.query(query);
    let data = response.rows[0].id;
    return data;
  } catch (error) {
    return error;
  }
};

const getTeacherNameFromTeacherObj = (teacherObj) => {
  const teacher_name = teacherObj.teacher_name;
  return teacher_name;
};

const getTeachersNameListFromTeachersObjs = (teachersObjs) => {
  let teacherNamesList = [];
  for (let i = 0; i < teachersObjs.length; i++) {
    const name = getTeacherNameFromTeacherObj(teachersObjs[i]);
    teacherNamesList.push(name);
  }
  return teacherNamesList;
};

const getAllTeachersName = async () => {
  const teacherObjs = await getAllTeachers();
  const teachersNames = getTeachersNameListFromTeachersObjs(teacherObjs);
  return teachersNames;
};

const checkInList = (lst = [], x) => {
  if (lst.includes(x)) {
    return true;
  }
  return false;
};

const checkInString = (string, x) => {
  let newString = name_fixer(string.toLowerCase());
  let newX = name_fixer(x.toLowerCase());
  if (newString.includes(newX)) return true;
  return false;
};

const convertClassesObjsIntoTeachersWithSubsObjs = (classesObjs, teacher) => {
  // let teachersWithSubsListObjs = {}
  let tsl = {};

  //   const teachersNames = await getAllTeachersName();

  // // Used to create lists of teachersNames in tsl
  //   for (let i = 0; i < teachersNames.length; i++) {
  //     let name = teachersNames[i].replace(" ", "_");

  //     tsl[name] = [];
  //   }

  for (let i = 0; i < classesObjs.length; i++) {
    //   Storing Subjects names
    let s1 = classesObjs[i].subject_1;
    let s2 = classesObjs[i].subject_2;
    let s3 = classesObjs[i].subject_3;
    let s4 = classesObjs[i].subject_4;
    let s5 = classesObjs[i].subject_5;
    let os1 = classesObjs[i].optional_subject_1;
    let os2 = classesObjs[i].optional_subject_2;
    let os3 = classesObjs[i].optional_subject_3;

    // Storing teachers names
    let t1 = classesObjs[i].sub1_teacher;
    let t2 = classesObjs[i].sub2_teacher;
    let t3 = classesObjs[i].sub3_teacher;
    let t4 = classesObjs[i].sub4_teacher;
    let t5 = classesObjs[i].sub5_teacher;
    let ot1 = classesObjs[i].optional_sub1_teacher;
    let ot2 = classesObjs[i].optional_sub2_teacher;
    let ot3 = classesObjs[i].optional_sub3_teacher;

    // Removing spaces
    t1 = name_fixer(t1);
    t2 = name_fixer(t2);
    t3 = name_fixer(t3);
    t4 = name_fixer(t4);
    t5 = name_fixer(t5);
    ot1 = name_fixer(ot1);
    ot2 = name_fixer(ot2);
    ot3 = name_fixer(ot3);

    if (!checkInList(tsl[t1], s1) && (!teacher || checkInString(t1, teacher))) {
      // check if teacher name in teachersObj
      if (!tsl[t1]) tsl[t1] = [];
      tsl[t1].push(s1);
    }
    if (!checkInList(tsl[t2], s2) && (!teacher || checkInString(t2, teacher))) {
      if (!tsl[t2]) tsl[t2] = [];
      tsl[t2].push(s2);
    }
    if (!checkInList(tsl[t3], s3) && (!teacher || checkInString(t3, teacher))) {
      if (!tsl[t3]) tsl[t3] = [];
      tsl[t3].push(s3);
    }
    if (!checkInList(tsl[t4], s4) && (!teacher || checkInString(t4, teacher))) {
      if (!tsl[t4]) tsl[t4] = [];
      tsl[t4].push(s4);
    }
    if (!checkInList(tsl[t5], s5) && (!teacher || checkInString(t5, teacher))) {
      if (!tsl[t5]) tsl[t5] = [];
      tsl[t5].push(s5);
    }
    if (
      !checkInList(tsl[ot1], os1) &&
      (!teacher || checkInString(ot1, teacher))
    ) {
      if (!tsl[ot1]) tsl[ot1] = [];
      tsl[ot1].push(os1);
    }
    if (
      !checkInList(tsl[ot2], os2) &&
      (!teacher || checkInString(ot2, teacher))
    ) {
      if (!tsl[ot2]) tsl[ot2] = [];
      tsl[ot2].push(os2);
    }
    if (
      !checkInList(tsl[ot3], os3) &&
      (!teacher || checkInString(ot3, teacher))
    ) {
      if (!tsl[ot3]) tsl[ot3] = [];
      tsl[ot3].push(os3);
    }
  }
  return tsl;
};

module.exports = {
  getAllTeachers,
  getAllTeachersName,
  getTeachersNameListFromTeachersObjs,
  getTeacherNameFromTeacherObj,
  convertClassesObjsIntoTeachersWithSubsObjs,
  getTeacherObjFromId,
  getTeacherNameFromId,
  getTeacherIdFromTeacherName,
};
