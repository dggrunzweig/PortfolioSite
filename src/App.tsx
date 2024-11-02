import "./App.css";
import NavMenu from "./component/NavMenu";
import PortfolioItem from "./component/PortfolioItem";
import { useState, useRef } from "react";
import Overview from "./component/Overview";
import { portfolio_entries } from "./PortfolioEntries";

function App() {
  const [current_tab, setCurrentTab] = useState(0);
  const total_projects = portfolio_entries.length + 1; // add one for the overview page
  const nextPage = () => {
    setCurrentTab((t) => {
      return (t + 1) % total_projects;
    });
  };
  const prevPage = () => {
    setCurrentTab((t) => {
      t = t - 1;
      if (t < 0) t += total_projects;
      return t;
    });
  };

  const names = portfolio_entries.map((e) => {
    return e.name;
  });
  const [menu_items, setMenuItems] = useState([
    "overview",
    ...names,
    "linkedin",
    "email",
  ]);
  const timer_id = useRef(0);
  const setMenuIndex = (i: number) => {
    if (i <= total_projects - 1) setCurrentTab(i);
    if (i == total_projects) {
      // go to linked in
      const new_tab = window.open(
        "https://www.linkedin.com/in/david-grunzweig/",
        "_blank"
      );
      new_tab?.focus();
    }
    if (i == total_projects + 1) {
      navigator.clipboard.writeText("david@greentwig.xyz");
      menu_items[total_projects + 1] = "Copied";
      setMenuItems([...menu_items]);
      clearTimeout(timer_id.current);
      timer_id.current = setTimeout(() => {
        menu_items[total_projects + 1] = "email";
        setMenuItems([...menu_items]);
      }, 2000);
    }
  };

  return (
    <>
      <div className="app">
        <NavMenu
          menu_item_names={menu_items}
          onItemClick={setMenuIndex}
          current_page={current_tab}
        />
        <div className="view-area">
          <Overview visible={current_tab == 0} onButtonClick={setCurrentTab} />
          {portfolio_entries.map((e, i) => {
            return (
              <PortfolioItem
                visible={current_tab == i + 1}
                nextPage={nextPage}
                prevPage={prevPage}
                entry={e}
                key={e.name}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
