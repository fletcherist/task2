teachers = [
 {
 	id: 0,
 	name: 'Аристотель',
 	surname: ''
 },
 {
 	id: 1,
 	name: 'Дейл',
 	surname: 'Карнеги'
 },
 {
 	id: 2,
 	name: 'Константин',
 	surname: '(Дмитревич) Ушинский'
 }
]
students = [];
groups = [];
tasks = [];
marks = [];

studentPriorityList = [];
teacherPriorityList = [];

// Students functions
// You can add, remove and show students.
function addStudent (student) {
	var actionType = '[addStudent]:';
	if (!student.name) {
		return console.log(actionType, 'Name of the student is not defined.');
	}
	if (!student.surname) {
		return console.log(actionType, 'Surname of the student is not defined.');
	}
	if (!student.phone) {
		return console.log(actionType, 'Please provide a phone of the student.');
	}
	var phoneRegex = new RegExp("^\\+[0-9]*$");
	if (!phoneRegex.test(student.phone)) {
		return console.log(actionType, 'Phone number is invalid');
	}

	student.id = students.length;
	students.push(student);
	return console.log(actionType, `Student ${student.name} ${student.surname} has been added successfully.`);
}

addStudent({name: 'Issac', surname: 'Newton', phone: '+79109732483'});
addStudent({name: 'Issac', surname: 'Newton', phone: '+79109732483'});
addStudent({name: 'Issac', surname: 'Newton', phone: '+79109732483'});
// showStudents(students);

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


// !!!
// Existance functions & Tools.
function isStudentExist (id) {
	for (var i = 0; i < students.length; i++) {
		if (students[i].id === id) {
			return true;
		}
	}
	console.log(`Student with id ${id} does not exist.`);
	return false;
}

function areStudentsInListExist (list) {
	for (var i = 0; i < list.length; i++) {
		var id = list[i];
		if (!isStudentExist(id)) {
			return false;
		}
	}
	return true;
}

function isTeacherExist (id) {
	for (var i = 0; i < teachers.length; i++) {
		if (teachers[i].id === id) {
			return true;
		}
	}
	console.log(`Teacher with id ${id} does not exist.`);
	return false;
}

function areTeachersInListExist (list) {
	for (var i = 0; i < list.length; i++) {
		var id = list[i];
		if (!isTeacherExist(id)) {
			return false;
		}
	}
	return true;
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

	if (!areStudentsInListExist(students)) {
		return console.log('Fix the bug above to continue.');
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
// createGroup('Science & Research', [0, 1, 2]);

// About type:
// 1 - task for command
// 2 - individual task
function createTask (task) {
	var actionType = '[createTask]:';
	if (task.type > 2) {
		return console.log(actionType, 'Type of the task is undefined');
	}
	if (!task.name) {
		return console.log(actionType, 'Please provide the name of the task.');
	}
	if (!task.description) {
		return console.log(actionType, 'Please provide the description of the task.');
	}
	if (typeof task.participants !== 'number') {
		return console.log(actionType, 'You have to provide an ID of participant or a group.');
	}
	if (task.type === 2 && !isGroupExist(task.participants)) {
		return console.log(actionType, `Group with this ID (${task.participants}) does not exist.`);
	}
	if (task.type === 1 && !isStudentExist(task.participants)) {
		return console.log(actionType, `Student with this ID (${task.participants}) does not exist`);
	}

	task.id = tasks.length;
	tasks.push(task);
	return console.log(actionType, `Task «${task.name}» — ${task.description} — has been created.`);
}

// createTask({
// 	type: 2,
// 	name: 'name',
// 	description: 'Do a realtime application',
// 	participants: 0
// });

function setMark (mark) {
	var actionType = '[setMark]:';
	if (!mark.type || mark.type > 2) {
		return console.log(actionType, 'Type of the mark is undefined');
	}
	if (mark.type === 2 && !isGroupExist(mark.target)) {
		return console.log(actionType, `Group with this ID (${mark.target}) does not exist.`);
	}
	if (mark.type === 1 && !isStudentExist(mark.target)) {
		return console.log(actionType, `Student with this ID (${mark.target}) does not exist.`);
	}
	if (!isTaskExist(mark.taskID)) {
		return console.log(actionType, `Task with ID ${mark.taskID} does not exist.`);
	}

	if (!mark.mark) {
		return console.log(actionType, 'Please provide a mark 1-10');
	} else if (mark.mark > 10 || mark.mark < 1) {
		return console.log(actionType, 'Mark must be in 1-10 only!');
	}

	marks.push(mark);
	return console.log(actionType, `Mark ${mark.mark} was successfully set on (${mark.target})`);
}

// setMark({type: 2, target: 1, taskID: 0, mark: 7});


// This is the function for student
// to make a priority-oriented list of the teachers he/she wants to be in a group of.
function createStudentPriorityList (list) {
	if (typeof list.studentID === 'undefined') {
		return console.log('Provide the id of the student and the list of the teachers, please.');
	}
	// Check if all the teachers are in the list, that provided.
	// All teachers must be in the list.
	if (list.teachersList.length !== teachers.length) {
		console.log(`There're ${students.length} teachers there. And only ${list.studentsList.length} was(were) given.`);
		return console.log('All the students must be in list.');
	}
	if (!areTeachersInListExist(list.teachersList)) {
		return console.log('Fix the bug above to continue.');
	}

	list.id = studentPriorityList.length;
	studentPriorityList.push(list);
	return console.log(`Priority list of teachers for the student ${list.teacherID} has been created successfully.`);
}

// createStudentPriorityList({
	// studentID: 0,
	// teachersList: [0, 1, 2]
// });

// This is the function for teacher
// to make a priority-oriented list of the student he/she wants to teach.
function createTeacherPriorityList (list) {
	if (typeof list.teacherID === 'undefined') {
		return console.log('Provide the id of the student and the list of the teachers, please.');
	}
	// Check if all the teachers are in the list, that provided.
	// All teachers must be in the list.
	if (list.studentsList.length !== students.length) {
		console.log(`There're ${students.length} students there. And only ${list.studentsList.length} was(were) given.`);
		return console.log('All the students must be in list.');
	}
	if (!areStudentsInListExist(list.studentsList)) {
		return console.log('Fix the bug above to continue.');
	}
	list.id = teacherPriorityList.length;
	teacherPriorityList.push(list);
	return console.log(`Priority list of students for the teacher ${list.teacherID} has been created successfully.`);
}

createTeacherPriorityList({
	teacherID: 0,
	studentsList: [0, 1, 2]
});



// The description and philosophy of the principles of
// the following algorithm in the README.md
function getRating () {

}

function sortTeachersByRating () {

}

function sortStudentsByRating () {

}

function spreadStudentsBetweenTeachers () {

}

function getTest () {
	
}





