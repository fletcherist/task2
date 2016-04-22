teachers = [
 {
 	id: 0,
 	name: 'Аристотель',
 	surname: '',
 	rating: 0,
 },
 {
 	id: 1,
 	name: 'Дейл',
 	surname: 'Карнеги',
 	rating: 0
 },
 {
 	id: 2,
 	name: 'Константин',
 	surname: '(Дмитриевич) Ушинский',
 	rating: 0
 }
];

students = [];
groups = [];
tasks = [];
marks = [];

studentPriorityList = [];
teacherPriorityList = [];

studentsAndTeachersSorted = [];

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
	student.rating = 0;
	students.push(student);
	return console.log(actionType, `Student ${student.name} ${student.surname} has been added successfully.`);
}

addStudent({name: 'Issac', surname: 'Newton', phone: '+79109732483'});
addStudent({name: 'Mark', surname: 'Twen', phone: '+79109732483'});
addStudent({name: 'Fyodor', surname: 'Dostoevsky', phone: '+79109732483'});
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
// createGroup('The Guardians', [1, 2]);
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
	var actionType = '[createStudentPriorityList]:';
	if (typeof list.studentID === 'undefined') {
		return console.log(actionType, 'Provide the id of the student and the list of the teachers, please.');
	}
	// Check if all the teachers are in the list, that provided.
	// All teachers must be in the list.
	if (list.teachersList.length !== teachers.length) {
		console.log(actionType, `There're ${students.length} teachers there. And only ${list.studentsList.length} was(were) given.`);
		return console.log('All the students must be in list.');
	}
	if (!areTeachersInListExist(list.teachersList)) {
		return console.log(actionType, 'Fix the bug above to continue.');
	}

	list.id = studentPriorityList.length;
	studentPriorityList.push(list);
	return console.log(actionType, `Priority list of teachers for the student ${list.studentID} has been created successfully.`);
}

createStudentPriorityList({
	studentID: 0,
	teachersList: [0, 1, 2]
});
createStudentPriorityList({
	studentID: 1,
	teachersList: [0, 1, 2]
});
createStudentPriorityList({
	studentID: 2,
	teachersList: [0, 1, 2]
});

// This is the function for teacher
// to make a priority-oriented list of the student he/she wants to teach.
function createTeacherPriorityList (list) {
	var actionType = '[createTeacherPriorityList]:';
	if (typeof list.teacherID === 'undefined') {
		return console.log(actionType, 'Provide the id of the student and the list of the teachers, please.');
	}
	// Check if all the teachers are in the list, that provided.
	// All teachers must be in the list.
	if (list.studentsList.length !== students.length) {
		console.log(actionType, `There're ${students.length} students there. And only ${list.studentsList.length} was(were) given.`);
		return console.log('All the students must be in list.');
	}
	if (!areStudentsInListExist(list.studentsList)) {
		return console.log(actionType, 'Fix the bug above to continue.');
	}
	if (!teacherWithIdExists(list.teacherID)) {
		return console.log(actionType, 'Teacher with this id does not exists.');
	}
 	// If already exists with this id return false!
	if (findTeacherPriorityListById(list.teacherID)) {
		return console.log(actionType, 'There is already a list of ' + list.teacherID + ' teacher.');
	}

	list.id = teacherPriorityList.length;
	teacherPriorityList.push(list);
	return console.log(actionType, `Priority list of students for the teacher ${list.teacherID} has been created successfully.`);
}

// Utility function.
function findTeacherPriorityListById (id) {
	for (var i = 0; i < teacherPriorityList.length; i++) {
		if (teacherPriorityList[i].teacherID === id) {
			return true;
		}
	}
	return false;
}

function teacherWithIdExists (id) {
	for (var i = 0; i < teachers.length; i++) {
		if (teachers[i].id === id) {
			return true;
		}
	}
	return false;
}

createTeacherPriorityList({
	teacherID: 0,
	studentsList: [0, 1, 2]
});
createTeacherPriorityList({
	teacherID: 1,
	studentsList: [0, 1, 2]
});
createTeacherPriorityList({
	teacherID: 2,
	studentsList: [0, 1, 2]
});


// The description and philosophy of the principles of
// the following algorithm in the README.md
function getStudentsRating () {
	var actionType = '[getStudentsRating]:';
	// if the length of the teachers array
	// does not equal to the length of teachers priority list
	// show error message
	if (teachers.length !== teacherPriorityList.length) {
		console.log(`Only ${teacherPriorityList.length} of ${teachers.length} has provided`);
		return console.log(actionType, 
			'All teachers must make the priority lists before calculating the Rating.');
	}
	// Clear rating 
	// before creating a new one.
	clearStudentsRating();
	// Go through the teachers.
	for (var i = 0; i < teacherPriorityList.length; i++) {
		// Go thorugh the exacly teachers PRIORITY list.
		// VAR E IS THE STUDENT ID.
		var studentsList = teacherPriorityList[i].studentsList;
		for (var e = 0; e < studentsList.length; e++) {
			// Rating is the power (the place)
			// 0 place = 3 points of rating if 3 students are there.
			var RATING = studentsList.length - studentsList[e];
			// Let's implement this now.
			students[e].rating += RATING;
		}
	}
	return console.log(actionType, 'All students were got the rating.');
}
getStudentsRating();


function clearStudentsRating () {
	for (var i = 0; i < students.length; i++) {
		students[i].rating = 0;
	}
}

function clearTeachersRating () {
	for (var i = 0; i < teachers.length; i++) {
		teachers[i].rating = 0;
	}
}

function getTeachersRating () {
	var actionType = '[getTeachersRating]:';
	if (students.length !== studentPriorityList.length) {
		console.log(`Only ${studentPriorityList.length} of ${students.length} has provided`);
		return console.log(actionType, 
			'All students must make the priority lists before calculating the Rating.');
	}
	clearTeachersRating();
	for (var i = 0; i < studentPriorityList.length; i++) {
		var teachersList = studentPriorityList[i].teachersList;
		for (var e = 0; e < teachersList.length; e++) {
			var RATING = teachersList.length - teachersList[e];
			teachers[e].rating += RATING;
		}
	}
	return console.log(actionType, 'All teachers were got the rating.');
}

getTeachersRating();

function sortTeachersByRating () {
	teachers.sort(function (a, b) {
		if (a.rating > b.rating) {
			return -1;
		} else {
			return 1
		}
	});
	console.log(teachers);
}

sortTeachersByRating();
sortStudentsByRating();

function sortStudentsByRating () {
	students.sort(function (a, b) {
		if (a.rating > b.rating) {
			return -1;
		} else {
			return 1
		}
	});
	console.log(students);
}

function sortStudentsBetweenTeachers () {
	// How many students on 1 teacher?
	var k = Math.floor(students.length / teachers.length);
	for (var i = 0; i < teachers.length; i++) {
		var sortedPair = {
			teacher: teachers[i].id,
			students: []
		}
		studentsAndTeachersSorted.push(sortedPair);
	}
	console.log(k);
	
}
sortStudentsBetweenTeachers();





