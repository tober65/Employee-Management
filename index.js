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
    start();
}
                    
function viewDepartments() {
    start();
}
                    
function addNewRole() {
    start();
}
                    
function viewRoles() {
    start();
}
                    
function addNewEmployee() {
    start();
}
                    
function viewEmployees() {
    start();
}
                    
function updateEmployeeRole() {
    start();
}

function quit() {
    connection.end();
}