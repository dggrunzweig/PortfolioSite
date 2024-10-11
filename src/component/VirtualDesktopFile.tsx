import { useRef, useState, MutableRefObject } from "react";
import { PseudoFile } from "./VirtualDesktop";

interface props {
  file: PseudoFile;
  visible: boolean;
  onClose: () => void;
  z_index: number;
  onClick: () => void;
  onDrag: (
    dragging: boolean,
    mouse_offset: number[],
    mouse_start_pos: number[],
    active_element: MutableRefObject<HTMLDivElement>
  ) => void;
}

const VirtualDesktopFile = ({
  file,
  visible,
  onClose,
  z_index,
  onClick,
  onDrag,
}: props) => {
  const init_x = useRef(5 + 40 * Math.random());
  const init_y = useRef(10 + 15 * Math.random());
  const self_ref = useRef<HTMLDivElement>(null!);
  const [maximized, setMaximized] = useState(false);

  return (
    visible && (
      <div
        className="vd-open-image"
        ref={self_ref}
        onMouseDown={(e) => {
          e.stopPropagation();
          onClick();
          const bounds = e.currentTarget.getBoundingClientRect();
          onDrag(
            true,
            [e.clientX - bounds.x, e.clientY - bounds.y],
            [e.clientX, e.clientY],
            self_ref
          );
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
                top: `${init_y.current}%`,
                left: `${init_x.current}%`,
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
