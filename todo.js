let form_ele=document.getElementById("form");
let taskbox=document.getElementById("text-box");
let displayTask=document.querySelector("#list");
let tasks;
let flag=false;
let pos=0;
form_ele.addEventListener('submit',(e)=>{
  e.preventDefault();
  let task=taskbox.value;
  if(!flag){
 //localStorage.clear();
   tasks=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
  tasks.unshift(task);
  localStorage.setItem("tasks",JSON.stringify(tasks));
}else{
  tasks.splice(pos,1,task);
  localStorage.setItem("tasks",JSON.stringify(tasks));
  flag=false;
}
  console.log(tasks);
  display(tasks);
  taskbox.value='';
});

function display(tasks){
    if(tasks.length!=0){
        let eachTask=''
       tasks.forEach((task,i) => {
        eachTask+=`<list class="list-group-item list-group-item-light text-dark">
                            <button class="btn float-end"  onclick="deleteTask(${i})"><i class="fa-solid fa-trash"></i></button>
                            <button class="btn float-end"  onclick="edit(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
                            ${task}
                          </list>`
       });
       displayTask.innerHTML=eachTask;
    }
    else{
        displayTask.innerHTML=`<list class="list-group-item list-group-item-light bg-dark text-white">No Task Available</li>`;
    }
    
}
function edit(index){
  flag=true;
  pos=index;
  taskbox.value=tasks[index];
}

function deleteTask(index){
    tasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    display(tasks);
}