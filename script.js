function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const TaskTable = document.getElementById("template");
TaskTable.remove();
TaskTable.removeAttribute("id");

const TaskList = document.getElementById("task-list");
const AppendBtn = document.getElementById("append");
const PrependBtn = document.getElementById("prepend");
const SaveBtn = document.getElementById("save");
const textCount = {
  root: document.getElementById("text-count"),
  saved: 0,
};
const filterBtn = document.getElementById("filter");

let Msg = [
  ["Name?", "Name...", "Name me, please!"],
  [
    "Attributes?",
    "Some Text...",
    "Yeah, let's GO",
    "post me!",
    "put info into me!",
  ],
];

function save() {
  let tasks = [];
  let _task = {
    name: "",
    description: "",
    style: [],
  };

  for (let task of TaskList.children) {
    _task.name = task.children[0].children[0].value;
    _task.description = task.children[0].children[1].value;
    _task.style = [
      task.children[0].children[1].style.width,
      task.children[0].children[1].style.height,
    ];
    console.table(_task);
    tasks.push(structuredClone(_task));
  }
  textCount.saved = tasks.length;
  localStorage.setItem("list", JSON.stringify(tasks));
}

function showSave(isSave) {
  SaveBtn.disabled = !isSave;
  if (isSave) {
    SaveBtn.style.animationName = "show";
    SaveBtn.style.bottom = "20px";
    return;
  }
  SaveBtn.style.animationName = "hide";
  SaveBtn.style.bottom = "-40px";
}

AppendBtn.onclick = () => {
  let clone = TaskTable.cloneNode(true);

  clone.addEventListener("click", () => {
    showSave(true);
  });

  let array = clone.children[0].children;
  for (let i of [0, 1]) {
    array[i].placeholder = Msg[i][randInt(0, Msg[i].length - 1)];
  }
  TaskList.append(clone);
  let DelBtn = clone.children[1];
  DelBtn.onclick = () => {
    DelBtn.parentElement.remove();
    showSave(true);
  };

  showSave(true);
};

PrependBtn.onclick = () => {
  let clone = TaskTable.cloneNode(true);

  clone.addEventListener("click", () => {
    showSave(true);
  });

  let array = clone.children[0].children;
  for (let i of [0, 1]) {
    array[i].placeholder = Msg[i][randInt(0, Msg[i].length - 1)];
  }
  TaskList.prepend(clone);
  let DelBtn = clone.children[1];
  DelBtn.onclick = () => {
    DelBtn.parentElement.remove();
    showSave(true);
  };

  showSave(true);
};

filterBtn.onclick = () => {
  for (let task of TaskList.children) {
    if (task.style.display == "none") task.style.display = "flex";
    else if (task.children[0].children[1].value < 10) task.style.display = "none";
  }
};

/// loadsing

let list = JSON.parse(localStorage.getItem("list"));
if (list != null && list != undefined) {
  list.forEach((task) => {
    append(task);
  });
}

function append(msg) {
  let clone = TaskTable.cloneNode(true);

  clone.addEventListener("click", () => {
    showSave(true);
  });

  let array = clone.children[0].children;
  for (let i of [0, 1]) {
    array[i].placeholder = Msg[i][randInt(0, Msg[i].length - 1)];
  }
  array[0].value = msg.name;
  array[1].value = msg.description;
  array[1].style.width = msg.style[0];
  array[1].style.height = msg.style[1];
  TaskList.append(clone);
  let DelBtn = clone.children[1];
  DelBtn.onclick = () => {
    DelBtn.parentElement.remove();
    showSave(true);
  };
}

textCount.saved = [...TaskList.children].reduce((acc, cur) => acc + 1, 0);
textCount.root.textContent = `${textCount.saved} Tasks:`;

document.body.addEventListener("click", () => {
  textCount.root.textContent = `${[...TaskList.children].reduce(
    (acc, cur) => acc + 1,
    0
  )} Tasks (${textCount.saved} saved):`;
});

SaveBtn.onclick = (e) => {
  save();
  showSave(false);
};
