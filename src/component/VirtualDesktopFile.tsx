import { useRef, useState } from "react";
import { PseudoFile } from "./VirtualDesktop";

interface props {
  file: PseudoFile;
  visible: boolean;
  onClose: () => void;
  z_index: number;
  onClick: () => void;
}

const VirtualDesktopFile = ({
  file,
  visible,
  onClose,
  z_index,
  onClick,
}: props) => {
  const [x, setX] = useState(5 + 40 * Math.random());
  const [y, setY] = useState(10 + 15 * Math.random());
  const mouse_down = useRef(false);
  const mouse_offset = useRef([0, 0]);
  const mouse_start_pos = useRef([0, 0]);
  const self_ref = useRef(null!);
  const [maximized, setMaximized] = useState(false);

  return (
    visible && (
      <div
        className="vd-open-image"
        ref={self_ref}
        onMouseMove={(e) => {
          if (mouse_down.current) {
            if (
              Math.abs(e.clientX - mouse_start_pos.current[0]) > 25 ||
              Math.abs(e.clientY - mouse_start_pos.current[1]) > 25
            ) {
              const bounds = e.currentTarget.getBoundingClientRect();
              const parent_bounds =
                e.currentTarget.parentElement?.getBoundingClientRect();
              // console.log(bounds, parent_bounds);
              if (bounds && parent_bounds) {
                let x_o = e.clientX - parent_bounds.x - mouse_offset.current[0];
                let y_o = e.clientY - parent_bounds.y - mouse_offset.current[1];
                x_o = Math.max(0, x_o);
                y_o = Math.max(0, y_o);
                x_o = Math.min(parent_bounds.width - bounds.width, x_o);
                y_o = Math.min(parent_bounds.height - bounds.height - 10, y_o);
                x_o = Math.floor((100 * x_o) / parent_bounds.width);
                y_o = Math.floor((100 * y_o) / parent_bounds.height);
                setX(x_o);
                setY(y_o);
                mouse_start_pos.current = [e.clientX, e.clientY];
              }
            }
          }
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onClick();
          mouse_down.current = true;
          const bounds = e.currentTarget.getBoundingClientRect();
          mouse_offset.current = [e.clientX - bounds.x, e.clientY - bounds.y];
          mouse_start_pos.current = [e.clientX, e.clientY];
        }}
        onMouseUp={() => {
          mouse_down.current = false;
        }}
        onMouseLeave={() => {
          mouse_down.current = false;
        }}
        style={
          maximized
            ? {
                top: "1%",
                left: "1%",
                width: "98%",
                height: "98%",
                zIndex: z_index,
              }
            : {
                top: `${y}%`,
                left: `${x}%`,
                zIndex: z_index,
                transitionDuration: "100ms",
                transitionTimingFunction: "linear",
              }
        }
      >
        <div className="vd-top-bar">
          {file.name}
          <div className="vd-button-row">
            <button
              onClick={() => {
                setMaximized(!maximized);
              }}
            >
              +
            </button>
            <button
              style={{ backgroundColor: "#ed3f3f" }}
              onClick={() => {
                onClose();
                setMaximized(false);
              }}
            >
              X
            </button>
          </div>
        </div>

        <img src={file.image_url} draggable={false} />
        <div className="vd-file-description">{file.description}</div>
      </div>
    )
  );
};

export default VirtualDesktopFile;
