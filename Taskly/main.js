document.addEventListener("DOMContentLoaded", () => {
	const inputText = document.querySelector("input.add-text");
	const moodimage = document.querySelector("img");
	const emptyTask = document.getElementsByClassName(
		"No-items-in-list-Add-your-new-task"
	)[0];
	const taskList = document.querySelector("ul.task-list");

	
	function loadTasks() {
		const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		tasks.forEach(task => addTaskToList(task.text, task.completed));
		if (tasks.length > 0) {
			document.querySelector("span.No-items-in-list-Add-your-new-task").style.display = "none";
			document.querySelector("img").style.display = "none";
		}
	}

	
	function saveTasks() {
		const tasks = [];
		taskList.querySelectorAll("li").forEach(task => {
			const text = task.querySelector("p").textContent;
			const completed = task.querySelector("p").classList.contains("task-complete");
			tasks.push({ text, completed });
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	function addTaskToList(text, completed = false) {
		let newTask = document.createElement("li");
		taskList.appendChild(newTask);
		newTask.classList.add("list-items");
		let icon = document.createElement("i"),
			textElement = document.createElement("p");
		deleteicon = document.createElement("i");
		newTask.appendChild(icon);
		newTask.appendChild(textElement);
		newTask.appendChild(deleteicon);
		icon.classList.add("material-icons", "task-status");
		icon.textContent = completed ? "check_circle" : "panorama_fish_eye";

		textElement.textContent = text;
		if (completed) {
			textElement.classList.add("task-complete");
		}

		deleteicon.classList.add("material-icons", "delete");
		deleteicon.textContent = "delete";

		newTask.addEventListener("click", () => {
			textElement.classList.toggle("task-complete");
			if (textElement.classList.contains("task-complete")) {
				icon.textContent = "check_circle";
			} else {
				icon.textContent = "panorama_fish_eye";
			}
			saveTasks();
		});
		deleteicon.addEventListener("click", () => {
			newTask.remove();
			if (taskList.hasChildNodes() == false) {
				document.querySelector("span.No-items-in-list-Add-your-new-task").style.display = "block";
				document.querySelector("img").style.display = "block";
			}
			saveTasks();
		});
	}

	function addnewTask() {
		console.log(inputText.value);
		if (inputText.value == "" && taskList.hasChildNodes() == false) {
			console.log(moodimage);
			console.log(emptyTask);
			moodimage.src = "/assets/angry-image.svg";
			const moodchange = () => {
				emptyTask.textContent = "Enter a proper task!";
			};
			moodimage.onload = moodchange;
		} else if (inputText.value != "") {
			moodimage.src = "assets/resting.svg";
			const propertaskAdded = () => {
				emptyTask.textContent = "No items in list. Add your new task";
			};
			moodimage.onload = propertaskAdded;
			document.querySelector(
				"span.No-items-in-list-Add-your-new-task"
			).style.display = "none";
			document.querySelector("img").style.display = "none";

			addTaskToList(inputText.value);
			inputText.value = "";
			saveTasks();
		}
	}

	inputText.addEventListener("keydown", (e) => {
		if (e.key == "Enter") {
			addnewTask();
		}
	});
	document.getElementsByClassName("button")[0].addEventListener("click", () => {
		addnewTask();
	});

	
	loadTasks();
});
