const {
  checkId,
  checkInt,
  checkValidClass,
  checkValidSection,
  checkValidName,
} = require("./inputChecker");

const {
  getAllStudentsOfPerticularClass,
  getAllStudents,
  getAllStudentsOfPerticularClassAndSection,
  getOnlyStudentNamesListOfPerticularClassAndSection,
  getStudentNameFromId,
  getStudentObjFromId,
  getStudentIdFromStudentNameAndClassId,
  createStudent,
  deleteStudentWithId,
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
  createTeacher,
  deleteTeacherWithName,
  deleteTeacherWithId,
  updateTeacher,
} = require("./teachers.handlers");

const {
  getAllClassesWithSubjectsAndTeachers,
  getSectionFromClassId,
  getGradeNoFromClassId,
  getClassesObjFromId,
  getClassIdFromGradeAndSection,
  createClass,
} = require("./classes.handler");

const { name_fixer } = require("./other");

const {
  getSubjectIdFromSubjectName,
  getSubjectNameFromId,
  createSubject,
  deleteSubjectWithId,
  updateSubject,
  deleteSubjectWithName,
} = require("./subjects.handler");

const {
  createGrade,
  checkGradeSupportOptionalSubjects,
  checkGradeSupportOptionalSubject,
  deleteGrade,
} = require("./grades.handlers");

module.exports = {
  // Checker file functions
  checkId,
  checkInt,
  checkValidClass,
  checkValidSection,
  checkValidName,
  //   Student Functions
  getAllStudents,
  getAllStudentsOfPerticularClass,
  getAllStudentsOfPerticularClassAndSection,
  getOnlyStudentNamesListOfPerticularClassAndSection,
  getStudentObjFromId,
  getStudentNameFromId,
  getStudentIdFromStudentNameAndClassId,
  createStudent,
  deleteStudentWithId,
  // Teachers Functions
  getAllTeachers,
  getAllTeachersName,
  getTeachersNameListFromTeachersObjs,
  getTeacherNameFromTeacherObj,
  convertClassesObjsIntoTeachersWithSubsObjs,
  getTeacherObjFromId,
  getTeacherNameFromId,
  getTeacherIdFromTeacherName,
  createTeacher,
  deleteTeacherWithId,
  deleteTeacherWithName,
  updateTeacher,
  // Classes Functions
  getAllClassesWithSubjectsAndTeachers,
  getClassesObjFromId,
  getGradeNoFromClassId,
  getSectionFromClassId,
  getClassIdFromGradeAndSection,
  createClass,
  // Subjects Functions
  getSubjectIdFromSubjectName,
  getSubjectNameFromId,
  createSubject,
  updateSubject,
  deleteSubjectWithName,
  deleteTeacherWithId,
  // Grades Functions
  createGrade,
  deleteGrade,
  checkGradeSupportOptionalSubject,
  checkGradeSupportOptionalSubjects,
  // Other
  name_fixer,
};
