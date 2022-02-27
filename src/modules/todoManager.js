import TodoHelpers from './todoHelper.js';
import { TasksContainer, InputBox } from './elements.js';

const SetupTasks = () => {
  const tasks = TodoHelpers.RetrieveTasks();
  TodoHelpers.RenderTasks(tasks, TasksContainer);
};

const AddTask = () => {
  const taskDescription = InputBox.value.trim();
  const currentTaskList = TodoHelpers.RetrieveTasks();
  let updatedTaskList = [];

  if (taskDescription) {
    updatedTaskList = TodoHelpers.CreateTaskEntry(currentTaskList, taskDescription);
    TodoHelpers.UpdateTaskStore(updatedTaskList);
    TodoHelpers.RenderTasks(updatedTaskList, TasksContainer);
    InputBox.value = '';
  }
};

const DeleteTask = (id) => {
  const currentTaskList = TodoHelpers.RetrieveTasks();
  let updatedTaskList = [];

  updatedTaskList = TodoHelpers.DeleteTaskEntry(currentTaskList, id);
  TodoHelpers.UpdateTaskStore(updatedTaskList);
  TodoHelpers.RenderTasks(updatedTaskList, TasksContainer);
};

const UpdateTask = (id, description) => {
  const currentTaskList = TodoHelpers.RetrieveTasks();
  let updatedTaskList = [];

  updatedTaskList = TodoHelpers.UpdateTaskEntry(currentTaskList, id, description);
  TodoHelpers.UpdateTaskStore(updatedTaskList);
  TodoHelpers.RenderTasks(updatedTaskList, TasksContainer);
};

const CaptureEditableDescription = (id) => {
  const taskDescriptionContainer = document.getElementById(`description-${id}`);
  taskDescriptionContainer.setAttribute('contenteditable', true);
  taskDescriptionContainer.focus();
  taskDescriptionContainer.addEventListener('focusout', (event) => {
    event.preventDefault();
    const description = taskDescriptionContainer.innerText;
    UpdateTask(id, description);
  });

  taskDescriptionContainer.addEventListener('keydown', (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
      event.preventDefault();
      document.execCommand('insertHTML', false, '');
      const description = taskDescriptionContainer.innerText;
      UpdateTask(id, description);
    }
  });
};

export {
  SetupTasks, AddTask, DeleteTask, CaptureEditableDescription,
};