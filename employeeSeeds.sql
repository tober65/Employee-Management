USE employee_db;

DELETE FROM department;

INSERT INTO department (name)
VALUES ("Management");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("HR");

DELETE FROM role;

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 200000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Programmer", 90000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Director", 100000, 3);

DELETE FROM employee;

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Alice", "Anderson", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Bugle", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charlie", "Carlson", 3, 1);