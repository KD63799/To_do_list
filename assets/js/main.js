  // Ajout de tâches
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      return;
    }

    const listItem = document.createElement("li");

    // Création et configuration de la tâche marquée comme complétée
    const task = document.createElement("span");
    task.textContent = taskText;
    task.classList.add("task");

    const checkMark = document.createElement("button");
    checkMark.textContent = "✓";
    checkMark.classList.add("check");
    checkMark.addEventListener("click", () => {
      listItem.classList.toggle("completed");
    });

    // Ajout de la classe "completed" si la tâche est ajoutée complétée
    if (taskInput.getAttribute("data-completed") === "true") {
      listItem.classList.add("completed");
      task.classList.add("completed");
    }

    listItem.appendChild(task);
    listItem.appendChild(checkMark);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✕";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      taskList.removeChild(listItem);
      updateTaskCount();
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
    taskInput.value = "";
    taskInput.removeAttribute("data-completed");

    updateTaskCount();
  }

  taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      // Définition de l'attribut "data-completed" comme "true" pour marquer la tâche comme complétée lors de l'ajout
      if (taskInput.value.trim().slice(-1) === "✔") {
        taskInput.setAttribute("data-completed", "true");
        taskInput.value = taskInput.value.trim().slice(0, -1);
      }

      addTask();
    }
  });
  // Mise à jour dynamique du titre avec le nombre de tâches à faire
  function updateTaskCount() {
    const pendingTasks = document.querySelectorAll(
      "#taskList li:not(.completed) .task"
    );
    const taskCount = pendingTasks.length;

    const title = document.querySelector(".todo-app h1");
    title.textContent = `Ma liste de tâches (${taskCount})`;
  }

  // Appel initial de la fonction updateTaskCount
  updateTaskCount();


  