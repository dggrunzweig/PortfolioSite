import { useState } from "react";
import "./TaskTable.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

enum states {
  table = 0,
  add = 1,
  edit = 2,
}

const TaskTable = ({ initial_list, visible }: props) => {
  const [items, setItems] = useState(initial_list);
  const [current_selection, setCurrentSelection] = useState(-1);
  const [view_state, setViewState] = useState(states.table);
  const [new_task, setNewTask] = useState(
    CreateTask("", "", "", "", TaskPriority.optional)
  );

  return (
    <>
      {visible && (
        <div className="task-table">
          {(view_state == states.add || view_state == states.edit) && (
            <div className="add-view">
              <div className="task-header-row">
                <div className="task-header-row-item">
                  {view_state == states.add ? "Create New Task" : "Edit Task"}
                </div>
              </div>
              <div className="task-add-section">
                <textarea
                  className="tt-add-short-textarea"
                  placeholder={"Task Title"}
                  defaultValue={new_task.title ?? ""}
                  onChange={(e) => {
                    setNewTask({ ...new_task, title: e.target.value });
                  }}
                />
                <textarea
                  className="tt-add-long-textarea"
                  placeholder={"Task Description"}
                  defaultValue={new_task.description ?? ""}
                  onChange={(e) => {
                    setNewTask({ ...new_task, description: e.target.value });
                  }}
                />
                <textarea
                  className="tt-add-short-textarea"
                  placeholder={"Creator"}
                  defaultValue={new_task.creator ?? ""}
                  onChange={(e) => {
                    setNewTask({ ...new_task, creator: e.target.value });
                  }}
                />
                <textarea
                  className="tt-add-short-textarea"
                  placeholder={"Assignee"}
                  defaultValue={new_task.assignee ?? ""}
                  onChange={(e) => {
                    setNewTask({ ...new_task, assignee: e.target.value });
                  }}
                />
                <div className="tt-priority-selector">
                  Priority:
                  <div
                    className="tt-priority-checkbox-holder"
                    onClick={() => {
                      setNewTask({
                        ...new_task,
                        priority: TaskPriority.emergency,
                      });
                    }}
                  >
                    <div
                      className="tt-priority-checkbox"
                      style={{
                        backgroundColor:
                          new_task.priority == TaskPriority.emergency
                            ? "var(--grey-7)"
                            : "transparent",
                      }}
                    />
                    Emergency
                  </div>
                  <div
                    className="tt-priority-checkbox-holder"
                    onClick={() => {
                      setNewTask({
                        ...new_task,
                        priority: TaskPriority.high,
                      });
                    }}
                  >
                    <div
                      className="tt-priority-checkbox"
                      style={{
                        backgroundColor:
                          new_task.priority == TaskPriority.high
                            ? "var(--grey-7)"
                            : "transparent",
                      }}
                    />
                    High
                  </div>
                  <div
                    className="tt-priority-checkbox-holder"
                    onClick={() => {
                      setNewTask({
                        ...new_task,
                        priority: TaskPriority.medium,
                      });
                    }}
                  >
                    <div
                      className="tt-priority-checkbox"
                      style={{
                        backgroundColor:
                          new_task.priority == TaskPriority.medium
                            ? "var(--grey-7)"
                            : "transparent",
                      }}
                    />
                    Medium
                  </div>
                  <div
                    className="tt-priority-checkbox-holder"
                    onClick={() => {
                      setNewTask({
                        ...new_task,
                        priority: TaskPriority.low,
                      });
                    }}
                  >
                    <div
                      className="tt-priority-checkbox"
                      style={{
                        backgroundColor:
                          new_task.priority == TaskPriority.low
                            ? "var(--grey-7)"
                            : "transparent",
                      }}
                    />
                    Low
                  </div>
                  <div
                    className="tt-priority-checkbox-holder"
                    onClick={() => {
                      setNewTask({
                        ...new_task,
                        priority: TaskPriority.optional,
                      });
                    }}
                  >
                    <div
                      className="tt-priority-checkbox"
                      style={{
                        backgroundColor:
                          new_task.priority == TaskPriority.optional
                            ? "var(--grey-7)"
                            : "transparent",
                      }}
                    />
                    Optional
                  </div>
                </div>
                <div className="tt-due-date-selector">
                  Due Date:
                  <DatePicker
                    selected={new_task.date_due}
                    onChange={(date) => {
                      if (date) setNewTask({ ...new_task, date_due: date });
                    }}
                  />
                </div>
              </div>
              <div className="task-table-toolbar">
                <div
                  className="tt-submit-button"
                  onClick={() => {
                    if (view_state == states.add) {
                      setItems([new_task, ...items]);
                      setViewState(states.table);
                    } else {
                      items[current_selection] = new_task;
                      setItems([...items]);
                      setViewState(states.table);
                    }
                  }}
                >
                  Submit
                </div>
                <div
                  className="tt-cancel-button"
                  onClick={() => {
                    setViewState(states.table);
                  }}
                >
                  Cancel
                </div>
              </div>
            </div>
          )}

          {view_state == states.table && (
            <div
              className="table-view"
              onClick={() => {
                setCurrentSelection(-1);
              }}
            >
              <div className="task-header-row">
                <div
                  className="task-header-row-item"
                  style={{ gridArea: "title" }}
                >
                  Title
                </div>
                <div
                  className="task-header-row-item"
                  style={{ gridArea: "open" }}
                >
                  Status
                </div>
                <div
                  className="task-header-row-item"
                  style={{ gridArea: "assignee" }}
                >
                  Assignee
                </div>
                <div
                  className="task-header-row-item"
                  style={{ gridArea: "creator" }}
                >
                  Creator
                </div>
                <div
                  className="task-header-row-item"
                  style={{ gridArea: "priority" }}
                >
                  Priority
                </div>
                <div
                  className="task-header-row-item"
                  style={{ gridArea: "date-due" }}
                >
                  Date Due
                </div>
                <div
                  className="task-header-row-item"
                  style={{ gridArea: "date-created" }}
                >
                  Date Created
                </div>
              </div>
              <div className="task-table-table-area">
                {items.map((t, i) => {
                  const entry_class_name =
                    i == current_selection
                      ? "task-text-highlighted"
                      : "task-text";
                  const row_class_name =
                    i == current_selection
                      ? "task-table-row-highlighted"
                      : "task-table-row";

                  return (
                    <div
                      key={t.title}
                      className={row_class_name}
                      onClick={(event) => {
                        event.stopPropagation();
                        setCurrentSelection(i);
                      }}
                    >
                      <div
                        className="table-entry"
                        style={{ gridArea: "title" }}
                      >
                        <div className={entry_class_name}>
                          {t.title}
                          {current_selection == i && (
                            <div className="table-entry-description">
                              {t.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="table-entry" style={{ gridArea: "open" }}>
                        <div className={entry_class_name}>
                          {t.open ? "Open" : "Closed"}
                        </div>
                      </div>
                      <div
                        className="table-entry"
                        style={{ gridArea: "assignee" }}
                      >
                        <div className={entry_class_name}>{t.assignee}</div>
                      </div>
                      <div
                        className="table-entry"
                        style={{ gridArea: "creator" }}
                      >
                        <div className={entry_class_name}>{t.creator}</div>
                      </div>
                      <div
                        className="table-entry"
                        style={{ gridArea: "priority" }}
                      >
                        <div className={entry_class_name}>{t.priority}</div>
                      </div>
                      <div
                        className="table-entry"
                        style={{ gridArea: "date-due" }}
                      >
                        <div className={entry_class_name}>
                          {t.date_due?.toDateString()}
                        </div>
                      </div>
                      <div
                        className="table-entry"
                        style={{ gridArea: "date-created" }}
                      >
                        <div className={entry_class_name}>
                          {t.date_created.toDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="task-table-toolbar">
                <img
                  src="./icons/quote_add.png"
                  onClick={() => {
                    setViewState(states.add);
                    setNewTask(CreateTask("", "", "", "", 0, new Date()));
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
                      setViewState(states.edit);
                      setNewTask(items[current_selection]);
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
