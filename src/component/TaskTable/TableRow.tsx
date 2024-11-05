import "./TableRow.css";

interface props {
  values: string[];
  highlighted: boolean;
  is_header: boolean;
  onSelect: () => void;
}

const TableRow = ({ values, highlighted, is_header, onSelect }: props) => {
  let cell_text_class_name = highlighted
    ? "tt-cell-text-highlighted"
    : "tt-cell-text";
  let cell_class_name = is_header ? "tt-header-cell" : "tt-table-cell";
  let row_class_name = highlighted ? "tt-row-highlighted" : "tt-row";
  if (is_header) {
    row_class_name = "tt-header-row";
  }
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
      <div className={cell_class_name} style={{ gridArea: "open" }}>
        <div className={cell_text_class_name}>{values[2]}</div>
      </div>
      <div className={cell_class_name} style={{ gridArea: "assignee" }}>
        <div className={cell_text_class_name}>{values[3]}</div>
      </div>
      <div className={cell_class_name} style={{ gridArea: "creator" }}>
        <div className={cell_text_class_name}>{values[4]}</div>
      </div>
      <div className={cell_class_name} style={{ gridArea: "priority" }}>
        <div className={cell_text_class_name}>{values[5]}</div>
      </div>
      <div className={cell_class_name} style={{ gridArea: "date-due" }}>
        <div className={cell_text_class_name}>{values[6]}</div>
      </div>
      <div className={cell_class_name} style={{ gridArea: "date-created" }}>
        <div className={cell_text_class_name}>{values[7]}</div>
      </div>
    </div>
  );
};

export default TableRow;