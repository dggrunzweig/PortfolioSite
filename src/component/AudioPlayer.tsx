import { useEffect, useRef, useState } from "react";
import {
  createAudioContext,
  createBiquadFilter,
  CreateBufferFromFile,
  createBufferSource,
  createGain,
  db2mag,
  ReverseAudioBuffer,
} from "./audio_utils";
import "./AudioPlayer.css";

const SecondsToDisplayTime = (seconds: number): string => {
  let mins = Math.floor(seconds / 60);
  const hours = Math.floor(mins / 60);
  mins = Math.floor(mins - hours * 60);
  seconds = Math.floor(seconds - hours * 3600 - mins * 60);
  let return_string =
    mins.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  if (hours > 0)
    return_string = hours.toString().padStart(2, "0") + ":" + return_string;
  return return_string;
};

const fastPerlin = (rate: number, last_val: number): number => {
  return rate * Math.random() + (1 - rate) * last_val;
};

const WaveForm = (a: number[], t: number, p = 0): number => {
  let y = 0;
  p = 2 * Math.PI * p;
  for (let i = 0; i < a.length; ++i) {
    y += a[i] * Math.sin(1.31 * 2 * Math.PI * (2.7 * i + 1) * t + p);
  }
  return Math.abs(y) * Math.sin((2 * Math.PI * t) / 2);
};

interface props {
  audio_file_url: string;
  title?: string;
}

const AudioPlayer = ({ audio_file_url, title }: props) => {
  const canvas_ref = useRef(null);
  const audio_ctx = useRef<AudioContext>(createAudioContext());
  const [file_loaded, setFileLoaded] = useState(false);
  const canvas_setup = useRef(false);
  const file_player = useRef<AudioBufferSourceNode>(null!);
  const audio_buffer = useRef<AudioBuffer>(null!);
  const rev_audio_buffer = useRef<AudioBuffer>(null!);
  const analyzer = useRef<AnalyserNode>(audio_ctx.current.createAnalyser());
  const analysis_gain = useRef<GainNode>(
    createGain(audio_ctx.current, db2mag(0))
  );
  const analysis_smoother = useRef<BiquadFilterNode>(
    createBiquadFilter(audio_ctx.current, "lowpass", 20000, 1.0, 0)
  );
  const [is_playing, setPlaying] = useState(false);
  const [current_time, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1); // causes divide by zero if set to 0
  const timer_id = useRef(0);

  const speeds = [0.5, 0.75, 1.0, 2.0];
  const speed_text = ["½", "¾", "1", "2"];
  // index of desired speed
  const [playback_speed, setPlaybackSpeed] = useState(2);

  const ConnectNodes = (reverse = false) => {
    file_player.current = createBufferSource(
      audio_ctx.current,
      reverse ? rev_audio_buffer.current : audio_buffer.current,
      1.0,
      false
    );
    file_player.current.connect(audio_ctx.current.destination);
    file_player.current
      .connect(analysis_gain.current)
      .connect(analysis_smoother.current)
      .connect(analyzer.current);
  };

  useEffect(() => {
    if (canvas_ref.current && !canvas_setup.current) {
      // prevents double assignment of this code while react is in strict mode
      canvas_setup.current = true;
      // get the canvas context for drawing
      const canvas = canvas_ref.current as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio;
      if (ctx) ctx.scale(dpr, dpr);
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // load audio file into buffer
      CreateBufferFromFile(audio_ctx.current, audio_file_url)
        .then((buffer) => {
          if (buffer) {
            setDuration(buffer.duration);
            setCurrentTime(0);
            audio_buffer.current = buffer;
            rev_audio_buffer.current = ReverseAudioBuffer(buffer);
            ConnectNodes();
            let requestID = 0;
            const num_samples = analyzer.current.frequencyBinCount;
            const low_bin = Math.floor((1000 / 24000) * num_samples);
            const mid_bin = Math.floor((4000 / 24000) * num_samples);
            let frame_count = 0;
            const p_frames = 10;
            let p = 0;
            const last_frame = new Array<number>(num_samples).fill(0);
            const r = 0.2;
            const render = () => {
              if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#373030";
                const data = new Float32Array(num_samples);
                analyzer.current.getFloatFrequencyData(data);
                let bin_sum = new Array<number>(3).fill(0);
                for (let i = 0; i < num_samples; ++i) {
                  if (i < low_bin) {
                    bin_sum[0] += db2mag(data[i]);
                  } else if (i < mid_bin) {
                    bin_sum[1] += db2mag(data[i]);
                  } else {
                    bin_sum[2] += db2mag(data[i]);
                  }
                }
                // treat bins to get better visualization
                bin_sum[1] *= db2mag(3);
                bin_sum[2] *= db2mag(6);
                // simple perlin to get some extra movement
                if (frame_count == p_frames) {
                  p = fastPerlin(0.1, p);
                  frame_count = 0;
                }

                for (let x = 0; x < canvas.width; x += 4) {
                  const y =
                    r * WaveForm(bin_sum, x / canvas.width, p) +
                    (1 - r) * last_frame[x];
                  last_frame[x] = y;
                  // minus three ensure the rects show up a bit even without data
                  ctx.fillRect(x, canvas.height, 1, -y * canvas.height - 3);
                }
                frame_count++;
              }
              requestID = requestAnimationFrame(render);
            };
            render();
            setFileLoaded(true);

            return () => {
              cancelAnimationFrame(requestID);
            };
          }
        })
        .catch((error) => {
          console.log("Failed to load audio file");
          console.log(error.message);
        });
    }
  }, []);

  const Play = () => {
    if (audio_ctx.current && file_player.current && file_loaded) {
      if (audio_ctx.current.state == "suspended") {
        audio_ctx.current.resume();
      }
      if (!is_playing) {
        file_player.current.start(audio_ctx.current.currentTime, current_time);
        timer_id.current = setInterval(() => {
          setCurrentTime((c) => c + 1);
        }, 1000);
      }
      if (is_playing) {
        file_player.current.stop();
        clearInterval(timer_id.current);
        ConnectNodes();
      }
      setPlaying(!is_playing);
    }
  };

  let playhead_position = 0;
  // translate div element based on position in the audio track
  if (canvas_ref.current) {
    const canvas = canvas_ref.current as HTMLCanvasElement;
    playhead_position = Math.floor(
      (canvas.offsetWidth * current_time) / duration
    );
  }

  const StartBufferAtTime = (
    time: number,
    reverse = false,
    playback_rate = 1
  ) => {
    setCurrentTime(time);
    if (is_playing && file_player.current) {
      file_player.current.stop();
      clearInterval(timer_id.current);
      ConnectNodes(reverse);
      const start_time = reverse ? duration - time : time;
      file_player.current.start(audio_ctx.current.currentTime, start_time);
      file_player.current.playbackRate.setValueAtTime(
        playback_rate,
        audio_ctx.current.currentTime
      );
      timer_id.current = setInterval(() => {
        setCurrentTime((c) => {
          if (reverse && c > 0) return c - 1;
          else if (!reverse && Math.floor(c) < Math.floor(duration))
            return c + 1 * playback_rate;
          else return c;
        });
      }, 1000);
    }
  };

  return (
    <div className="audio-player">
      {title != "" && <span className="title">{title}</span>}
      <canvas className="audio-visualizer" ref={canvas_ref} />
      {!file_loaded ? (
        <div className="loading-div">loading...</div>
      ) : (
        <div
          className="timeline"
          onClick={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width;
            StartBufferAtTime(
              Math.floor(x * duration),
              false,
              speeds[playback_speed]
            );
          }}
        >
          <div className="timeline-line" />
          <div
            className="timeline-marker"
            style={{ left: `${playhead_position}px` }}
          ></div>
        </div>
      )}
      <div className="time-viewer">
        <span>{SecondsToDisplayTime(current_time)}</span>
        <div className="button-holder">
          <button
            className="button"
            disabled={!file_loaded}
            style={{ paddingTop: "0.25em" }}
            onClick={() => {
              StartBufferAtTime(0, false, speeds[playback_speed]);
            }}
          >
            {"↩" + String.fromCharCode(0xfe0e)}
          </button>
          <button
            className="button"
            disabled={!file_loaded}
            style={{ paddingBottom: "1px" }}
            onMouseDown={() => {
              StartBufferAtTime(current_time, true, 1);
            }}
            onTouchStart={() => {
              StartBufferAtTime(current_time, true, 1);
            }}
            onMouseUp={() => {
              StartBufferAtTime(current_time, false, speeds[playback_speed]);
            }}
            onTouchEnd={() => {
              StartBufferAtTime(current_time, false, speeds[playback_speed]);
            }}
          >
            «
          </button>
          <button
            className="button"
            disabled={!file_loaded}
            style={{ paddingBottom: is_playing ? "2px" : "0px" }}
            onClick={() => {
              Play();
            }}
          >
            {is_playing ? "||" : ">"}
          </button>
          <button
            className="button"
            disabled={!file_loaded}
            style={{ paddingBottom: "1px" }}
            onMouseDown={() => {
              StartBufferAtTime(current_time, false, 2);
            }}
            onTouchStart={() => {
              StartBufferAtTime(current_time, false, 2);
            }}
            onMouseUp={() => {
              StartBufferAtTime(current_time, false, speeds[playback_speed]);
            }}
            onTouchEnd={() => {
              StartBufferAtTime(current_time, false, speeds[playback_speed]);
            }}
          >
            »
          </button>
          <button
            className="button"
            disabled={!file_loaded}
            onClick={() => {
              const new_speed = (playback_speed + 1) % speeds.length;
              setPlaybackSpeed(new_speed);
              StartBufferAtTime(current_time, false, speeds[new_speed]);
            }}
          >
            {speed_text[playback_speed]}
          </button>
        </div>
        <span>{SecondsToDisplayTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
