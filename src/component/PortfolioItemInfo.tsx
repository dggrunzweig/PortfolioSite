import "./PortfolioItemInfo.css";
interface props {
  problem_text: string;
  problem_image_urls: string[];
  exploration_text: string;
  exploration_image_urls: string[];
  challenges_text: string;
  challenges_image_urls: string[];
  outcome_text: string;
  outcome_image_urls: string[];
}

const PortfolioItemInfo = ({
  problem_text,
  problem_image_urls,
  exploration_text,
  exploration_image_urls,
  challenges_text,
  challenges_image_urls,
  outcome_text,
  outcome_image_urls,
}: props) => {
  return (
    <div className="portfolio-info-pane">
      <div className="portfolio-info-page">
        <div className="header1 portfolio-info-page-header">Problem</div>
        <div className="body portfolio-info-page-body">{problem_text}</div>
        <div className="portfolio-info-images">
          {problem_image_urls.map((url) => {
            return <img src={url} />;
          })}
        </div>
        <div className="portfolio-info-scroll-indicator">&gt;&gt;&gt;</div>
      </div>
      <div className="portfolio-info-page">
        <div className="header1 portfolio-info-page-header">Exploration</div>
        <div className="body portfolio-info-page-body">{exploration_text}</div>
        <div className="portfolio-info-images">
          {exploration_image_urls.map((url) => {
            return <img src={url} />;
          })}
        </div>
        <div className="portfolio-info-scroll-indicator">&gt;&gt;&gt;</div>
      </div>
      <div className="portfolio-info-page">
        <div className="header1 portfolio-info-page-header">Challenges</div>
        <div className="body portfolio-info-page-body">{challenges_text}</div>
        <div className="portfolio-info-images">
          {challenges_image_urls.map((url) => {
            return <img src={url} />;
          })}
        </div>
        <div className="portfolio-info-scroll-indicator">&gt;&gt;&gt;</div>
      </div>
      <div className="portfolio-info-page">
        <div className="header1 portfolio-info-page-header">Outcome</div>
        <div className="body portfolio-info-page-body">{outcome_text}</div>
        <div className="portfolio-info-images">
          {outcome_image_urls.map((url) => {
            return <img src={url} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioItemInfo;
