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
  const [items, setItems] = useState(initial_list);
  const [current_selection, setCurrentSelection] = useState(-1);
  const [view_state, setViewState] = useState(TaskTableViewStates.table);

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
                  setItems([...items, new_task]);
                } else {
                  items[current_selection] = new_task;
                  setItems([...items]);
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
                        setCurrentSelection(i);
                      }}
                    />
                  );
                })}
              </div>
              <div className="tt-toolbar">
                <img
                  src="./icons/quote_add.png"
                  onClick={() => {
                    setViewState(TaskTableViewStates.add);
                  }}
                />
                <img
                  src={
                    current_selection == -1
                      ? "./icons/quote_remove_deactive.png"
                      : "./icons/quote_remove.png"
                  }
                  onClick={() => {
                    if (current_selection != -1) {
                      items.splice(current_selection, 1);
                      setItems([...items]);
                      setCurrentSelection(-1);
                    }
                  }}
                />
                <img
                  src={
                    current_selection == -1
                      ? "./icons/quote_open_deactive.png"
                      : "./icons/quote_open.png"
                  }
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
