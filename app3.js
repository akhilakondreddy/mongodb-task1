const mongoose=require('mongoose');
const readline=require('readline');

const mongoURI='mongodb://localhost:27017/Employeedb';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
  showMenu();
}).catch(err => console.error('❌ Connection Error:', err));

// Define Schema & Model
const employeeSchema = new mongoose.Schema({
  name: String,
  salary: Number,
});
const Employee = mongoose.model('employees', employeeSchema);

// CLI Setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Menu Function
function showMenu() {
  console.log(`\n--- Employee Management CLI ---
1. Insert Employee
2. View All Employee
3. Ascending order
4. descending order
5. Exit
-------------------------------`);

  rl.question('Choose an option (1-5): ', handleMenu);
}

// Handle Menu Choices
function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      insertEmployee();
      break;
    case '2':
      viewEmployee();
      break;
    case '3':
      ascendingorder();
      break;
    case '4':
      descendingorder();
      break;
    case '5':
      console.log('👋 Exiting...');
      rl.close();
      mongoose.disconnect();
      break;
    default:
      console.log('❌ Invalid choice. Try again.');
      showMenu();
  }
}

// Insert Employee
function insertEmployee() {
  rl.question('Enter name of Employee: ', name => {
    rl.question('Enter salary: ', salary => {
        const employee = new Employee({ name, salary: Number(salary)});
        employee.save()
          .then(() => {
            console.log('✅ Employee inserted successfully.');
            showMenu();
          })
          .catch(err => {
            console.error('❌ Insert failed:', err);
            showMenu();
          });
    });
  });
}

// View Employees
function viewEmployee() {
  Employee.find()
    .then(employee => {
      console.log('\n📄 Employee Records:');
      employee.forEach((s, index) => {
        console.log(`${index + 1}. ${s.name}, Salary: ${s.salary}, ID: ${s._id}`);
      });
      showMenu();
    })
    .catch(err => {
      console.error('❌ Error fetching employee:', err);
      showMenu();
    });
}

function ascendingorder() {
  Employee.find().sort({ salary: 1 }) //  ascending order salary
    .then(employee => {
      console.log('\n📄 Employee Records:');
      employee.forEach((s, index) => {
        console.log(`${index + 1}. ${s.name}, Salary: ${s.salary}, ID: ${s._id}`);
      });
      showMenu();
    })
    .catch(err => {
      console.error('❌ Error fetching employee:', err);
      showMenu();
    });
}

function descendingorder() {
  Employee.find().sort({ salary: -1 }) // descending order salary
    .then(employee => {
      console.log('\n📄 Employee Records:');
      employee.forEach((s, index) => {
        console.log(`${index + 1}. ${s.name}, Salary: ${s.salary}, ID: ${s._id}`);
      });
      showMenu();
    })
    .catch(err => {
      console.error('❌ Error fetching employee:', err);
      showMenu();
    });
}