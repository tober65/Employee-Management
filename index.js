const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_db",
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
});

start();

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What do you want to do?",
            name: "choice",
            choices: [
                "Add new Department",
                "View Departments",
                "Add new Role",
                "View Roles",
                "Add new Employee",
                "View Employees",
                "Update Employee Role",
                "exit"
            ],
        }]).then((answers) => {
            switch (answers.choice) {
                case "Add new Department":
                    addNewDepartment();
                    break;
                case "View Departments":
                    viewDepartments();
                    break;
                case "Add new Role":
                    addNewRole();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "Add new Employee":
                    addNewEmployee();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "exit":
                    quit();
                    break;
            }
        });
}
function addNewDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the new department's name?",
                name: "name",
            }]).then((answers) => {
                var query = "INSERT INTO department (name) VALUES (?)";
                connection.query(query, answers.name, function (err, res) {
                    if (err) throw err;
                    console.log(answers.name + " department added!");

                    start();
                });
            });
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        start();
    });
}

function addNewRole() {
    start();
}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        start();
    });
}

function addNewEmployee() {
    start();
}

function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        start();
    });
}

function updateEmployeeRole() {
    start();
}

function quit() {
    connection.end();
}