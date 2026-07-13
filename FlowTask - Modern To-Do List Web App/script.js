class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("flowTasks")) || [];
        this.filter = "all";

        this.init();
    }

    init() {
        this.render();
        this.updateProgress();

        document
            .getElementById("addBtn")
            .addEventListener("click", addTask);

        document
            .getElementById("taskInput")
            .addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    addTask();
                }
            });

        document
            .querySelectorAll(".filter-btn")
            .forEach(btn => {
                btn.addEventListener("click", () => {

                    document
                        .querySelectorAll(".filter-btn")
                        .forEach(b => b.classList.remove("active"));

                    btn.classList.add("active");

                    this.setFilter(btn.dataset.filter);
                });
            });
    }

    save() {
        localStorage.setItem(
            "flowTasks",
            JSON.stringify(this.tasks)
        );

        this.updateProgress();
    }

    add(text) {
        this.tasks.unshift({
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toLocaleString()
        });

        this.save();
        this.render();
    }

    toggle(id) {
        const task = this.tasks.find(t => t.id === id);

        if (task) {
            task.completed = !task.completed;
            this.save();
            this.render();
        }
    }

    delete(id) {
        this.tasks = this.tasks.filter(
            task => task.id !== id
        );

        this.save();
        this.render();
    }

    edit(id, text) {
        const task = this.tasks.find(
            t => t.id === id
        );

        if (task && text.trim()) {
            task.text = text.trim();
            this.save();
        }
    }

    setFilter(filter) {
        this.filter = filter;
        this.render();
    }

    getFilteredTasks() {

        if (this.filter === "active") {
            return this.tasks.filter(
                t => !t.completed
            );
        }

        if (this.filter === "completed") {
            return this.tasks.filter(
                t => t.completed
            );
        }

        return this.tasks;
    }

    updateProgress() {

        const total = this.tasks.length;

        const completed =
            this.tasks.filter(
                t => t.completed
            ).length;

        const percent =
            total === 0
                ? 0
                : Math.round(
                      completed / total * 100
                  );

        document.getElementById(
            "progressFill"
        ).style.width = percent + "%";

        document.getElementById(
            "progressText"
        ).textContent = percent + "%";
    }

    render() {

        const taskList =
            document.getElementById("taskList");

        const emptyState =
            document.getElementById("emptyState");

        const tasks =
            this.getFilteredTasks();

        if (tasks.length === 0) {

            taskList.innerHTML = "";
            emptyState.style.display = "block";

            return;
        }

        emptyState.style.display = "none";

        taskList.innerHTML = tasks
            .map(task => `
            <li class="task-item ${task.completed ? "completed" : ""}">
                
                <div class="checkbox ${task.completed ? "checked" : ""}"
                    onclick="taskManager.toggle(${task.id})">
                </div>

                <div class="task-content">
                    <div class="task-text"
                         contenteditable="true"
                         onblur="taskManager.edit(${task.id}, this.innerText)">
                        ${task.text}
                    </div>

                    <span class="task-date">
                        ${task.createdAt}
                    </span>
                </div>

                <div class="task-actions">
                    <button class="icon-btn delete-btn"
                            onclick="taskManager.delete(${task.id})">
                        Delete
                    </button>
                </div>

            </li>
        `)
            .join("");
    }
}

const taskManager = new TaskManager();

function addTask() {

    const input =
        document.getElementById("taskInput");

    const text = input.value.trim();

    if (!text) return;

    taskManager.add(text);

    input.value = "";
    input.focus();
}