const name_fixer = (name) => {
  return name.trim().replace(" ", "_");
};

module.exports = { name_fixer };
