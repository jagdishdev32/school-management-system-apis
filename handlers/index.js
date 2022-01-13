const {
  checkId,
  checkInt,
  checkValidClass,
  checkValidSection,
} = require("./inputChecker");

const {
  getAllStudentsOfPerticularClass,
  getAllStudents,
  getAllStudentsOfPerticularClassAndSection,
  getOnlyStudentNamesListOfPerticularClassAndSection,
} = require("./students.handlers");

const {
  getAllTeachers,
  getTeacherNameFromTeacherObj,
  getTeachersNameListFromTeachersObjs,
  getAllTeachersName,
  convertClassesObjsIntoTeachersWithSubsObjs,
} = require("./teachers.handlers");

const { getAllClassesWithSubjectsAndTeachers } = require("./classes.handler");

const { name_fixer } = require("./other");

module.exports = {
  // Checker file functions
  checkId,
  checkInt,
  checkValidClass,
  checkValidSection,
  //   Student Functions
  getAllStudents,
  getAllStudentsOfPerticularClass,
  getAllStudentsOfPerticularClassAndSection,
  getOnlyStudentNamesListOfPerticularClassAndSection,
  // Teachers Functions
  getAllTeachers,
  getAllTeachersName,
  getTeachersNameListFromTeachersObjs,
  getTeacherNameFromTeacherObj,
  convertClassesObjsIntoTeachersWithSubsObjs,
  // Classes Functions
  getAllClassesWithSubjectsAndTeachers,
  // Other
  name_fixer,
};
