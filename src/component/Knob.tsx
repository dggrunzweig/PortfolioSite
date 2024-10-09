import { useEffect, useRef, useState } from "react";
import "./Knob.css";

interface props {
  name: string;
  units: string;
  onChange: (x: number) => void;
  init_value: number;
  min_value: number;
  max_value: number;
  enabled: boolean;
  use_float: boolean;
}

const Knob = ({
  name,
  units,
  init_value,
  min_value,
  max_value,
  onChange,
  enabled = true,
  use_float = false,
}: props) => {
  const clamp = (x: number, min_x: number, max_x: number): number => {
    return Math.max(min_x, Math.min(x, max_x));
  };

  const touchStart = (e: any) => {
    setMouseClicked(true);
    e.preventDefault();
  };
  const touchEnd = (e: any) => {
    setMouseClicked(false);
    e.preventDefault();
  };
  const touchMove = (e: any) => {
    if (mouse_clicked) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = (e.touches[0].clientX - bounds.left) / bounds.width;
      const y = 1 - (e.touches[0].clientY - bounds.top) / bounds.height;
      RotateKnob(x, y, e.shiftKey);
    }
    e.preventDefault();
  };

  const knob_ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (knob_ref.current && enabled) {
      knob_ref.current.addEventListener("touchstart", touchStart, {
        passive: false,
      });
      knob_ref.current.addEventListener("touchend", touchEnd, {
        passive: false,
      });
      knob_ref.current.addEventListener("touchmove", touchMove, {
        passive: false,
      });
    }
  });

  const [value, setValue] = useState(init_value);
  const rotation = Math.round(
    ((value - min_value) / (max_value - min_value)) * 270 - 135
  );

  const r_tag = "rotate(" + rotation + "deg)";
  const nr_tag = "rotate(" + -rotation + "deg)";
  const [mouse_clicked, setMouseClicked] = useState(false);
  const RotateKnob = (x: number, y: number, shift: boolean) => {
    let angle = (Math.atan2(x - 0.5, y - 0.5) * 180) / Math.PI + 180;
    angle = clamp(angle, 45, 315) - 45;
    let new_val = (angle / 270) * (max_value - min_value) + min_value;
    // 2 points of precision
    new_val = Math.floor(new_val * 100) / 100;
    if (!use_float) {
      new_val = Math.floor(new_val);
    }
    if (shift) {
      if (angle < 180) new_val = min_value;
      else new_val = max_value;
    }
    if (enabled) {
      setValue(new_val);
      onChange(new_val);
    }
  };
  return (
    <div
      className="knob"
      ref={knob_ref}
      onMouseDown={() => {
        setMouseClicked(true);
      }}
      onMouseUp={() => {
        setMouseClicked(false);
      }}
      onMouseLeave={() => {
        setMouseClicked(false);
      }}
      onMouseMove={(e) => {
        if (mouse_clicked) {
          const bounds = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - bounds.left) / bounds.width;
          const y = 1 - (e.clientY - bounds.top) / bounds.height;
          RotateKnob(x, y, e.shiftKey);
        }
      }}
    >
      <div className="knob-title">{name}</div>
      <div className="knob-dial-border">
        <div
          className="knob-tick"
          style={{ transform: "rotate(45deg)", width: "150%" }}
        />
        <div
          className="knob-tick"
          style={{
            transform: "rotate(75deg) translateX(-10%)",
            width: "100%",
          }}
        />
        <div
          className="knob-tick"
          style={{
            transform: "rotate(105deg) translateX(-10%)",
            width: "100%",
          }}
        />
        <div className="knob-tick" style={{ transform: "rotate(135deg)" }} />
        <div className="knob-tick" style={{ transform: "rotate(165deg)" }} />
        <div className="knob-tick" style={{ transform: "rotate(195deg)" }} />
        <div className="knob-dial" style={{ transform: r_tag }}>
          {enabled && (
            <div className="knob-marker" style={{ transform: nr_tag }}></div>
          )}
        </div>
      </div>

      <div className="knob-value">
        {enabled ? value.toFixed(use_float ? 2 : 0) + units : "DISABLED"}
      </div>
    </div>
  );
};

export default Knob;
