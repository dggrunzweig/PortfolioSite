import { ReactElement, useEffect, useState } from "react";
import PortfolioItemInfo from "./PortfolioItemInfo";
import "./PortfolioItem.css";

export interface PortfolioEntry {
  name: string;
  source_link: string;
  description: string;
  more_info: boolean;
  element?: ReactElement;
  problem_text?: string;
  problem_image_urls?: string[];
  exploration_text?: string;
  exploration_image_urls?: string[];
  challenges_text?: string;
  challenges_image_urls?: string[];
  outcome_text?: string;
  outcome_image_urls?: string[];
}
interface props {
  entry: PortfolioEntry;
  visible: boolean;
  nextPage: () => void;
  prevPage: () => void;
}

const PortfolioItem = ({ entry, visible, nextPage, prevPage }: props) => {
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
              <div className="header1">{entry.name}</div>
              <div className="header2">{entry.description}</div>
            </div>
            <div className="portfolio-buttons">
              {entry.source_link != "" && (
                <div
                  className="small-button"
                  onClick={() => {
                    let new_tab = window.open(entry.source_link, "_blank");
                    new_tab?.focus();
                  }}
                >
                  Source Code
                </div>
              )}
              {entry.more_info && (
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
          {entry.element && (
            <div className="child-space">
              {entry.element}
              {more_info && entry.more_info && (
                <PortfolioItemInfo entry={entry} />
              )}
            </div>
          )}
          {entry.more_info && (
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
