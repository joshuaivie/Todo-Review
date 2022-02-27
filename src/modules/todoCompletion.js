import TodoHelpers from './todoHelper.js';
import { TasksContainer } from './elements.js';

const CaptureCheck = (id, state) => {
  const currentTaskList = TodoHelpers.RetrieveTasks();
  let updatedTaskList = [];

  updatedTaskList = TodoHelpers.UpdateTaskState(currentTaskList, id, state);
  TodoHelpers.UpdateTaskStore(updatedTaskList);
  TodoHelpers.RenderTasks(updatedTaskList, TasksContainer);
};

const ClearAllCompleted = () => {
  const currentTaskList = TodoHelpers.RetrieveTasks();
  let updatedTaskList = [];

  updatedTaskList = TodoHelpers.UpdateClearedTasks(currentTaskList);
  TodoHelpers.UpdateTaskStore(updatedTaskList);
  TodoHelpers.RenderTasks(updatedTaskList, TasksContainer);
};

export { CaptureCheck, ClearAllCompleted };