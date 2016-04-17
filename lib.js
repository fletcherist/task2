students = [];
groups = [];

function addStudent (name, surname, phone, address) {
	if (!name) {
		return console.log('Name of the student is not defined');
	}
	if (!surname) {
		return console.log('Surname of the student is not defined');
	}
	if (!phone) {
		return console.log('Please provide a phone of the student');
	}
	var phoneRegex = new RegExp("^\\+[0-9]*$");
	if (!phoneRegex.test(phone)) {
		return console.log('Phone number is invalid');
	}
	const studentID = students.length;
	const student = {
		id: studentID,
		name: name,
		surname: surname,
		phone: phone,
		address: address || ''
	};
	students.push(student);
	console.log(`Student ${name} ${surname} has been added successfully`);
}

function showStudents (students) {
	console.log(students);
}

function createTask (type) {

}

addStudent('Ivan', 'Ivanov', '+123');
showStudents(students);