import { MutableRefObject, useRef, useState } from "react";
import "./VirtualDesktop.css";
import VirtualDesktopFile from "./VirtualDesktopFile";

export interface PseudoFile {
  name: string;
  image_url: string;
  description: string;
}

export const CreatePseudoFile = (
  image_url: string,
  description: string
): PseudoFile => {
  const url_chunks = image_url.split("/");
  let name = url_chunks[url_chunks.length - 1];
  name = name.toLowerCase();
  name = name.replace(" ", "-");
  return {
    name: name,
    image_url: image_url,
    description: description,
  };
};

interface props {
  files: PseudoFile[];
}

const VirtualDesktop = ({ files }: props) => {
  const [visible_files, setVisibleFiles] = useState(
    new Array<boolean>(files.length).fill(false)
  );
  const [z_index, setZIndex] = useState(
    new Array<number>(files.length).fill(1)
  );

  const [dragging, setDragging] = useState(false);
  const drag_element = useRef<HTMLDivElement>(null!);
  const mouse_offset = useRef([0, 0]);
  const mouse_start_pos = useRef([0, 0]);
  const onDrag = (
    dragging: boolean,
    mouse_offset_rhs: number[],
    mouse_start_pos_rhs: number[],
    active_element: MutableRefObject<HTMLDivElement>
  ) => {
    setDragging(dragging);
    mouse_offset.current = mouse_offset_rhs;
    mouse_start_pos.current = mouse_start_pos_rhs;
    drag_element.current = active_element.current;
  };
  return (
    <div className="vd-background">
      <div
        className="vd-main"
        onMouseUp={() => {
          setDragging(false);
        }}
        onMouseMove={(e) => {
          if (dragging) {
            if (
              Math.abs(e.clientX - mouse_start_pos.current[0]) > 25 ||
              Math.abs(e.clientY - mouse_start_pos.current[1]) > 25
            ) {
              const bounds = drag_element.current.getBoundingClientRect();
              const parent_bounds = e.currentTarget.getBoundingClientRect();
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
                drag_element.current.style.top = y_o + "%";
                drag_element.current.style.left = x_o + "%";
                mouse_start_pos.current = [e.clientX, e.clientY];
              }
            }
          }
        }}
        onClick={() => {
          // if (overlay_visible) showOverlay(false);
        }}
      >
        {files.length > 0 &&
          files.map((f, i) => {
            return (
              <VirtualDesktopFile
                key={f.image_url}
                file={f}
                visible={visible_files[i]}
                onClose={() => {
                  visible_files[i] = false;
                  setVisibleFiles([...visible_files]);
                }}
                z_index={z_index[i]}
                onClick={() => {
                  z_index.forEach((_, z_i, z_index) => {
                    z_index[z_i] = 1;
                    if (z_i == i) z_index[z_i] = 2;
                  });
                  setZIndex([...z_index]);
                }}
                onDrag={onDrag}
              />
            );
          })}
        <div className="vd-home-bar">
          <div>File</div>
          <div>Edit</div>
          <div>View</div>
          <div>Window</div>
          <div>Help</div>
        </div>
        <div className="vd-base-grid">
          <div className="vd-title-div">
            <div className="vd-instructions">
              + Click on the various icons to see more details. <br />+ Panes
              can be dragged and re-ordered by clicking them.
            </div>
            <div className="vd-title">
              HELMUT LANG <br />W 98/99
            </div>
          </div>
          <div className="vd-file-icons">
            {files.map((file, i) => {
              return (
                <div
                  className="vd-file"
                  key={file.image_url}
                  onClick={() => {
                    visible_files[i] = true;
                    setVisibleFiles([...visible_files]);
                    z_index.forEach((_, z_i, z_index) => {
                      z_index[z_i] = 1;
                      if (z_i == i) z_index[z_i] = 2;
                    });
                    setZIndex([...z_index]);
                  }}
                >
                  <div className="vd-file-image">
                    <img src={file.image_url} draggable={false} />
                  </div>
                  <div className="vd-file-name">{file.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualDesktop;
