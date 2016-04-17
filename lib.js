students = [];
groups = [];
tasks = [];
marks = [];

// Students functions
// You can add, remove and show students.
function addStudent (name, surname, phone, address) {
	var actionType = '[addStudent]:';
	if (!name) {
		return console.log(actionType, 'Name of the student is not defined.');
	}
	if (!surname) {
		return console.log(actionType, 'Surname of the student is not defined.');
	}
	if (!phone) {
		return console.log(actionType, 'Please provide a phone of the student.');
	}
	var phoneRegex = new RegExp("^\\+[0-9]*$");
	if (!phoneRegex.test(phone)) {
		return console.log(actionType, 'Phone number is invalid');
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
	return console.log(actionType, `Student ${name} ${surname} has been added successfully.`);
}

function removeStudent (id) {
	var actionType = '[removeStudent]:';
	const student = students[id];
	if (!student) {
		return console.log(actionType, `There's not such a student with this ID`);
	}
	delete students[id];
	return console.log(actionType, `Student ${student.name} ${student.surname} has been successfully removed.`);
}

function showStudents (students) {
	console.log(students);
}


//
// Existance functions & Tools.
//
function isStudentExist (id) {
	for (var i = 0; i < students.length; i++) {
		if (students[i].id === id) {
			return true;
		}
	}
	return false;
}

function isGroupExist (id) {
	for (var i = 0; i < groups.length; i++) {
		if (groups[i].id === id) {
			return true;
		}
	}
	return false;
}

function isTaskExist (id) {
	for (var i = 0; i < tasks.length; i++) {
		if (tasks[i].id === id) {
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
	var actionType = '[createGroup]:';
	if (!name) {
		return console.log(actionType, 'Please provide the name of the group.');
	}
	if (!students) {
		return console.log(actionType, 'Please provide students list.');
	}
	// Check if array
	if (Object.prototype.toString.call(students) !== '[object Array]') {
		return console.log(actionType, 'Students list must be an Array!');
	}
	if (students.length === 0) {
		return console.log(actionType, `Student's list must not be empty.`);
	}

	for (var i = 0; i < students.length; i++) {
		var id = students[i];
		if (!isStudentExist(id)) {
			return console.log(actionType, `Student with id ${id} does not exist.`);
		}
	}
	var group = {
		id: groups.length,
		name: name,
		students: students
	}
	groups.push(group);
	return console.log(actionType, `Group «${name}» of ${students.length} guys has been created.`);
}
createGroup('The Guardians', [1, 2]);
createGroup('Science & Research', [0, 1, 2]);

// About type:
// 1 - task for command
// 2 - individual task
function createTask (type, name, description, participants) {
	var actionType = '[createTask]:';
	if (type > 2) {
		return console.log(actionType, 'Type of the task is undefined');
	}
	if (!name) {
		return console.log(actionType, 'Please provide the name of the task.');
	}
	if (!description) {
		return console.log(actionType, 'Please provide the description of the task.');
	}
	if (typeof participants !== 'number') {
		return console.log(actionType, 'You have to provide an ID of participant or a group.');
	}
	if (type === 2 && !isGroupExist(participants)) {
		return console.log(actionType, `Group with this ID (${participants}) does not exist.`);
	}
	if (type === 1 && !isStudentExist(participants)) {
		return console.log(actionType, `Student with this ID (${participants}) does not exist`);
	}

	var task = {
		id: tasks.length,
		type: 1,
		name: name,
		description: description,
		participants: participants
	}
	tasks.push(task);
	return console.log(actionType, `Task «${name}» has been created.`);
}

createTask(2, 'name', 'do something', 0);
console.log(tasks);

function setMark(type, target, taskID, mark, comment) {
	var actionType = '[setMark]:';
	if (type > 2) {
		return console.log(actionType, 'Type of the mark is undefined');
	}
	if (type === 2 && !isGroupExist(participants)) {
		return console.log(actionType, `Group with this ID (${participants}) does not exist.`);
	}
	if (type === 1 && !isStudentExist(participants)) {
		return console.log(actionType, `Student with this ID (${participants}) does not exist`);
	}

	if (!mark) {
		return console.log(actionType, 'Please provide a mark 1-10');
	} else if (mark > 10 || mark < 1) {
		return console.log(actionType, 'Mark must be in 1-10 only!');
	}
	var mark = {
		type: type,
		target: target,
		taskID: taskID,
		mark: mark,
		comment: comment
	}

	marks.push(mark);
	return console.log(actionType, `Mark ${mark} was set on ${target}`);
}



















