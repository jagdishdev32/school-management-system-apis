# School Management System (Backend)

This project was as given as a small assignment.

## Case:

Consider the scenario, where there are multiple sections of a single grade (5th A, 5th B, 5th C). 

Each section will have 30-40 students. Each section will have 5 mandatory subjects and 2 optional subjects from a group of 3. 

Each subject can be taught by multiple teachers across different sections 

(Ex: In 5th A, Maths's subject is being taught by Mr. X but in 5th B, Maths'ssubject is being taught by 
Mr. Y. At the same time Mr. X may or may not teach English in 5th C. ). 

### Assignment:

1. design the DB schema based on the above scenario.

2. make at least 5 API’s which we can consume. 

    - Some sample API’s:
    - List all the subjects taught by given teacher (section wise)
    - List of all the students who have selected a given optional subject (section wise)

## Completed API's

- Students

    - [x] getStudentsNamesWithGradeAndSection GET "/students/"

    - [x] getStudentsNamesOfPerticularClassOrSection GET "/students?class=5&section=C"

    - [x] getStudentsNamesWithAllSubjects GET "/students/full"

    - [x] getStudentsNamesWhoHasChoosenPerticularOptionalSubject GET "/students/full?subject=mathe&class=4&section=B"

- Classes

    - [x] getClassesWithAllSubjectsAndTeachersDetails GET "/classes/"

    - [x] getDetailOfPerticularClassesWithTeachers GET "/classes?class=4&section=C&teacher=william"

    - [x] getClassesWithAllStudentsAndSubjectsAndTeachersDetails GET "/classes/full"

    - [x] getDetailOfPerticularClassesWithStudent&Teacher GET "/classes/full?student=jean&class=4&section=C&teacher=william"

- Teachers

    - [x] getNamesOfAllTeachers GET "/teachers/"

    - [x] getTeachersWithSubject GET "/teachers/full"

    - [x] getPerticularTeachersWithSubjectForPerticularClass GET "/teachers/full?teacher=julianna&class=4&section=B"
