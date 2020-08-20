const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { constants } = require("os");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function managerPrompt(){
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter id?",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter email?",
    },
    {
      type: 'input',
      name: 'special',
      message: "Enter office number?",
    }
  ]);
}

function engineerPrompt(){
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter id?",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter email?",
    },
    {
      type: 'input',
      name: 'special',
      message: "Enter github username?",
    }
  ]);
}

function internPrompt(){
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter id?",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter email?",
    },
    {
      type: 'input',
      name: 'special',
      message: "Enter school?",
    }
  ]);
}

var EmployeeArray = []

/* managerPrompt().then(function(response){

  var newmanager = new Manager(response.name, response.id, response.email, response.officenumber);
  console.log(newmanager);
  EmployeeArray.push(newmanager);
}).catch(function(err){
  console.log(err);
}); */

function selectPrompt(){
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'select',
      message: 'Which team member',
      choices: ['manager','engineer','intern','done'],
    },
  ]).then(function(response){
    askQuestions(response.select);
  })
}
selectPrompt();

function askQuestions(selection){

  if(selection === 'manager'){
    managerPrompt().then(function(response){
      var newmanager = new Manager(response.name, response.id, response.email, response.special);
      console.log(newmanager);
      EmployeeArray.push(newmanager);
      selectPrompt();
    })
  }
  if(selection === 'engineer'){
    engineerPrompt().then(function(response){
      var newengineer = new Engineer(response.name, response.id, response.email, response.special);
      console.log(newengineer);
      EmployeeArray.push(newengineer);
      selectPrompt();
    })
  }
  if(selection === 'intern'){
    internPrompt().then(function(response){
      var newintern = new Intern(response.name, response.id, response.email, response.special);
      console.log(newintern);
      EmployeeArray.push(newintern);
      selectPrompt();
    })
  }
  if(selection === 'done'){
    renderHTML();
  }
  console.log(EmployeeArray);


  
}



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function renderHTML(){
  var RenderedEmployees = render(EmployeeArray);
  console.log(RenderedEmployees);
  fs.writeFile('team.html', RenderedEmployees, (err)=>{
    console.log(err);
  });
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

//fs.writeFile("team.html", RenderedEmployees);

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
