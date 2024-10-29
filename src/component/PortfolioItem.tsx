import { ReactElement, useEffect, useState } from "react";
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
                  className="small-button"
                  onClick={() => {
                    showMoreInfo(!more_info);
                  }}
                >
                  More Info
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
              <div
                className="portfolio-info-pane"
                style={{ display: more_info ? "grid" : "none" }}
              >
                <div className="body portfolio-info-text">{description[1]}</div>
                {image_urls.length > 0 &&
                  image_urls.map((url: string) => {
                    return (
                      <img
                        key={url}
                        className="portfolio-gallery-photo"
                        src={url}
                        onLoad={(event) => {
                          const image = event.currentTarget;
                          const ar = image.naturalWidth / image.naturalHeight;
                          image.style.width = "auto";
                          image.style.height = "auto";
                          if (ar < 1) {
                            image.style.width = "calc(100% - var(--p1))";
                          } else {
                            image.style.height = "calc(100% - var(--p1))";
                          }
                        }}
                      />
                    );
                  })}
                <div className="body portfolio-info-text">{description[2]}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PortfolioItem;
