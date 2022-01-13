const checkInt = (i) => {
  if (Number.isInteger(i)) {
    return true;
  }
  return false;
};

const checkId = (id) => {
  // Checking if integer
  return checkInt(id);
};

const checkValidClass = (c) => {
  if (checkInt(c) && c >= 1 && c <= 10) {
    return true;
  }
  return false;
};

const checkValidSection = (section) => {
  const MAX_SECTION = process.env.MAX_SECTION || "D";
  const MIN_SECTION = process.env.MIN_SECTION || "A";
  if (MIN_SECTION <= section && section <= MAX_SECTION) {
    return true;
  }
  return false;
};

module.exports = {
  checkId,
  checkInt,
  checkValidClass,
  checkValidSection,
};
