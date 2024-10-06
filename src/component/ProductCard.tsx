import { useState } from "react";
import "./ProductCard.css";

interface props {
  name: string;
  id: string;
  short_desc: string;
  full_desc: string;
  image_url: string[];
  price: number;
  onClickBuy?: (id: string) => void;
}

const ProductCard = ({
  name,
  id,
  short_desc,
  full_desc,
  image_url,
  price,
  onClickBuy,
}: props) => {
  const [showing_front, setShowingFront] = useState(true);
  const [current_image, setCurrentImage] = useState(0);
  const [enlarged_image, setEnlargeImage] = useState(false);
  return (
    <>
      {enlarged_image && (
        <div
          className="image-overlay"
          onClick={() => {
            setEnlargeImage(false);
          }}
        >
          <img src={image_url[current_image]} />
        </div>
      )}
      <div className="card">
        <div className="name">
          <span className="scroll">{name}</span>
        </div>
        <div
          className="side"
          onClick={() => {
            setEnlargeImage(true);
          }}
          onMouseMove={(event) => {
            if (showing_front) {
              const bounds = event.currentTarget.getBoundingClientRect();
              let x = (event.clientX - bounds.left) / bounds.width;
              x = Math.max(0, Math.min(1, x));
              setCurrentImage(Math.floor(x * image_url.length));
            }
          }}
        >
          {
            <div className="image">
              <img
                src={image_url[current_image]}
                style={showing_front ? {} : { filter: "blur(40px)" }}
              />
            </div>
          }
          {showing_front && (
            <div className="index-holder">
              {image_url.map((_, i) => {
                if (i == current_image)
                  return <div key={i} className="index-indicator-on" />;
                else return <div key={i} className="index-indicator-off" />;
              })}
            </div>
          )}
          {showing_front && <div className="short-desc">{short_desc}</div>}
          {!showing_front && (
            <div className="full-desc-div">
              <div className="full-desc">{full_desc}</div>
            </div>
          )}
        </div>
        <div className="price">{"$" + price.toFixed(2)}</div>
        <div className="button-holder">
          <button
            onClick={() => {
              setShowingFront(!showing_front);
            }}
          >
            <div className="button-text">Info</div>
          </button>
          {onClickBuy && (
            <button onClick={() => onClickBuy(id)}>
              {" "}
              <div className="button-text">Buy</div>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
