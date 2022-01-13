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
};
