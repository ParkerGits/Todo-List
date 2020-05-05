let taskList = [];
class Task
{
  constructor(taskName)
  {
    this.taskName = taskName;

    this.taskElement = document.createElement("li");
    this.taskNameElement = document.createElement("label");
    this.taskNameElement.innerHTML = this.taskName;

    this.deleteButton = document.createElement("button");
    this.deleteButton.innerHTML = "Delete";
    this.deleteButton.id = "deleteButton"

    this.editButton = document.createElement("button");
    this.editButton.innerHTML = "Edit";
    this.editButton.id = "editButton";

    this.editInput = document.createElement("input");
    this.editInput.placeholder = "Edit Task..."
    this.editInput.style.display = "none";

    this.doneEditingButton = document.createElement("button");
    this.doneEditingButton.innerHTML = "Done";
    this.doneEditingButton.style.display = "none";
    this.doneEditingButton.id = "doneEditingButton"

    this.taskWrapper = document.createElement("div");
    this.taskWrapper.id = "taskWrapper";

    this.taskElement.appendChild(this.editInput);
    this.taskElement.appendChild(this.doneEditingButton);
    this.taskElement.appendChild(this.taskNameElement);
    this.taskElement.appendChild(this.editButton);
    this.taskElement.appendChild(this.deleteButton);

    this.taskWrapper.appendChild(this.taskElement);

    document.getElementById("taskList").appendChild(this.taskWrapper);
  }
}

let clearAllButton = document.getElementById("clearAllButton");

document.getElementById("submitButton").addEventListener("click", function() {
  let newTaskInput = document.getElementById("newTaskInput");
  if(newTaskInput.value != "")
  {
    let newTask = new Task(newTaskInput.value);
    taskList.push(newTask);
    newTask.deleteButton.addEventListener("click", function(){
      newTask.taskWrapper.remove();
      taskList.splice(taskList.findIndex(function(task){
        return task === newTask;
      }), 1);
      console.log(taskList);
      if(taskList.length==0)
      {
        clearAllButton.style.display = "none";
      }
    })
    newTask.editButton.addEventListener("click", function(){
      newTask.taskNameElement.style.display = "none";
      newTask.deleteButton.style.display = "none";
      newTask.editButton.style.display = "none";
      newTask.editInput.style.display = "inline";
      newTask.editInput.value = newTask.taskName;
      newTask.doneEditingButton.style.display = "inline";
    })
    newTask.doneEditingButton.addEventListener("click", function(){
      newTask.taskName = newTask.editInput.value;
      newTask.taskNameElement.innerHTML = newTask.taskName;
      newTask.taskNameElement.style.display = "inline";
      newTask.deleteButton.style.display = "inline";
      newTask.editButton.style.display = "inline";
      newTask.editInput.style.display = "none";
      newTask.doneEditingButton.style.display = "none";
      console.log(taskList);
    })
    newTaskInput.value = "";
    console.log(taskList);
    if(taskList.length == 1)
    {
      clearAllButton.style.display = "inline";
    }
  }
})

clearAllButton.addEventListener("click", function(){
  taskList.forEach(task => {
    task.taskWrapper.remove()
  });
  taskList.splice(0, taskList.length);
  clearAllButton.style.display = "none";
  console.log(taskList);
})
