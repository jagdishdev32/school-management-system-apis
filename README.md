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

## How to Run

### Pre-requisites

- Node
- Postgresql

- Bash (optional) (For script)
- Docker (optional) (for script)

### Using Script For Running Project


Check `config.sh` file for all the variables for script.

Run `first_time_script.sh` for automatically intialize project.

And use `recreate_database.sh` for reseting/recreating database.

`first_time_script.sh` will complete following steps:

1. Create postgresql docker container
2. Run all the steps/schema/query from `database.sql` file in docker container.
3. Step-up `.env` to connect with postgresql server.
4. Install npm packages

now use `npm start` or `npm run dev` for starting server.


### Manually Running Project

1. Create postgresql docker container

    ```bash
    docker run \
        --name "psql-container" \
        -p 8081:5432 \
        -e POSTGRES_PASSWORD=secret \
        -d postgres
    ```

2. Run all the steps/schema/query from `database.sql` file in docker container.

    1. Copy All the lines from `database.sql`

    2. Pasting them in docker container

    ```bash
    docker exec -it psql-container /bin/bash # Get container shell

    # get psql cli
    psql -U postgres
    CREATE DATABASE newdb;
    {now paste all the content/queries from `database.sql` file}
    ```

3. Step-up `.env` to connect with postgresql server.
    
    - Create / Update `.env` file

    ```bash
    # Inside .env file
    PORT=5000
    DB_HOST=localhost
    DB_USER=postgres
    DB_PASSWORD=secret
    DB_DATABASE=newdb
    DB_PORT=8081
    ```

4. Install npm packages

    ```bash
    npm install # Install all packages
    ```


now you can use `npm start` or `npm run dev` for starting server.

## Completed API's

> **API's with sending and returned data** can be found in `Rest Requests` folder

- Students

  - [x] Get Student

    - [x] GET "/students/" , get Students Names With Grade And Section

    - [x] GET "/students?class=5&section=C" , get Students Names Of Perticular Class Or Section

    - [x] GET "/students/full" , get Students Names With All Subjects

    - [x] GET "/students/full?subject=mathe&class=4&section=B" , get Students Names Who Has Choosen Perticular Optional Subject

  - [x] POST /student , Create Student

  - [x] DELETE /student , Delete Student

- Classes

  - [x] Get Classes

    - [x] GET "/classes/" , get Classes With All Subjects And Teachers Details

    - [x] GET "/classes?class=4&section=C&teacher=william" , get Detail Of Perticular Classes With Teachers

    - [x] GET "/classes/full" , get Classes With All Students And Subjects And Teachers Details

    - [x] GET "/classes/full?student=jean&class=4&section=C&teacher=william", get Detail Of Perticular Classes With Student & Teacher

  - [x] Create Class

    - [x] POST /classes , Create Class with subjects and teachers

    - [x] POST /classes , Create Session with teachers

  - [ ] DELETE /classes , Delete Classes

- Teachers

  - [x] Get Teachers

    - [x] GET "/teachers/" get Names Of All Teachers

    - [x] GET "/teachers/full" get Teachers With Subject

    - [x] GET "/teachers/full?teacher=julianna&class=4&section=B", get Perticular Teachers With Subject For Perticular Class

  - [x] POST `/teacher` Create new teacher

  - [x] PUT `/teacher:id` Edit teacher

  - [x] Delete Teacher

    - [x] DELETE `/teacher/:id` Delete teacher with ID

    - [x] DELETE `/teacher/` Delete teacher with name

_Subjects are created by adding subjects in classes/grade_
