const button = document.getElementById('save');
const input = document.getElementById('input');
const list = document.getElementById('list');
const btn = document.getElementById('add');
const details = document.getElementById('details');
const box = document.getElementById('box');
const searchInput = document.getElementById('searchInput');
const title1 = document.getElementById('title1')
const title = document.getElementById('title');
let num = 0;

function addTask(task, show) {
    let lists = JSON.parse(localStorage.getItem('tasks')) || [];
    let obj = {
        task: task,
        show: show,
    };
    lists.push(obj);
    localStorage.setItem('tasks', JSON.stringify(lists));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function print(tasks) {
    const details = document.getElementById('details');
    details.innerHTML = "";
    tasks.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = 'task';
        item.innerHTML = `
            <div id="box" onclick='openUpdateForm(${index})'>
                <p id='center'>${task.task}</p>
                <hr>
                <p id='content'>${task.show}</p> 
                <div id='circle'></div> 
                <div class="button">   
                    <i id="delete" class="material-icons" onclick="remove(${index})">&#xe872;</i>
                </div>
            </div>`;

        const circle = item.querySelector('#circle');
        rand(circle);
        details.append(item);
    });
}

input.addEventListener('click', function (event) {
    event.stopPropagation();
    input.style.background = 'rgb(210, 233, 248)';
    input.style.transition = '1s';
})

function add() {
    list.innerHTML = "";
    num++;

    let item = document.createElement('div');
    item.innerHTML = `<div><textarea type="text" id='event' class="description" id="description${num}" placeholder="Description"></textarea>
        <button id="save" onclick="print(getTasks())">+</button></div>`;
    list.append(item);

    list.style.display = 'block';

    item.querySelector("button").addEventListener('click', function (e) {
        e.preventDefault();
        let task = input.value;
        const display = document.querySelector('.description');
        let show = display.value;
        input.value = '';
        display.value = '';

        if (show !== '') {
            addTask(task, show);
            print(getTasks());
        } else {
            alert('Please Enter Description');
        }
    });

}

function rand(circle) {
    const random = () => Math.floor(Math.random() * 255);
    circle.style.backgroundColor = `rgb(${random()}, ${random()}, ${random()})`;
}

input.addEventListener('click', function (e) {
    e.preventDefault();
    add();
});

print(getTasks());

function remove(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    print(tasks);
};

searchInput.addEventListener('click', function (event) {
    event.stopPropagation();
    searchInput.style.background = 'rgb(210, 233, 248)';
    searchInput.style.transition = '1s';
})

function searchNotes() {
    const search1 = document.getElementById('searchInput');
    const search = search1.value;

    search1.style.backgroundColor = 'rgb(210, 233, 248)';
    search1.style.transition = '1s';

    const tasks = getTasks();
    const filter = tasks.filter(task => {
        return task.task.includes(search);
    });
    console.log(filter);
    search1.style.backgroundColor = 'none';
    print(filter);
}

// document.body.addEventListener('click', function () {
//     input.style.backgroundColor = 'white';
//     // description.style.backgroundColor = 'white';
// })

function updateTask(index, task, details) {
    const tasks = getTasks();
    tasks[index].task = task;
    tasks[index].show = details;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    print(tasks);
}

function update(index) {
    const tasks = getTasks();
    const task = tasks[index];
    document.getElementById('taskInput').value = task.task;
    document.getElementById('detailsInput').value = task.show;
    document.getElementById('popupForm').style.display = 'block';
    document.getElementById('details').style.display = 'none';
    document.getElementById('openForm').style.display = 'none';
    document.getElementById('saveButton').addEventListener('click', function () {
        updateTask(index, document.getElementById('taskInput').value, document.getElementById('detailsInput').value);
        document.getElementById('popupForm').style.display = 'none';
        document.getElementById('details').style.display = 'block';
        document.getElementById('openForm').style.display = 'block';
    });
}

function openPopupForm() {
    document.getElementById('popupForm').style.display = 'block';
}

function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
}

document.getElementById('saveButton').addEventListener('click', function () {
    updateTask(num, document.getElementById('taskInput').value, document.getElementById('detailsInput').value);
    closePopup();
});

function openUpdateForm(index) {
    const tasks = getTasks();
    const task = tasks[index];
    document.getElementById('taskInput').value = task.task;
    document.getElementById('detailsInput').value = task.show;
    openPopupForm();
}

function remove(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    print(tasks);
}

print(getTasks());

document.getElementById('darkmode').addEventListener('click', toggle);

function toggle() {
    if(document.getElementById('darkmode').textContent == 'Light/Dark') {
        localStorage.setItem('theme', 'Dark');
        document.body.style.backgroundColor = 'black';
        darkmode.textContent = 'Dark/Light';
        input.textContent = 'white';
        input.style.color = 'white';
        input.style.backgroundColor = 'black';
        input.style.border = '1px solid white';
        title1.style.color = 'white';
        title.style.color = 'white';
        searchInput.style.backgroundColor = 'black';
        document.getElementById('taskInput').style.color = 'white';
        document.getElementById('taskInput').style.backgroundColor = 'black';
        document.getElementById('taskInput').style.border = '1px solid white';
        document.getElementById('detailsInput').style.color = 'white';
        document.getElementById('detailsInput').style.backgroundColor = 'black';
        document.getElementById('detailsInput').style.border = '1px solid white';
        document.body.style.color = 'white';
    } else {
        localStorage.setItem('theme', 'Light');
        document.body.style.backgroundColor = 'white';
        darkmode.textContent = 'Light/Dark';
        input.textContent = 'black';
        input.style.color = 'black';
        input.style.backgroundColor = 'white';
        input.style.border = '1px solid black';
        title1.style.color = 'black';
        title.style.color = 'black';
        searchInput.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    }
}

let a = localStorage.getItem('theme') || 'Light';

if(a=='Light') {
    document.body.style.backgroundColor = 'white';
    
    document.body.style.color = 'dark';
} else {
    document.body.style.backgroundColor = 'black';
    darkmode.textContent = 'Dark/Light';
        input.textContent = 'white';
        input.style.color = 'white';
        input.style.backgroundColor = 'black';
        input.style.border = '1px solid white';
        title1.style.color = 'white';
        title.style.color = 'white';
        searchInput.style.backgroundColor = 'black';
        document.getElementById('taskInput').style.color = 'white';
        document.getElementById('taskInput').style.backgroundColor = 'black';
        document.getElementById('taskInput').style.border = '1px solid white';
        document.getElementById('detailsInput').style.color = 'white';
        document.getElementById('detailsInput').style.backgroundColor = 'black';
        document.getElementById('detailsInput').style.border = '1px solid white';
    document.body.style.color = 'white';
}

