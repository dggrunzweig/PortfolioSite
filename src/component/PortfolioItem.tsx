import { ReactElement, useEffect, useState } from "react";
import PortfolioItemInfo from "./PortfolioItemInfo";
import "./PortfolioItem.css";
interface props {
  name: string;
  description: string[];
  image_urls: string[];
  children: ReactElement | null;
  source_link: string;
  visible: boolean;
  nextPage: () => void;
  prevPage: () => void;
}

const PortfolioItem = ({
  name,
  description,
  image_urls,
  children,
  source_link,
  visible,
  nextPage,
  prevPage,
}: props) => {
  const [more_info, showMoreInfo] = useState(false);
  useEffect(() => {
    if (!visible) showMoreInfo(false);
  }, [visible]);
  return (
    <>
      {visible && (
        <div className="portfolio-item">
          <div className="portfolio-head">
            <div className="portfolio-title">
              <div className="header1">{name}</div>
              <div className="header2">{description[0]}</div>
            </div>
            <div className="portfolio-buttons">
              {source_link != "" && (
                <div
                  className="small-button"
                  onClick={() => {
                    let new_tab = window.open(source_link, "_blank");
                    new_tab?.focus();
                  }}
                >
                  Source Code
                </div>
              )}
              {description.length > 1 && (
                <div
                  className="small-button more-info-button-mobile"
                  onClick={() => {
                    showMoreInfo(!more_info);
                  }}
                >
                  Project desc
                </div>
              )}
              <div
                className="small-button"
                onClick={() => {
                  nextPage();
                }}
              >
                next page
              </div>
              <div
                className="small-button"
                onClick={() => {
                  prevPage();
                }}
              >
                prev page
              </div>
            </div>
          </div>
          {children && (
            <div className="child-space">
              {children}
              {more_info && (
                <PortfolioItemInfo
                  problem_text={description[0]}
                  problem_image_urls={image_urls}
                  exploration_text="how i explored the problem"
                  exploration_image_urls={[]}
                  challenges_text="all my challenges"
                  challenges_image_urls={[]}
                  outcome_text="the outcomes of my project"
                  outcome_image_urls={[]}
                />
              )}
            </div>
          )}
          {description.length > 1 && (
            <div
              className="large-button more-info-button-desktop"
              onClick={() => {
                showMoreInfo(!more_info);
              }}
            >
              Project Brief
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PortfolioItem;
