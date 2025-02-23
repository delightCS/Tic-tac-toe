function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(
        `Hi, my name is ${this.name} and I am ${this.age} years old.`
      );
    },
  };
}

const person1 = createPerson("Alice", 24);
const person2 = createPerson("Bob", 16);

person1.greet();
person2.greet();

(function () {
  console.log("This runs immediately");
})();

const Counter = (function () {
  let count = 0;
  return {
    increment() {
      count++;
      console.log(`Count: ${count}`);
    },
    decrement() {
      count--;
      console.log(`Count: ${count}`);
    },
    getCount() {
      return count;
    },
  };
})();
Counter.increment();
Counter.increment();
console.log(Counter.getCount());
Counter.increment();
console.log(Counter.getCount());
Counter.decrement();
console.log(Counter.getCount());

// CREATING REUSABLE UI COMPONENTS
function createButton(text, color) {
  return {
    text,
    color,
    render() {
      const btn = document.createElement("button");
      btn.textContent = this.text;
      btn.style.backgroundColor = this.color;
      btn.style.padding = "10px";
      btn.style.border = "none";
      btn.style.color = "white";
      btn.style.cursor = "pointer";
      document.body.appendChild(btn);
    },
  };
}

const primaryButton = createButton("Confirm", "green");
const deleteButton = createButton("Delete", "red");
const blueButton = createButton("Next", "blue");

primaryButton.render();
deleteButton.render();
blueButton.render();

// IIFE + MODULE PATTERN: CART SYSTEM
const CartModule = (function () {
  let cart = [];

  return {
    addItem(item) {
      cart.push(item);
      console.log(`${item} added to the cart.`);
    },
    removeItem(item) {
      cart = cart.filter((i) => i !== item);
      console.log(`${item} removed from cart`);
    },
    getCart() {
      return [...cart];
    },
  };
})();

CartModule.addItem("Laptop");
CartModule.addItem("Phone");
console.log(CartModule.getCart());
CartModule.removeItem("Phone");
console.log(CartModule.getCart());

// COMBINING BOTH FACTORY FUNCTIONS AND MODULE FOR A TASK MANAGER
function createTask(title, priority) {
  return {
    title,
    priority,
    showTask() {
      console.log(`[${this.priority}] [${this.title}]`);
    },
  };
}

const TaskManager = (function () {
  let tasks = [];
  return {
    addTask(title, priority) {
      const task = createTask(title, priority);
      tasks.push(task);
      console.log(`Task added ${title}`);
    },
    listTask() {
      tasks.forEach((task) => task.showTask());
    },
    clearTask() {
      tasks = [];
      console.log("All tasks cleared");
    },
  };
})();

TaskManager.addTask("Finish Project", "High");
TaskManager.addTask("Read JavaScript book", "Medium");
TaskManager.listTask();
TaskManager.clearTask();

// SIMPLE NOTE-TAKING APP
function createNote(title, content) {
  return {
    title,
    content,
    displayNote() {
      console.log(`${this.title}, ${this.content}`);
    },
  };
}

const NotesApp = (function () {
  let notes = [];
  return {
    addNote(title, content) {
      const note = createNote(title, content);
      notes.push(note);
      console.log(`Note added: ${title}`);
    },
    deleteNote(title) {
      notes = notes.filter((note) => note.title !== title);
      console.log(`Note deleted: ${title}`);
    },
    listNote() {
      notes.forEach((note) => note.displayNote());
    },
  };
})();

NotesApp.addNote("Grocery List", "Buy milk, egg and bread.");
NotesApp.addNote("First Day at Work", "It was a memorable moment in my life.");
NotesApp.listNote();
NotesApp.deleteNote("First Day at Work");
NotesApp.listNote();
