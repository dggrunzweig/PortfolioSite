import { useState } from "react";
import "./NavMenu.css";
interface props {
  menu_item_names: string[];
  onItemClick: (index: number) => void;
  current_page: number;
}

const NavMenu = ({ menu_item_names, onItemClick, current_page }: props) => {
  const [open_menu, setOpenMenu] = useState(false);
  return (
    <>
      <div className="side-bar" onMouseLeave={() => setOpenMenu(false)}>
        <div className="nav-menu">
          <div
            className={open_menu ? "small-button-inactive" : "small-button"}
            onClick={() => {
              setOpenMenu(!open_menu);
            }}
          >
            Menu
          </div>
          {open_menu &&
            menu_item_names.map((m, i) => {
              return (
                <div className="menu-item" key={m}>
                  {i == current_page && <div className="page-indicator"></div>}
                  <div
                    className="small-button"
                    onClick={() => {
                      onItemClick(i);
                      document.body.scrollTo({ top: 0, behavior: "instant" });
                    }}
                  >
                    {m}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="body copyright">
          David Grunzweig
          <br />
          &#169; 2024
        </div>
      </div>
    </>
  );
};

export default NavMenu;
