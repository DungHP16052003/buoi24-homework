/**
 * - Nếu có công việc cần làm thì hiển thị công việc cần làm (gợi ý: dạng bảng).
 * - Có thể thêm công việc mới.
 * - Cập nhật thông tin công việc.
 * - Xóa công việc.
 * - Sắp xếp, lọc công việc.
 */
const todoForm = document.getElementById("todoForm");
const nameElement = document.getElementById("name");
const statusElement = document.getElementById("status");
const priorityElement = document.getElementById("priority");
const addBtn = document.getElementById("add-btn");
const resetBtn = document.getElementById("reset-btn")
const tasks = document.getElementById("task");
let taskSaved = JSON.parse(localStorage.getItem("tasks") || "[]" )
let taskEditTing = {
  id: null,
};
function randomId(n, prefix = "") {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = prefix;
    for (let i = 0; i < n; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  }
  console.log(randomId(1));
 todoForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    if(taskEditTing.id){
      const task1 = {
        ...taskEditTing,
        name : nameElement.value,
        status : statusElement.value,
        priority: priorityElement.value,
      };
    }else{
      const task1 = {
        name : nameElement.value,
        status : statusElement.value,
        priority: priorityElement.value,
        id: randomId(1),
    };
    }
    const task1 = {
        name : nameElement.value,
        status : statusElement.value,
        priority: priorityElement.value,
        id: randomId(1),
    };

    taskSaved.push(task1);
    tasksSaved(taskSaved);
    resetTask();
 })
 function tasksSaved(task2 = []){
    tasks.innerText = "";
    task2.forEach(item =>{
        let trElement = document.createElement("tr");
        console.log(item);
					trElement.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.status}</td>
                <td>${item.priority}</td>
                <td>
                   <button class="btn btn-primary" onclick = "updateTask('${item.id}')">Update</button>
                    <button class="btn btn-danger" onclick="removeTask('${item.id}')">Delete</button>
                </td>
            </tr>
        `;
        tasks.appendChild(trElement);
        localStorage.setItem("task2", JSON.stringify(task2));

    })
 }
 function toggleStatus(id) {
    taskSaved = taskSaved.map((item) => {
      if (item.id === item) {
        item.status === !item.status;
      }
      return item;
    });
    tasksSaved(taskSaved);
  }
  function removeTask(id){
     if(window.confirm("Are you sure!")){
    taskSaved = taskSaved.filter((item) =>item.id !== id);
    taskSaved = taskSaved.filter((task) =>task.id !== id);
    tasksSaved(taskSaved);
     }
  }
  function updateTask(id){
     taskEditTing = taskSaved.find((item) => item.id === id);
     taskEditTing = taskSaved.find((task)=> task.id === id);
     nameElement.value = taskEditTing.name;
     statusElement.value = taskEditTing.status;
     priorityElement.value = taskEditTing.priority;
  }
  function resetTask(){
    todoForm.reset();
  }
  function removeAll(){
    taskSaved = [];
    tasksSaved();
  }
 tasksSaved(taskSaved);

fetch("http://localhost:3000/task")
	.then((res) => res.json())
	.then((data) => {
    tasks.innerText = "";
			 data.forEach((task) => {
					console.log(task);
                    let trElement1 = document.createElement("tr");
					trElement1.innerHTML += `
            <tr>
                <td>${task.id}</td>
                <td>${task.name}</td>
                <td>${task.status}</td>
                <td>${task.priority}</td>
                <td>
                   <button class="btn btn-primary" onclick = "updateTask('${task.id}')">Update</button>
                    <button class="btn btn-danger" onclick="removeTask('${task.id}')">Delete</button>
                </td>
            </tr>
        `;
        tasks.appendChild(trElement1);
        localStorage.setItem("data", JSON.stringify(data));

			  })
	});