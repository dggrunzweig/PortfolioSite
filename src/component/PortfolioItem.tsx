import { ReactElement } from "react";

interface props {
  name: string;
  description: string;
  description_2: string;
  children: ReactElement;
}

const PortfolioItem = ({ name, description, children }: props) => {
  return (
    <div className="portfolio-item">
      <div className="description">
        <div className="header1">{name}</div>
        <div className="header3">{description}</div>
      </div>
      {children}
    </div>
  );
};

export default PortfolioItem;
