import { useState, useRef, useEffect } from "react";
import "./ProductCard.css";

interface props {
  name: string;
  id: string;
  full_desc: string;
  image_url: string[];
  price: number;
  onClickBuy?: (id: string) => void;
}

const ProductCard = ({
  name,
  id,
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
  const touch_move = useRef(false);
  const handlers_added = useRef(false);

  const card_ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const touchStart = (e: any) => {
      touch_start_pos.current = e.touches[0].clientX;
      touch_end_pos.current = -1;
      e.preventDefault();
    };
    const touchMove = (e: any) => {
      touch_end_pos.current = e.touches[0].clientX;
      touch_move.current = true;
      e.preventDefault();
    };
    const touchEnd = (e: any) => {
      e.preventDefault();
      if (touch_move.current) {
        const distance = touch_end_pos.current - touch_start_pos.current;
        const swipe_threshold = 50;
        if (distance > swipe_threshold) {
          //right swipe
          let new_index = current_image - 1;
          if (new_index < 0) new_index += image_url.length;
          setCurrentImage((ci) => {
            let new_index = ci - 1;
            if (new_index < 0) new_index += image_url.length;
            return new_index;
          });
        } else if (distance < -swipe_threshold) {
          // left swipe
          setCurrentImage((ci) => {
            return (ci + 1) % image_url.length;
          });
        }
        touch_move.current = false;
      } else {
        if (showing_front) setEnlargeImage(true);
      }
    };
    if (card_ref.current && !handlers_added.current) {
      // prevents duplicate adding
      handlers_added.current = true;
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
  }, []);

  return (
    <>
      {enlarged_image && (
        <div
          className="image-overlay"
          onClick={() => {
            setEnlargeImage(false);
          }}
        >
          <div
            className="image-section"
            style={{ backgroundImage: `url(${image_url[current_image]})` }}
          >
            <button>X</button>
          </div>
        </div>
      )}
      <div className="card">
        <div className="name">{name}</div>
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
          {
            <button
              className="pc-info-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowingFront(!showing_front);
              }}
            >
              {showing_front ? "i" : "X"}
            </button>
          }
          {!showing_front && (
            <div className="full-desc-div">
              <div className="full-desc">{full_desc}</div>
            </div>
          )}
        </div>

        <div className="price">
          {"$" + price.toFixed(2)}
          {onClickBuy && (
            <button className="pc-buy-button" onClick={() => onClickBuy(id)}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
