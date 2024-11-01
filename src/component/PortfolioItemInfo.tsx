import "./PortfolioItemInfo.css";
import { PortfolioEntry } from "./PortfolioItem";
interface props {
  entry: PortfolioEntry;
}

const PortfolioItemInfo = ({ entry }: props) => {
  return (
    <div className="portfolio-info-pane">
      <div className="portfolio-info-page">
        <div className="header1 portfolio-info-page-header">Problem</div>
        <div className="header2 portfolio-info-page-body">
          {entry.problem_text}
        </div>
        <div className="portfolio-info-images">
          {entry.problem_image_urls?.map((url) => {
            return <img src={url} />;
          })}
        </div>
        <div className="portfolio-info-scroll-indicator">&gt;&gt;&gt;</div>
      </div>
      <div className="portfolio-info-page">
        <div className="header1 portfolio-info-page-header">Exploration</div>
        <div className="header2 portfolio-info-page-body">
          {entry.exploration_text}
        </div>
        <div className="portfolio-info-images">
          {entry.exploration_image_urls?.map((url) => {
            return <img src={url} />;
          })}
        </div>
        <div className="portfolio-info-scroll-indicator">&gt;&gt;&gt;</div>
      </div>
      <div className="portfolio-info-page">
        <div className="header1 portfolio-info-page-header">Challenges</div>
        <div className="header2 portfolio-info-page-body">
          {entry.challenges_text}
        </div>
        <div className="portfolio-info-images">
          {entry.challenges_image_urls?.map((url) => {
            return <img src={url} />;
          })}
        </div>
        <div className="portfolio-info-scroll-indicator">&gt;&gt;&gt;</div>
      </div>
      <div className="portfolio-info-page">
        <div className="header1 portfolio-info-page-header">Outcome</div>
        <div className="header2 portfolio-info-page-body">
          {entry.outcome_text}
        </div>
        <div className="portfolio-info-images">
          {entry.outcome_image_urls?.map((url) => {
            return <img src={url} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioItemInfo;
