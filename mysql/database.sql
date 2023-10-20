USE teacher;

CREATE TABLE teacher(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
    surname VARCHAR(50) NOT NULL
    email varchar(319) NOT NULL
    PRIMARY KEY(id)
    constraint fk_degree foreign key (degree_id) references degree(id)
)     

CREATE TABLE degree (
    id int(11) NOT NULL AUTO_INCREMENT,
    description varchar(50) NOT NULL,
    PRIMARY KEY(id),
)

CREATE TABLE student(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email varchar(319) NOT NULL,
    PRIMARY KEY(id)
)     

CREATE TABLE Typecourses (
    id int(11) NOT NULL AUTO_INCREMENET,
    description varchar(50) NOT NULL,
    PRIMARY KEY(id)
)

CREATE TABLE courseinfo( 
    id INT(11) NOT NULL AUTO_INCREMENT, 
    courseSchedule VARCHAR(50) NOT NULL, 
    teacher_id INT(11) NOT NULL, 
    degree_id INT(11) NOT NULL, 
    typecourses_id INT(11) NOT NULL, 
    PRIMARY KEY(id), 
    constraint fk_teachers foreign key (teacher_id) references teacher(id), 
    constraint fk_typecourses foreign key (typecourses_id) references typecourses(id) 
); 

CREATE TABLE detailCourse( 
    id INT(11) NOT NULL AUTO_INCREMENT, 
    student_id INT(11) NOT NULL,  
    PRIMARY KEY(id), 
    constraint fk_student foreign key (student_id) references student(id), 
); 
Create Table file(
    id Int AUTO_INCREMENT Not Null Primary Key, file_name Varchar(30)
);