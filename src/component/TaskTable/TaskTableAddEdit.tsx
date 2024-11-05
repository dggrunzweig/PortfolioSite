import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TaskTableAddEdit.css";
import {
  CreateTask,
  Task,
  TaskTableViewStates,
  TaskPriority,
} from "./TaskTable";
import { useState } from "react";
import TableRow from "./TableRow";

interface props {
  view_state: TaskTableViewStates;
  edit_task: Task;
  onSubmit: (new_task: Task) => void;
  onCancel: () => void;
}

const TaskTableAddEdit = ({
  view_state,
  edit_task,
  onSubmit,
  onCancel,
}: props) => {
  const init_state =
    view_state == TaskTableViewStates.edit
      ? edit_task
      : CreateTask("", "", "", "", 0, new Date());
  const [task, setTask] = useState(init_state);
  return (
    <div className="tt-add-view">
      <TableRow
        values={[
          view_state == TaskTableViewStates.add
            ? "Create New Task"
            : "Edit Task",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ]}
        is_header={true}
        highlighted={false}
        onSelect={() => {}}
        onClose={() => {}}
      />
      <div className="task-add-section">
        <textarea
          className="tt-add-short-textarea"
          placeholder={"Task Title"}
          defaultValue={task.title ?? ""}
          onChange={(e) => {
            setTask({ ...task, title: e.target.value });
          }}
        />
        <textarea
          className="tt-add-long-textarea"
          placeholder={"Task Description"}
          defaultValue={task.description ?? ""}
          onChange={(e) => {
            setTask({ ...task, description: e.target.value });
          }}
        />
        <textarea
          className="tt-add-short-textarea"
          placeholder={"Creator"}
          defaultValue={task.creator ?? ""}
          onChange={(e) => {
            setTask({ ...task, creator: e.target.value });
          }}
        />
        <textarea
          className="tt-add-short-textarea"
          placeholder={"Assignee"}
          defaultValue={task.assignee ?? ""}
          onChange={(e) => {
            setTask({ ...task, assignee: e.target.value });
          }}
        />
        <div className="tt-priority-selector">
          Priority:
          <div
            className="tt-priority-checkbox-holder"
            onClick={() => {
              setTask({
                ...task,
                priority: TaskPriority.emergency,
              });
            }}
          >
            <div
              className="tt-priority-checkbox"
              style={{
                backgroundColor:
                  task.priority == TaskPriority.emergency
                    ? "var(--grey-7)"
                    : "transparent",
              }}
            />
            Emergency
          </div>
          <div
            className="tt-priority-checkbox-holder"
            onClick={() => {
              setTask({
                ...task,
                priority: TaskPriority.high,
              });
            }}
          >
            <div
              className="tt-priority-checkbox"
              style={{
                backgroundColor:
                  task.priority == TaskPriority.high
                    ? "var(--grey-7)"
                    : "transparent",
              }}
            />
            High
          </div>
          <div
            className="tt-priority-checkbox-holder"
            onClick={() => {
              setTask({
                ...task,
                priority: TaskPriority.medium,
              });
            }}
          >
            <div
              className="tt-priority-checkbox"
              style={{
                backgroundColor:
                  task.priority == TaskPriority.medium
                    ? "var(--grey-7)"
                    : "transparent",
              }}
            />
            Medium
          </div>
          <div
            className="tt-priority-checkbox-holder"
            onClick={() => {
              setTask({
                ...task,
                priority: TaskPriority.low,
              });
            }}
          >
            <div
              className="tt-priority-checkbox"
              style={{
                backgroundColor:
                  task.priority == TaskPriority.low
                    ? "var(--grey-7)"
                    : "transparent",
              }}
            />
            Low
          </div>
          <div
            className="tt-priority-checkbox-holder"
            onClick={() => {
              setTask({
                ...task,
                priority: TaskPriority.optional,
              });
            }}
          >
            <div
              className="tt-priority-checkbox"
              style={{
                backgroundColor:
                  task.priority == TaskPriority.optional
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
            selected={task.date_due}
            onChange={(date) => {
              if (date) setTask({ ...task, date_due: date });
            }}
          />
        </div>
      </div>
      <div className="tt-toolbar">
        <div
          className="tt-submit-button"
          onClick={() => {
            onSubmit(task);
          }}
        >
          Submit
        </div>
        <div
          className="tt-cancel-button"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

export default TaskTableAddEdit;
