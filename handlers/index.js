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
  deleteAllStudentsWithClassId,
  deleteStudentsWithGradeAndSection,
} = require("./students.handlers");

const {
  getAllTeachers,
  getTeacherNameFromTeacherObj,
  getTeachersNameListFromTeachersObjs,
  getAllTeachersName,
  getTeacherObjFromId,
  getTeacherNameFromId,
  getTeacherIdFromTeacherName,
  getTeacherObjFromTeacherName,
  createTeacher,
  deleteTeacherWithName,
  deleteTeacherWithId,
  updateTeacher,
  convertClassesObjsIntoTeachersWithSubsObjs,
} = require("./teachers.handlers");

const {
  getAllClassesWithSubjectsAndTeachers,
  getSectionFromClassId,
  getGradeNoFromClassId,
  getClassesObjFromId,
  getClassIdFromGradeAndSection,
  getClassObjFromGradeAndSection,
  createClass,
  deleteClassWithClassId,
} = require("./classes.handler");

const { name_fixer } = require("./other");

const {
  getSubjectIdFromSubjectName,
  getSubjectObjFromSubjectName,
  getSubjectNameFromId,
  createSubject,
  deleteSubjectWithId,
  updateSubject,
  deleteSubjectWithName,
} = require("./subjects.handler");

const {
  getGradeIdFromGradeNo,
  getGradeObjFromGradeNo,
  createGrade,
  deleteGradeWithGradeId,
  deleteGradeWithGradeNo,
  checkGradeSupportOptionalSubjects,
  checkGradeSupportOptionalSubject,
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
  deleteStudentsWithGradeAndSection,
  deleteAllStudentsWithClassId,
  // Teachers Functions
  getAllTeachers,
  getAllTeachersName,
  getTeachersNameListFromTeachersObjs,
  getTeacherNameFromTeacherObj,
  getTeacherObjFromId,
  getTeacherNameFromId,
  getTeacherIdFromTeacherName,
  getTeacherObjFromTeacherName,
  createTeacher,
  deleteTeacherWithId,
  deleteTeacherWithName,
  updateTeacher,
  convertClassesObjsIntoTeachersWithSubsObjs,
  // Classes Functions
  getAllClassesWithSubjectsAndTeachers,
  getClassesObjFromId,
  getGradeNoFromClassId,
  getSectionFromClassId,
  getClassIdFromGradeAndSection,
  getClassObjFromGradeAndSection,
  createClass,
  deleteClassWithClassId,
  // Subjects Functions
  getSubjectIdFromSubjectName,
  getSubjectObjFromSubjectName,
  getSubjectNameFromId,
  createSubject,
  updateSubject,
  deleteSubjectWithName,
  deleteSubjectWithId,
  // Grades Functions
  getGradeIdFromGradeNo,
  getGradeObjFromGradeNo,
  createGrade,
  checkGradeSupportOptionalSubject,
  checkGradeSupportOptionalSubjects,
  deleteGradeWithGradeNo,
  deleteGradeWithGradeId,
  // Other
  name_fixer,
};
