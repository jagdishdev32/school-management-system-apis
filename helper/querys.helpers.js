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
    whereQuery += ` (lower(os1.sub_name) LIKE lower('%${subject}%') OR lower(os2.sub_name) LIKE lower('%${subject}%') )`;
  }

  if (clss) {
    // checking if thier was subject
    if (subject) whereQuery += " AND ";
    whereQuery += ` c.grade_no = '${clss}' `;
  }

  if (section) {
    // checking if thier was subject
    if (subject || clss) whereQuery += " AND ";
    whereQuery += `c.section = '${section}'`;
  }

  return whereQuery;
};

module.exports = {
  getWhereSectionOrClassQuerySnip,
  getWhereSubjectOrSectionOrClassQuerySnip,
};
