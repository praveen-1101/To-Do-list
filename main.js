
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(index));
    li.appendChild(checkbox);

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.className = task.completed ? 'completed' : '';
    li.appendChild(taskText);
    
   
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    editButton.onclick = () => editTask(index);
    li.appendChild(editButton);
   
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.onclick = () => deleteTask(index);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}


function addTask() {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    renderTasks();
    taskInput.value = '';
    updateLocalStorage();
  }
  else 
  {
    alert('Task cannot be empty');
  }
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    renderTasks();
    updateLocalStorage();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  updateLocalStorage();
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();
