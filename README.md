# Задание второе — библиотека на JS.

В теории библиотека подключается на страницу. Если бы в сутках было больше часов, я бы с удовольствием написал веб версию с её использованием.

Я занял имена «teachers, students, groups, tasks, marks». А также «studentPriorityList, teacherPriorityList, studentsAndTeachersSorted» — для алгоритма сортировки, на котором хочу остановиться поподробнее.

## Описание методов

#### `addStudent({name, surname, phone})`

Добавляет студента в список студентов. 
name, surname, phone — strings, required.

#### `createGroup(name, students)`

Создаёт группу из студентов.
- name - имя группы
- students — массив из ID студентов.

#### `createTask({type, name, description, participants})`

Создаёт задание.
- type — тип задания (индивидуальный/групповой). 1 — групповое, 2 — индивидуальное.
- name — название задания
- description
- participatns — если type индивидуальный, то ID студента. Если групповой, то ID группы.

#### `setMark({type, target, taskID, mark})`

Ставит оценку.
- type — тип задания, за которое ставится оценка (индивидуальный/групповой) 1 — групповое, 2 — индивидуальное.
- target — если type индивидуальный, то ID студента. Если групповой, то ID группы.
- taskID — ID задания, за которое ставится оценка.
- mark — оценка от 1-10

#### `createStudentPriorityList({studentID, teachersList})`

Создает приоретизированный список менторов.
- studentID — ID студента.
- teachersList — Массив ID менторов в порядке убывания согласно приоритету /ex [0, 1, 2]

#### `createTeacherPriorityList({teacherID, studentsList})`

Создаёт приоретизированный список учеников.
- teacherID — ID ментора
- studentsList — Массив ID учеников в порядке убывания согласно принципу удовольствия /ex [0, 1, 3, 2]

#### `getStudentsRating()`

Присваивает каждому ученику рейтинг, согласно месту, который он занимает в приоритезированном списке менторов.

#### `getTeachersRating()`

Присваивает каждому ментору рейтинг, согласно месту, котороый он занимает в приоритезированном списке учеников.

#### `sortStudentsBetweenTeachers()`

Подбирает каждому ментору учеников согласно алгоритму, принцип работы которого описан ниже.

# Философия алгоритма сортировки.
Когда мы говорим о какой-либо приоритезированной сортировке, лучше всего, идя в этом направлении, смотреть на то, как это делает самый великолепнейший из механизмов на этой планете — природа — сама естественность. Смотреть, как она подбирает и определяет каждому своё место в этом мире. Именно поэтому, с моей стороны будет разумно использовать её часть её методологии, а именно, — метод дарвинского подбора. 

Говоря об этом методе в контексте разрабатываемого нами алгоритма, мы не сможем обойтись без следующий понятий: «Рейтинг», «Сильный», и «Слабый». Определение каждому я пытаюсь дать ниже:

*Рейтинг* — суть число, показывающее коэффициент значимости участника (ученика либо ментора) в списке. Рейтинг каждого участника рассчитывается из приоритезированных списков, составленный учениками и менторами в зависимости от текущего его положения (см. подробнее в коде)

*Сильный* — есть участник с наибольшим рейтингом.


*Слабый* — есть участник с наименьшим рейтингом.

Наша задача состоит в том, чтобы найти сильным менторам сильных учеников, средним — средних, а слабым — соответственно тех, кто останется. Это главная концепция, которую я взял за основу строения. 

Ученики делают свой выбор в пользу менторов — к которым они хотят пойти —, тем самым присваивая каждому из них определённый рейтинг.

Менторы, в свою очередь, приоретизированно выбирают учеников, тем самым присваивая каждому из них рейтинг.

Дальше сортируем и тех и других по рейтингу, и вычисляем пары. Всё.

## Плюсы подхода

1. Достигаем гармонии и баланса. У нас у каждого ментора средне-равное количество учеников.
2. Избегаем Вавилонского столпотворения. У нас сильные менторы будут говорить на одном языке с сильными учениками, и наоборот.


#### PS.

Я заранее прошу прощения, если я каким-то образом вызвал раздражение, обиду или недоумение у читающих тут про естественный отбор, сильных и слабых. Я ещё раз извиняюсь, но в защиту скажу, что это всего лишь филосфская концепция, и ничего более, и что у меня не было умысла кому-либо навредить. 
