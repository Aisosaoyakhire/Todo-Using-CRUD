const taskDB = JSON.parse(localStorage.getItem("tasks"));

function displayTaskContent() {
  const id = localStorage.getItem("taskUuid");
  console.log(taskDB, "message");
  const task = taskDB.find((task) => task.uuid == id);
  console.log(task, id);
  const previewPage = document.getElementById("previewPage");
  previewPage.innerHTML = "";
  previewPage.innerHTML += `<div class="flex justify-between bg-white" >
                
                <div>
                    <input type="checkbox" class="mr-2  form-checkbox" ${
                      task.completed ? "checked" : ""
                    } onclick="toggleTask('${task.uuid}')">
                    <span class="task-text ${
                      task.completed ? "line-through" : ""
                    }">${task.text}</span>
                    </div>
                    
                
              
                <div class="flex flex-col-reverse items-center gap-2">
                <span>${task.date}</span>
                <span class = "cursor-pointer" onclick = addDescription('${
                  task.uuid
                }')>${task.description || "Add Description"}</span>
                <div class="flex items-center gap-5" >
                    <button onclick="editTask('${
                      task.uuid
                    }')" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg></button>
                    <button onclick="deleteTask('${
                      task.uuid
                    }')"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg></button>
                  </div>
                </div>
                </div>
   `;
}
function addDescription(uuid) {
  const task = taskDB.find((task) => task.uuid == uuid);
  console.log(uuid, task, "err");
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
    input: "text",
    inputValue: task.description || "Add description",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
      task.description = result.value;
      localStorage.setItem("tasks", JSON.stringify(taskDB));
      displayTaskContent();
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}
displayTaskContent();
