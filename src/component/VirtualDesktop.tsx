import { useRef, useState } from "react";
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
  const file_positions = useRef(new Array<Array<number>>());
  for (let i = 0; i < files.length; ++i) {
    file_positions.current.push([
      Math.floor(100 * Math.random()),
      Math.floor(100 * Math.random()),
    ]);
  }
  return (
    <div
      className="vd-main"
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
            />
          );
        })}
      <div className="vd-base-grid">
        <div className="vd-title">
          <span>W 98/99</span>
          <span>Limited Collection</span>
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

        <div className="vd-instructions">
          Click on the various icons to see more details. <br />
          Panes can be dragged and re-ordered by clicking them.
        </div>
      </div>
    </div>
  );
};

export default VirtualDesktop;
