import "./TableRow.css";

interface props {
  values: string[];
  highlighted: boolean;
  is_header: boolean;
  onSelect: () => void;
  onClose: () => void;
}

const TableRow = ({
  values,
  highlighted,
  is_header,
  onSelect,
  onClose,
}: props) => {
  let cell_text_class_name = highlighted
    ? "tt-cell-text-highlighted"
    : "tt-cell-text";
  let cell_class_name = is_header ? "tt-header-cell" : "tt-table-cell";
  let row_class_name = highlighted ? "tt-row-highlighted" : "tt-row";
  if (values[2] == "Closed") row_class_name = row_class_name + " tt-row-done";
  if (is_header) {
    row_class_name = "tt-header-row";
  }

  const mobile_modifier =
    " " + (highlighted ? "" : " tt-table-cell-hidden-mobile");

  return (
    <div
      className={row_class_name}
      onClick={() => {
        onSelect();
      }}
    >
      <div className={cell_class_name} style={{ gridArea: "title" }}>
        <div className={cell_text_class_name}>
          {values[0]}
          {highlighted && (
            <div className="tt-table-cell-description">{values[1]}</div>
          )}
        </div>
      </div>
      <div
        className={cell_class_name + mobile_modifier}
        style={{ gridArea: "open" }}
      >
        <div className="tt-mobile-label">Status</div>
        <div
          className={cell_text_class_name + (is_header ? "" : " tt-clickable")}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          {values[2]}
        </div>
      </div>
      <div
        className={cell_class_name + mobile_modifier}
        style={{ gridArea: "priority" }}
      >
        <div className="tt-mobile-label">Priority</div>
        <div className={cell_text_class_name}>{values[5]}</div>
      </div>

      <div
        className={cell_class_name + mobile_modifier}
        style={{ gridArea: "assignee" }}
      >
        <div className="tt-mobile-label">Assignee</div>
        <div className={cell_text_class_name}>{values[3]}</div>
      </div>
      <div
        className={cell_class_name + mobile_modifier}
        style={{ gridArea: "creator" }}
      >
        <div className="tt-mobile-label">Creator</div>
        <div className={cell_text_class_name}>{values[4]}</div>
      </div>
      <div
        className={cell_class_name + mobile_modifier}
        style={{ gridArea: "date-due" }}
      >
        <div className="tt-mobile-label">Due</div>
        <div className={cell_text_class_name}>{values[6]}</div>
      </div>
      <div
        className={cell_class_name + mobile_modifier}
        style={{ gridArea: "date-created" }}
      >
        <div className="tt-mobile-label">Created</div>
        <div className={cell_text_class_name}>{values[7]}</div>
      </div>
    </div>
  );
};

export default TableRow;
