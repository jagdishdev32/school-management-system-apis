const {
  checkId,
  getSubjectIdFromSubjectName,
  getTeacherIdFromTeacherName,
  createTeacher,
  createSubject,
} = require("../handlers");

const extractSubjectsIdsFromSubjectsList = async (subjectsNamesList) => {
  try {
    let subjectsIdsList = [];

    for (let i = 0; i < subjectsList.length; i++) {
      // here subject may represent id or name
      let subject = subjectsList[i];

      let isId = checkId(subject);
      // Checking if id and not then get id of subject
      if (!isId) {
        subject = await getSubjectIdFromSubjectName(subject);
        // Checking if teacher exits
        if (!subject || subject == "") {
          // create subject returns id
          let dataObj = await createSubject(subject);
          subject = dataObj.id;
        }
      }

      let id = subject;
      subjectsIdsList[i] = id;
    }

    return subjectsIdsList;
  } catch (error) {
    throw error;
  }
};

const extractTeachersIdsFromTeachersList = async (teachersList) => {
  try {
    let teachersIdsList = [];

    for (let i = 0; i < teachersList.length; i++) {
      // here teacher may represent id or name
      let teacher = teachersList[i];

      let isId = checkId(teacher);
      // Checking if id and not then get id of teacher
      if (!isId) {
        teacher = await getTeacherIdFromTeacherName(teacher);
        // Checking if teacher exits
        if (!teacher || teacher == "") {
          // create teacher returns id
          let dataObj = await createTeacher(teacher);
          teacher = dataObj.id;
        }
      }

      // Now teacher is for sure id
      let id = teacher;
      teachersIdsList[i] = id;
    }

    return teachersIdsList;
  } catch (error) {
    throw error;
  }
};

const extractSubjectsIdsFromBody = async (body) => {
  try {
    let { subject1, subject2, subject3, subject4, subject5 } = body;
    let { optional_subject1, optional_subject2, optional_subject3 } = body;

    let subjectsList = [
      subject1,
      subject2,
      subject3,
      subject4,
      subject5,
      optional_subject1,
      optional_subject2,
      optional_subject3,
    ];

    let subjectsIdsList = await extractSubjectsIdsFromSubjectsList(
      subjectsList
    );

    // for (let i = 0; i < subjectsList.length; i++) {
    //   let subject = subjectsList[i];

    //   let isId = checkId(subject);
    //   if (!isId) {
    //     // Checking if id and not then get id of subject
    //     subject = await getSubjectIdFromSubjectName(subject);
    //     // Checking if teacher exits
    //     if (!subject || subject == "") {
    //       // create subject returns id
    //       data = await createSubject(subject);
    //       subject = data.id
    //     }
    //     // Replace name with Id
    //     subjectsList[i] = subject;
    //   }
    // }

    return subjectsIdsList;
  } catch (error) {
    throw error;
  }
};

const extractTeachersIdsFromBody = async (body) => {
  try {
    let {
      subject1_teacher,
      subject2_teacher,
      subject3_teacher,
      subject4_teacher,
      subject5_teacher,
    } = body;
    let {
      optional_subject1_teacher,
      optional_subject2_teacher,
      optional_subject3_teacher,
    } = body;

    let teachersList = [
      subject1_teacher,
      subject2_teacher,
      subject3_teacher,
      subject4_teacher,
      subject5_teacher,
      optional_subject1_teacher,
      optional_subject2_teacher,
      optional_subject3_teacher,
    ];

    let teachersIdsList = await extractTeachersIdsFromTeachersList(
      teachersList
    );
    return teachersIdsList;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  extractSubjectsIdsFromBody,
  extractTeachersIdsFromBody,
  extractSubjectsIdsFromSubjectsList,
  extractTeachersIdsFromTeachersList,
};
