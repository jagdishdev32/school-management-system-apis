const {
  getWhereSectionOrClassQuerySnip,
  getWhereSubjectOrSectionOrClassQuerySnip,
  getWhereTeacherOrSectionOrClassQuerySnip,
  getWhereAllSearchQuerySnip,
} = require("./querys.helpers");

const {
  extractTeachersIdsFromBody,
  extractSubjectsIdsFromBody,
  extractSubjectsIdsFromSubjectsList,
  extractTeachersIdsFromTeachersList,
} = require("./extractors.helpers");

module.exports = {
  // Query Helpers
  getWhereSectionOrClassQuerySnip,
  getWhereSubjectOrSectionOrClassQuerySnip,
  getWhereTeacherOrSectionOrClassQuerySnip,
  getWhereAllSearchQuerySnip,
  // Extract Helpers
  extractSubjectsIdsFromBody,
  extractTeachersIdsFromBody,
  extractSubjectsIdsFromSubjectsList,
  extractTeachersIdsFromTeachersList,
};
