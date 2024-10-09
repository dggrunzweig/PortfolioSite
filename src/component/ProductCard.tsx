import { useState, useRef, useEffect } from "react";
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
  const is_mobile = useRef(false);
  // handling swipes
  const touch_start_pos = useRef(-1);
  const touch_end_pos = useRef(-1);

  const card_ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const touchStart = (e: any) => {
      touch_start_pos.current = e.touches[0].clientX;
      touch_end_pos.current = -1;
      e.preventDefault();
    };
    const touchMove = (e: any) => {
      touch_end_pos.current = e.touches[0].clientX;
      touch_start_pos.current = -1;
      e.preventDefault();
    };
    const touchEnd = (e: any) => {
      if (touch_start_pos.current > 0 && touch_end_pos.current > 0) {
        const distance = touch_start_pos.current - touch_end_pos.current;
        const swipe_threshold = 50;
        if (distance < -swipe_threshold) {
          //right swipe
          let new_index = current_image - 1;
          if (new_index < 0) new_index += image_url.length;
          setCurrentImage(new_index);
        } else if (distance > swipe_threshold) {
          // left swipe
          setCurrentImage((current_image + 1) % image_url.length);
        } else {
          if (showing_front) setEnlargeImage(true);
        }
      }
      e.preventDefault();
    };
    if (card_ref.current) {
      if (window.innerWidth < 768) {
        is_mobile.current = true;
        card_ref.current.addEventListener("touchstart", touchStart, {
          passive: false,
        });
        card_ref.current.addEventListener("touchend", touchEnd, {
          passive: false,
        });
        card_ref.current.addEventListener("touchmove", touchMove, {
          passive: false,
        });
      }
    }
  });

  return (
    <>
      {enlarged_image && (
        <div
          className="image-overlay"
          onClick={() => {
            setEnlargeImage(false);
          }}
        >
          <div className="image-section">
            <img src={image_url[current_image]} />
            <button>X</button>
          </div>
        </div>
      )}
      <div className="card">
        <div className="name">
          <span className="scroll">{name}</span>
        </div>
        <div
          className="side"
          ref={card_ref}
          onClick={() => {
            if (showing_front) setEnlargeImage(true);
          }}
          onMouseMove={(event) => {
            if (showing_front && !is_mobile.current) {
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
                draggable={false}
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
