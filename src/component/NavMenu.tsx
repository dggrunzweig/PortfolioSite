import { MutableRefObject, useState } from "react";
import "./NavMenu.css";
interface props {
  menu_item_names: string[];
  portfolio_item_refs: MutableRefObject<MutableRefObject<HTMLDivElement>[]>;
}

const NavMenu = ({ menu_item_names, portfolio_item_refs }: props) => {
  return (
    <div className="nav-menu">
      {menu_item_names.map((m, i) => {
        return (
          <div
            key={m}
            className="nav-menu-item"
            onClick={() => {
              portfolio_item_refs.current[i].current.scrollIntoView();
            }}
          >
            {m}
          </div>
        );
      })}
    </div>
  );
};

export default NavMenu;
