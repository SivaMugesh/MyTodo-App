let arr = [];
let input = document.getElementById("inp");
let btn = document.getElementById("btn");
let container = document.getElementById("show");

input.focus();

function hand() {
  this.classList.toggle("complete");
  //const tsval=this.innerText;
  const tid = this.id.toString();

  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    if (obj.id.toString() === tid) {
      obj.isCompleted = !obj.isCompleted;
    }
  }
  store();
}

function rem() {
  //const tsval=this.innerText;
  const tid = this.id.toString();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id.toString() === tid) {
      arr.splice(i, 1);
    }
  }
  store();
  this.remove();
}

function store() {
  localStorage.setItem("tasks", JSON.stringify(arr));
}

function get() {
  let lsval = localStorage.getItem("tasks");
  if (!lsval) return;
  lsval = JSON.parse(lsval);
  for (index of lsval) {
    create(index.value, index.isCompleted, index.tid);
    arr.push(index);
  }
}
get();

function create(val, isCompleted, tid) {
  newEl = document.createElement("div");

  newEl.textContent = val;
  newEl.setAttribute("id", tid);
  if (isCompleted) newEl.setAttribute("class", "add  complete");
  else newEl.setAttribute("class", "add");

  newEl.addEventListener("click", hand);
  newEl.addEventListener("dblclick", rem);

  container.append(newEl);
}

function add() {
  let val = input.value;
  if (val.length === 0) return alert("Please enter value");

  let count = 0;
  let valLength = val.length;
  for (i = 0; i < valLength; i++) {
    if (val[i] === " ") {
      count++;
    }
  }
  if (valLength === count) return alert("please enter");
  let year = new Date().getFullYear().toString();
  let month = new Date().getMonth().toString();
  let date = new Date().getDate().toString();
  let hour = new Date().getHours().toString();
  let min = new Date().getMinutes().toString();
  let sec = new Date().getSeconds().toString();
  let msec = new Date().getMilliseconds().toString();
  let hs = year + month + date + hour + min + sec + msec;

  let mat = Math.random().toString();

  let tid = mat + hs;
  obj = {};
  obj.value = val;
  obj.isCompleted = false;
  obj.id = tid;

  arr.push(obj);

  store();
  create(val, false, tid);
  input.value = " ";
}

btn.addEventListener("click", add);

document.addEventListener("keyup", (e) => {
  let tar = e.key;
  if (tar === "Enter") {
    add();
  }
});
