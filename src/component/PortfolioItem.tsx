import { ReactElement, useEffect, useRef, useState } from "react";
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
  const gallery_ref = useRef<HTMLDivElement>(null!);
  const [more_info, showMoreInfo] = useState(false);
  useEffect(() => {
    if (!visible) showMoreInfo(false);
  }, [visible]);
  useEffect(() => {
    const RearrangeGallery = () => {
      if (window.innerWidth > 768) {
        gallery_ref.current.style.gridTemplateColumns =
          "repeat(" + image_urls.length + ", 1fr)";
        gallery_ref.current.style.gridTemplateRows = "1fr";
      } else {
        gallery_ref.current.style.gridTemplateColumns = "1fr";
        gallery_ref.current.style.gridTemplateRows =
          "repeat(" + image_urls.length + ", 1fr)";
      }
    };
    if (gallery_ref.current) {
      RearrangeGallery();
      window.addEventListener("resize", RearrangeGallery);
    }
    return () => {
      window.removeEventListener("resize", RearrangeGallery);
    };
  }, [gallery_ref]);
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
              {more_info && (
                <div className="portfolio-info-pane">
                  <div className="body">{description[1]}</div>
                  <div className="body">{description[2]}</div>
                  {image_urls.length > 0 &&
                    image_urls.map((url: string) => {
                      return (
                        <img
                          key={url}
                          className="portfolio-gallery-photo"
                          src={url}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PortfolioItem;
