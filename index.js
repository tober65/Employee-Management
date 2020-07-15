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
    var query = "SELECT name FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        start();
    });
}

function addNewRole() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) {
            throw err;
        }
        const deptNames = res.map((row) => row.name);

        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What is the new role's title?",
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the new role's salary?",
                },
                {
                    name: "dept",
                    type: "rawlist",
                    choices: deptNames,
                    message: "What department is this role in?",
                }
            ]).then((answers) => {
                const chosenDept = res.find((row) => row.name === answers.dept);

                var query = "INSERT INTO role SET ?";
                connection.query(query,
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: chosenDept.id
                    },
                    function (err) {
                        if (err) throw err;

                        console.log(answers.title + " role added!");

                        start();
                    });
            });
    });

}

function viewRoles() {
    var query = "select title, salary, name from role inner join department on role.department_id = department.id;";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        start();
    });
}

function addNewEmployee() {
    connection.query("SELECT * FROM role", (err, roleRes) => {
        if (err) {
            throw err;
        }
        const roleNames = roleRes.map((row) => row.title);

        connection.query("SELECT * FROM employee", (err, managerRes) => {

            const employeeNames = managerRes.map((row) => row.last_name);

            inquirer
                .prompt([
                    {
                        name: "firstName",
                        type: "input",
                        message: "What is the new employee's first name?",
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "What is the new employee's last name?",
                    },
                    {
                        name: "role",
                        type: "rawlist",
                        choices: roleNames,
                        message: "What is the new employee's role?",
                    },
                    {
                        name: "manager",
                        type: "rawlist",
                        choices: employeeNames,
                        message: "Who is the new employee's manager?",
                    }
                ]).then((answers) => {
                    const chosenRole = roleRes.find((row) => row.title === answers.role);
                    const chosenManager = managerRes.find((row) => row.last_name === answers.manager);

                    var query = "INSERT INTO employee SET ?";
                    connection.query(query,
                        {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: chosenRole.id,
                            manager_id: chosenManager.id
                        },
                        function (err) {
                            if (err) throw err;

                            console.log(answers.firstName + " " + answers.lastName + " employee added!");

                            start();
                        });
                });
        });
    });
}

function viewEmployees() {
    var query = `select CONCAT(A.first_name, " ", A.last_name) AS name, title, CONCAT(B.first_name, " ", B.last_name) as manager 
    from employee A inner join role ON A.role_id = role.id left join employee B on A.manager_id = B.id`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        start();
    });
}

function updateEmployeeRole() {
    connection.query("SELECT * FROM role", (err, roleRes) => {
        if (err) {
            throw err;
        }
        const roleNames = roleRes.map((row) => row.title);

        connection.query("SELECT * FROM employee", (err, employeeRes) => {

            const employeeNames = employeeRes.map((row) => row.last_name);

            inquirer
                .prompt([
                    {
                        name: "employee",
                        type: "rawlist",
                        choices: employeeNames,
                        message: "Which employee's role do you want to change?",
                    },
                    {
                        name: "role",
                        type: "rawlist",
                        choices: roleNames,
                        message: "What is the new role?",
                    }
                ]).then((answers) => {
                    const chosenRole = roleRes.find((row) => row.title === answers.role);
                    const chosenEmployee = employeeRes.find((row) => row.last_name === answers.employee);

                    var query = "UPDATE employee SET ? WHERE ?";
                    connection.query(query,
                        [
                            {
                                role_id: chosenRole.id
                            },
                            {
                                last_name: chosenEmployee.last_name
                            }
                        ],
                        function (err) {
                            if (err) throw err;

                            console.log(answers.employee + " role changed!");

                            start();
                        });
                });
        });
    });
}

function quit() {
    connection.end();
}