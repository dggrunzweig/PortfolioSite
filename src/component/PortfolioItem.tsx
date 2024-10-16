import { ReactElement, useEffect, useRef } from "react";
import "./PortfolioItem.css";
interface props {
  name: string;
  description: string[];
  image_urls: string[];
  children: ReactElement | null;
  source_link: string;
  current_tab: number;
  index: number;
}

const PortfolioItem = ({
  name,
  description,
  image_urls,
  children,
  source_link,
  index,
  current_tab,
}: props) => {
  const gallery_ref = useRef<HTMLDivElement>(null!);
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
    <div
      className="portfolio-item"
      style={{ display: index == current_tab ? "block" : "none" }}
    >
      <div className="description-items">
        <div className="header1 sub-grid-header">{name}</div>
        <div className="header2 sub-grid-sub-header">{description[0]}</div>
        <div className="header2 sub-grid-1">{description[1]}</div>
        {children && <div className="child-space">{children}</div>}
        {description[2] != "" && (
          <div className="header2 sub-grid-1">{description[2]}</div>
        )}
        {image_urls.length > 0 && (
          <div className="portfolio-gallery sub-grid-1" ref={gallery_ref}>
            {image_urls.map((url: string) => {
              return (
                <img key={url} className="portfolio-gallery-photo" src={url} />
              );
            })}
          </div>
        )}
        <div className="button-sub-grid">
          {source_link != "" && (
            <button
              className="portfolio-source-button"
              onClick={() => {
                let new_tab = window.open(source_link, "_blank");
                new_tab?.focus();
              }}
            >
              View Source Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
