import React from "react";
import AudioPlayer from "./AudioPlayer";
import VirtualDesktop from "./VirtualDesktop";
import { vd_files } from "./VirtualDesktopFileList";
import ProductCard from "./ProductCard";
import Knob from "./Knob";
import "./Overview.css";
import ProductCardDemo from "./ProductCardDemo";
import KnobDemo from "./KnobDemo";

interface props {
  visible: boolean;
  onButtonClick: (i: number) => void;
}
const Overview = ({ visible, onButtonClick }: props) => {
  const scroll_y = window.scrollY;
  return (
    visible && (
      <>
        {scroll_y < 200 && (
          <div className="scroll-indicator">
            <div className="scroll-blink" style={{ animationDelay: "0s" }}>
              &gt;
            </div>
            <div className="scroll-blink" style={{ animationDelay: "0.2s" }}>
              &gt;
            </div>
            <div className="scroll-blink" style={{ animationDelay: "0.4s" }}>
              &gt;
            </div>
          </div>
        )}
        <div className="overview">
          <div className="overview-section">
            <AudioPlayer
              audio_file_url="audio_files/Ron_Trent.mp3"
              title="Ron Trent - Morning Factory"
            />
            <div
              className="large-button overview-button"
              onClick={() => onButtonClick(1)}
            >
              Audio Player
            </div>
          </div>
          <div className="overview-section">
            <VirtualDesktop files={vd_files} />
            <div
              className="large-button overview-button"
              onClick={() => onButtonClick(2)}
            >
              Virtual Desktop
            </div>
          </div>
          <div className="overview-section">
            <ProductCardDemo />
            <div
              className="large-button overview-button"
              onClick={() => onButtonClick(3)}
            >
              Product Card
            </div>
          </div>
          <div className="overview-section">
            <KnobDemo />
            <div
              className="large-button overview-button"
              onClick={() => onButtonClick(4)}
            >
              Analog Knob
            </div>
          </div>
          <div className="overview-section">
            <iframe
              src="https://substrata-synth.netlify.app/"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
            <div
              className="large-button overview-button"
              onClick={() => onButtonClick(5)}
            >
              Substrata
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Overview;
