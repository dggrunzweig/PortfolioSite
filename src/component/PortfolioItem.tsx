import { ReactElement, useEffect, useRef } from "react";
import "./PortfolioItem.css";
interface props {
  name: string;
  description: string[];
  image_urls: string[];
  children: ReactElement;
}

const PortfolioItem = ({ name, description, image_urls, children }: props) => {
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
    <div className="portfolio-item">
      <div className="description">
        <div className="header1">{name}</div>
        {description.map((d) => {
          return (
            <div key={d} className="header2">
              {d}
              <br />
            </div>
          );
        })}
      </div>
      <div className="child-space">{children}</div>
      {image_urls.length > 0 && (
        <div className="portfolio-gallery" ref={gallery_ref}>
          {image_urls.map((url: string) => {
            return (
              <img key={url} className="portfolio-gallery-photo" src={url} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PortfolioItem;
