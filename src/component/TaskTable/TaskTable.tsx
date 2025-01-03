import { useState } from "react";
import "./TaskTable.css";
import TaskTableAddEdit from "./TaskTableAddEdit";
import TableRow from "./TableRow";

export enum TaskPriority {
  emergency = 0,
  high,
  medium,
  low,
  optional,
}

export interface Task {
  title: string;
  description: string;
  creator: string;
  assignee: string;
  date_created: Date;
  priority: TaskPriority;
  date_due?: Date;
  open: boolean;
}

export const CreateTask = (
  title: string,
  description: string,
  creator: string,
  assignee: string,
  priority: TaskPriority,
  date_due?: Date
): Task => {
  return {
    title: title,
    description: description,
    creator: creator,
    assignee: assignee,
    date_created: new Date(),
    priority: priority,
    date_due: date_due,
    open: true,
  };
};

interface props {
  initial_list: Task[];
  visible: boolean;
}

export enum TaskTableViewStates {
  table = 0,
  add = 1,
  edit = 2,
}

const TaskToRowEntry = (task: Task): string[] => {
  const priority_string = ["Emergency", "High", "Medium", "Low", "Optional"];
  return [
    task.title,
    task.description,
    task.open ? "Open" : "Closed",
    task.assignee,
    task.creator,
    priority_string[task.priority],
    task.date_due ? task.date_due.toDateString() : "",
    task.date_created.toDateString(),
  ];
};

const TaskTable = ({ initial_list, visible }: props) => {
  const SortFunction = (a: Task, b: Task): number => {
    if (!a.open && b.open) return 1;
    else if (!b.open && a.open) return -1;
    else if (!b.open && !a.open) return 0;
    else {
      if (a.priority < b.priority) return -1;
      if (a.priority > b.priority) return 1;
      return 0;
    }
  };
  initial_list.sort(SortFunction);
  const [items, setItems] = useState(initial_list);
  const [current_selection, setCurrentSelection] = useState(-1);
  const [view_state, setViewState] = useState(TaskTableViewStates.table);

  const updateItems = (new_task_list: Task[]) => {
    new_task_list.sort(SortFunction);
    setItems(new_task_list);
  };

  return (
    <>
      {visible && (
        <div className="task-table">
          {(view_state == TaskTableViewStates.add ||
            view_state == TaskTableViewStates.edit) && (
            <TaskTableAddEdit
              view_state={view_state}
              edit_task={items[current_selection]}
              onSubmit={(new_task: Task) => {
                if (view_state == TaskTableViewStates.add) {
                  updateItems([...items, new_task]);
                } else {
                  items[current_selection] = new_task;
                  updateItems([...items]);
                }
                setViewState(TaskTableViewStates.table);
              }}
              onCancel={() => {
                setViewState(TaskTableViewStates.table);
              }}
            />
          )}

          {view_state == TaskTableViewStates.table && (
            <div className="tt-view">
              <TableRow
                values={[
                  "Title",
                  "Description",
                  "Status",
                  "Assignee",
                  "Creator",
                  "Priority",
                  "Due",
                  "Created",
                ]}
                is_header={true}
                highlighted={false}
                onSelect={() => {}}
                onClose={() => {}}
              />
              <div className="tt-table-area">
                {items.map((t, i) => {
                  return (
                    <TableRow
                      key={t.title}
                      values={TaskToRowEntry(t)}
                      highlighted={i == current_selection}
                      is_header={false}
                      onSelect={() => {
                        if (i == current_selection) setCurrentSelection(-1);
                        else setCurrentSelection(i);
                      }}
                      onClose={() => {
                        items[i].open = !items[i].open;
                        updateItems([...items]);
                      }}
                    />
                  );
                })}
              </div>
              <div className="tt-toolbar">
                <img
                  src="./icons/task_add.svg"
                  onClick={() => {
                    setViewState(TaskTableViewStates.add);
                  }}
                />
                <img
                  src="./icons/task_remove.svg"
                  onClick={() => {
                    if (current_selection != -1) {
                      items.splice(current_selection, 1);
                      updateItems([...items]);
                      setCurrentSelection(-1);
                    }
                  }}
                />
                <img
                  src="./icons/task_edit.svg"
                  style={{
                    marginRight: current_selection == -1 ? "-90px" : "10px",
                  }}
                  onClick={() => {
                    if (current_selection != -1) {
                      setViewState(TaskTableViewStates.edit);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TaskTable;
