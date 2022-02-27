class TodoHelpers {
  static CreateTaskEntry(existingTasks, taskDescription) {
    const updatedTasks = existingTasks;

    updatedTasks.push({
      index: existingTasks.length + 1,
      description: taskDescription,
      completed: false,
      cleared: false,
    });

    return updatedTasks;
  }

  static DeleteTaskEntry(existingTasks, taskID) {
    const updatedTasks = [];

    existingTasks.forEach((task) => {
      if (task.index !== taskID) {
        updatedTasks.push({
          ...task,
          index: updatedTasks.length + 1,
        });
      }
    });

    return updatedTasks;
  }

  static UpdateTaskEntry(existingTasks, taskID, description) {
    const updatedTasks = [];

    existingTasks.forEach((task) => {
      updatedTasks.push({
        ...task,
        description: task.index === taskID ? description : task.description,
      });
    });

    return updatedTasks;
  }

  static UpdateTaskState(existingTasks, taskID, taskState) {
    const updatedTasks = [];

    existingTasks.forEach((task) => {
      updatedTasks.push({
        ...task,
        completed: task.index === taskID ? taskState : task.completed,
      });
    });

    return updatedTasks;
  }

  static UpdateClearedTasks(existingTasks) {
    const updatedTasks = [];

    existingTasks.forEach((task) => {
      if (task.completed === false) {
        updatedTasks.push({
          ...task,
        });
      }
    });

    return updatedTasks;
  }

  static UpdateTaskStore = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  static RetrieveTasks = () => {
    try {
      Array.from((JSON.parse(localStorage.getItem('tasks'))));
    } catch (err) {
      localStorage.setItem('tasks', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('tasks'));
  };

  static RenderTasks = (tasksList, tasksContainer) => {
    const filteredTasks = tasksList.filter((task) => task.cleared === false);
    if (filteredTasks.length > 0) {
      let tasksListHTML = '';
      filteredTasks.forEach((item) => {
        tasksListHTML += `<li class="list-item" id="item-${item.index}">
        <div class="left">
          <input id="check-${item.index}" type="checkbox" ${item.completed ? 'checked' : ''}/>
          <p class="description" id="description-${item.index}">${item.description}</p>
        </div>
        <div class="right">
          <button class="action-button" id="edit-${item.index}" type="button">
            <i class="fa-solid fa-pen-to-square button-icon"></i>
          </button> 
          <button class="action-button" id="delete-${item.index}" type="button">
            <i class="fa-solid fa-trash-can button-icon"></i>
          </button>           
        </div>
      </li>`;
      });
      tasksContainer.innerHTML = tasksListHTML;
    } else {
      tasksContainer.innerHTML = '';
    }
  };
}

export default TodoHelpers;