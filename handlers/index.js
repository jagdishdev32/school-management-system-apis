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
  getStudentNameFromId,
  getStudentObjFromId,
  getStudentIdFromStudentNameAndClassId,
} = require("./students.handlers");

const {
  getAllTeachers,
  getTeacherNameFromTeacherObj,
  getTeachersNameListFromTeachersObjs,
  getAllTeachersName,
  convertClassesObjsIntoTeachersWithSubsObjs,
  getTeacherObjFromId,
  getTeacherNameFromId,
  getTeacherIdFromTeacherName,
} = require("./teachers.handlers");

const {
  getAllClassesWithSubjectsAndTeachers,
  getSectionFromClassId,
  getGradeNoFromClassId,
  getClassesObjFromId,
  getClassIdFromGradeAndSection,
} = require("./classes.handler");

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
  getStudentObjFromId,
  getStudentNameFromId,
  getStudentIdFromStudentNameAndClassId,
  // Teachers Functions
  getAllTeachers,
  getAllTeachersName,
  getTeachersNameListFromTeachersObjs,
  getTeacherNameFromTeacherObj,
  convertClassesObjsIntoTeachersWithSubsObjs,
  getTeacherObjFromId,
  getTeacherNameFromId,
  getTeacherIdFromTeacherName,
  // Classes Functions
  getAllClassesWithSubjectsAndTeachers,
  getClassesObjFromId,
  getGradeNoFromClassId,
  getSectionFromClassId,
  getClassIdFromGradeAndSection,
  // Other
  name_fixer,
};
