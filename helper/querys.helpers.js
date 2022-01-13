const sectionSearchQuerySnip = (section) => {
  return ` ( lower(c.section) = lower('${section}') ) `;
};

const classSearchQuerySnip = (clss) => ` ( c.grade_no = '${clss}' ) `;

const optionalSubjectSeachQuerySnip = (subject) => {
  return ` 
    ( 
        lower(os1.sub_name) LIKE lower('%${subject}%') OR 
        lower(os2.sub_name) LIKE lower('%${subject}%') 
    ) `;
};

const studentsSearchQuerySnip = (student) => {
  return ` ( lower(s.student_name) LIKE lower('%${student}%') ) `;
};

const teacherSearchQuerySnip = (teacher) => {
  return ` 
            (
                lower(t1.teacher_name) LIKE lower('%${teacher}%') OR 
                lower(t2.teacher_name) LIKE lower('%${teacher}%') OR 
                lower(t3.teacher_name) LIKE lower('%${teacher}%') OR 
                lower(t4.teacher_name) LIKE lower('%${teacher}%') OR 
                lower(t5.teacher_name) LIKE lower('%${teacher}%') OR 
                lower(ot1.teacher_name) LIKE lower('%${teacher}%') OR 
                lower(ot2.teacher_name) LIKE lower('%${teacher}%') OR 
                lower(ot3.teacher_name) LIKE lower('%${teacher}%') 
            ) 
        `;
};

const getWhereSectionOrClassQuerySnip = (clss, section) => {
  if (section && clss) {
    whereQuery = `
        WHERE
          c.section = '${section}' AND
          c.grade_no = '${clss}'
          `;
  } else if (section || clss) {
    whereQuery = `
        WHERE
          ${section ? "c.section = '" + section + "'" : ""}
          ${clss ? "c.grade_no = '" + clss + "'" : ""}
          `;
  } else {
    whereQuery = "";
  }
  return whereQuery;
};

const getWhereSubjectOrSectionOrClassQuerySnip = (subject, clss, section) => {
  if (!subject && !clss && !section) {
    return "";
  }

  let whereQuery = `WHERE `;

  if (subject) {
    // whereQuery += ` (os1.sub_name LIKE '%${subject}%' OR os2.sub_name LIKE '%${subject}%' )`;
    whereQuery += optionalSubjectSeachQuerySnip(subject);
  }

  if (clss) {
    // checking if thier was teacher
    if (subject) whereQuery += " AND ";
    whereQuery += classSearchQuerySnip(clss);
  }

  if (section) {
    // checking if thier was teacher
    if (subject || clss) whereQuery += " AND ";
    whereQuery += sectionSearchQuerySnip(section);
  }

  return whereQuery;
};

const getWhereTeacherOrSectionOrClassQuerySnip = (teacher, clss, section) => {
  if (!teacher && !clss && !section) {
    return "";
  }

  let whereQuery = `WHERE `;

  if (teacher) {
    // whereQuery += ` (os1.sub_name LIKE '%${teacher}%' OR os2.sub_name LIKE '%${subject}%' )`;
    whereQuery += teacherSearchQuerySnip(teacher);
  }

  if (clss) {
    // checking if thier was teacher
    if (teacher) whereQuery += " AND ";
    whereQuery += classSearchQuerySnip(clss);
  }

  if (section) {
    // checking if thier was teacher
    if (teacher || clss) whereQuery += " AND ";
    whereQuery += sectionSearchQuerySnip(section);
  }

  return whereQuery;
};

const getWhereAllSearchQuerySnip = (
  clss,
  section,
  subject,
  teacher,
  student
) => {
  if (!clss && !section && !subject && !teacher && !student) {
    return "";
  }

  let whereQuery = `WHERE `;

  if (clss) {
    whereQuery += classSearchQuerySnip(clss);
  }

  if (section) {
    if (clss) whereQuery += " AND ";
    whereQuery += sectionSearchQuerySnip(section);
  }

  if (subject) {
    if (clss || section) whereQuery += " AND ";
    whereQuery += optionalSubjectSeachQuerySnip(subject);
  }

  if (teacher) {
    if (clss || section || subject) whereQuery += " AND ";
    whereQuery += teacherSearchQuerySnip(teacher);
  }

  if (student) {
    if (clss || section || subject || teacher) whereQuery += " AND ";
    whereQuery += studentsSearchQuerySnip(student);
  }

  return whereQuery;
};

module.exports = {
  getWhereSectionOrClassQuerySnip,
  getWhereSubjectOrSectionOrClassQuerySnip,
  getWhereTeacherOrSectionOrClassQuerySnip,
  getWhereAllSearchQuerySnip,
};
