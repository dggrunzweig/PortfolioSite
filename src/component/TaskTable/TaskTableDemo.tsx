import TaskTable, { Task, CreateTask, TaskPriority } from "./TaskTable";
const TaskTableDemo = () => {
  const tasks = new Array<Task>();
  const today = new Date();
  const week_1 = new Date();
  week_1.setDate(today.getDate() + 7);
  const week_2 = new Date();
  week_2.setDate(today.getDate() + 14);

  tasks.push(
    CreateTask(
      "Walk dog",
      "Walk the dog twice, make sure she gets some treats and playtime as well.",
      "David Grunzweig",
      "David Grunzweig",
      TaskPriority.medium,
      today
    )
  );
  tasks.push(
    CreateTask(
      "Finish Portfolio Site",
      "Finish working on your portfolio site by the end of the week. Incorporate feedback from reviewers.",
      "David Grunzweig",
      "David Grunzweig",
      TaskPriority.high,
      week_1
    )
  );
  tasks.push(
    CreateTask(
      "Look for Jobs",
      "Find good fits for your skillset, talk to friends, look for interesting open positions.",
      "David Grunzweig",
      "David Grunzweig",
      TaskPriority.high,
      week_2
    )
  );
  tasks.push(
    CreateTask(
      "Finish mixing live set",
      "Finish the final mix down and arrangement of the night sea live set from the Endezeit performance.",
      "David Grunzweig",
      "David Grunzweig",
      TaskPriority.low,
      week_1
    )
  );
  tasks.push(
    CreateTask(
      "Post artwork to Instagram",
      "Share some WIP photos from your latest project on IG",
      "David Grunzweig",
      "David Grunzweig",
      TaskPriority.optional,
      week_1
    )
  );
  tasks[1].open = false;
  return <TaskTable initial_list={tasks} visible={true} />;
};

export default TaskTableDemo;
