import TaskTable, { Task, CreateTask, TaskPriority } from "./TaskTable";
const TaskTableDemo = () => {
  const tasks = new Array<Task>();

  tasks.push(
    CreateTask(
      "Feed Dog",
      "Remember to feed your dog sophie 2 cups of food per day, once in the morning and once after dinner. She needs plenty of treats but not too many!",
      "David Grunzweig",
      "David Grunzweig",
      TaskPriority.medium
    )
  );
  tasks.push(
    CreateTask(
      "Feed Duck",
      "Remember to feed your dog sophie 2 cups of food per day, once in the morning and once after dinner. She needs plenty of treats but not too many!",
      "David Grunzweig",
      "David Grunzweig",
      TaskPriority.medium
    )
  );
  tasks.push(
    CreateTask(
      "Feed Buck",
      "Remember to feed your dog sophie 2 cups of food per day, once in the morning and once after dinner. She needs plenty of treats but not too many!",
      "David Grunzweig",
      "David Grunzweig",
      TaskPriority.medium
    )
  );

  return <TaskTable initial_list={tasks} visible={true} />;
};

export default TaskTableDemo;
