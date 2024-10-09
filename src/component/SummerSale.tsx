import { useEffect, useRef } from "react";
import "./SummerSale.css";
interface props {
  title: string;
  onClick: Function;
  dusk_mode: boolean;
}

const SummerSale = ({ title, onClick, dusk_mode }: props) => {
  // helper function for converting rgb to a canvas fill string
  const rgbToString = (r: number, g: number, b: number, a: number = 1) => {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  };

  let text_color = "#edf293";
  if (dusk_mode) {
    text_color = "#f1cdcb";
  }

  // pre-render noise
  const CreateNoiseTexture = (w: number, h: number) => {
    // textures
    const noise_image = new OffscreenCanvas(w, h);
    const noise_ctx = noise_image.getContext("2d");
    if (noise_ctx) {
      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
          const noise_level = Math.floor(255 * Math.random());
          noise_ctx.fillStyle = rgbToString(
            noise_level,
            noise_level,
            noise_level,
            0.03
          );
          noise_ctx.fillRect(x, y, 1, 1);
        }
      }
      const ptrn = noise_ctx.createPattern(noise_image, "repeat");
      if (ptrn) return ptrn;
      console.log("Failed to Create Pattern");
    }
    console.log("Failed to Create Offscreen Canvas");
  };

  const canvas_ref = useRef<HTMLCanvasElement>(null!);
  const blurring_ref = useRef<HTMLDivElement>(null!);
  const last_frame_time = useRef(new Date());

  useEffect(() => {
    let render_id = 0;
    const start_time = new Date();
    if (canvas_ref.current) {
      const canvas = canvas_ref.current as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // scale canvas based on DPR
        const dpr = window.devicePixelRatio;
        ctx.scale(dpr, dpr);
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;

        const noise_pattern = CreateNoiseTexture(250, 250);
        last_frame_time.current = new Date();
        let fps = 10;
        let bg_g_1_color = rgbToString(62, 105, 216);
        let bg_g_2_color = rgbToString(130, 146, 189);
        let ll_color_1 = rgbToString(221, 222, 132, 0.5);
        let ll_color_2 = rgbToString(221, 222, 132, 0.0);
        if (dusk_mode) {
          bg_g_1_color = rgbToString(16, 45, 119);
          bg_g_2_color = rgbToString(59, 86, 156);
          ll_color_1 = rgbToString(220, 161, 91, 0.7);
          ll_color_2 = rgbToString(220, 161, 91, 0.0);
        }

        const t_pi = 2 * Math.PI;
        const max_blur_depth = 4;
        const blur_period = 3;

        const animation = () => {
          // get seconds
          const time = new Date();
          const w = canvas.width;
          const h = canvas.height;

          if (
            (time.getTime() - last_frame_time.current.getTime()) / 1000 >
            1 / fps
          ) {
            const seconds = time.getSeconds() + time.getMilliseconds() / 1000;

            // clear background
            ctx.clearRect(0, 0, w, h);

            // blue sky gradient
            const gradient = ctx.createLinearGradient(w / 4, 0, 0.75 * w, h);
            gradient.addColorStop(0, bg_g_1_color);
            gradient.addColorStop(1, bg_g_2_color);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);

            // light leak effect
            const h_start = h * (0.5 + 0.5 * Math.sin(seconds / 10));
            const light_leak = ctx.createLinearGradient(0, h_start, w, 0);
            light_leak.addColorStop(0, ll_color_1);
            light_leak.addColorStop(1, ll_color_2);

            ctx.fillStyle = light_leak;
            ctx.fillRect(0, 0, w, h);

            // add noise
            if (noise_pattern) {
              ctx.fillStyle = noise_pattern;
              ctx.fillRect(0, 0, w, h);
            }

            ctx.fillStyle = rgbToString(200, 200, 200);
            ctx.strokeStyle = rgbToString(200, 200, 200);
            if (dusk_mode) {
              ctx.fillStyle = rgbToString(150, 150, 150);
              ctx.strokeStyle = rgbToString(150, 150, 150);
            }

            // draw vintage film effect
            for (let i = 0; i < 3; ++i) {
              ctx.fillRect(w * Math.random(), h * Math.random(), 2, 2);
              ctx.beginPath();
              const path_start = [w * Math.random(), h * Math.random()];
              ctx.moveTo(path_start[0], path_start[1]);
              ctx.quadraticCurveTo(
                path_start[0] + 20 * Math.random(),
                path_start[1] + 20 * Math.random(),
                path_start[0] + 40 * Math.random(),
                path_start[1] + 40 * Math.random()
              );
              ctx.stroke();
            }

            last_frame_time.current = time;
          }

          // Text animation
          let seconds = (time.getTime() - start_time.getTime()) / 1000;

          // blur level
          const blur_level_1 =
            max_blur_depth *
            (0.5 + 0.5 * Math.sin((t_pi * seconds) / blur_period));

          const font_color = text_color + " 0px 0px ";
          blurring_ref.current.style.textShadow =
            font_color + blur_level_1 + "px";
          render_id = window.requestAnimationFrame(animation);
        };
        animation();
      }
    }

    return () => {
      window.cancelAnimationFrame(render_id);
    };
  }, []);

  return (
    <div className="sale-main-div" style={{ color: text_color }}>
      <canvas ref={canvas_ref} className="sale-canvas"></canvas>
      <div className="sale-text-div">
        <div className="sale-title-span" ref={blurring_ref}>
          {title}
        </div>
        <div
          className="button-span"
          onClick={() => {
            onClick();
          }}
          style={{ borderColor: text_color }}
        >
          View Now
        </div>
      </div>
    </div>
  );
};

export default SummerSale;
