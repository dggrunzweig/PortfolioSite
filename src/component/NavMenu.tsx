import { useState } from "react";
import "./NavMenu.css";
interface props {
  menu_item_names: string[];
  onItemClick: (index: number) => void;
}

const NavMenu = ({ menu_item_names, onItemClick }: props) => {
  const [open_menu, setOpenMenu] = useState(false);
  return (
    <>
      <div
        className="nav-mobile-button"
        onClick={() => {
          setOpenMenu(!open_menu);
        }}
      >
        Menu
      </div>
      <div
        className="nav-menu-mobile"
        style={{ bottom: open_menu ? "0%" : "-100%" }}
      >
        {menu_item_names.map((m, i) => {
          return (
            <div
              key={m}
              className="nav-menu-item"
              onClick={() => {
                onItemClick(i);
                setOpenMenu(false);
                document.body.scrollTo({ top: 0, behavior: "instant" });
              }}
            >
              {m}
            </div>
          );
        })}
      </div>
      <div className="nav-menu">
        {menu_item_names.map((m, i) => {
          return (
            <div
              key={m}
              className="nav-menu-item"
              onClick={() => {
                onItemClick(i);
                document.body.scrollTo({ top: 0, behavior: "instant" });
              }}
            >
              {m}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NavMenu;
