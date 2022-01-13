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

module.exports = {
  getWhereSectionOrClassQuerySnip,
};
