students = [];
groups = [];

// Students functions
// You can add, remove and show students.
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
	return console.log(`Student ${name} ${surname} has been added successfully`);
}

function removeStudent (id) {
	const student = students[id];
	if (!student) {
		return console.log(`There's not such a student with this ID`);
	}
	delete students[id];
	return console.log(`Student ${student.name} ${student.surname} has been successfully removed`);
}

function showStudents (students) {
	console.log(students);
}

function isStudentExist (id) {
	for (var i = 0; i < students.length; i++) {
		if (students[i].id === id) {
			return true;
		}
	}
	return false;
}

addStudent('Ivan', 'Ivanov', '+123');
addStudent('Ivan', 'Ivanov', '+123');
addStudent('Ivan', 'Ivanov', '+123');
// showStudents(students);

function createGroup (name, students) {
	if (!name) {
		return console.log('Please provide the name of the group');
	}
	if (!students) {
		return console.log('Please provide students list');
	}
	// Check if array
	if (Object.prototype.toString.call(students) !== '[object Array]') {
		return console.log('Students list must be an Array!');
	}
	if (students.length === 0) {
		return console.log(`Student's list must not be empty.`);
	}

	for (var i = 0; i < students.length; i++) {
		var id = students[i];
		if (!isStudentExist(id)) {
			return console.log(`Student with id ${id} does not exist.`);
		}
	}
	var group = {
		id: groups.length,
		name: name,
		students: students
	}
	groups.push(group);
	return console.log(`Group with name «${name}» of ${students.length} guys has been created`);

}
function createTask (type) {

}

createGroup('Science & Research', [0, 1, 2]);

