import AudioPlayer from "./AudioPlayer";
import VirtualDesktop from "./VirtualDesktop";
import { vd_files } from "./VirtualDesktopFileList";
import "./Overview.css";
import ProductCardDemo from "./ProductCardDemo";
import KnobDemo from "./KnobDemo";

interface props {
  visible: boolean;
  onButtonClick: (i: number) => void;
}
const Overview = ({ visible, onButtonClick }: props) => {
  return (
    visible && (
      <>
        <div className="overview">
          <div className="scroll-indicator">
            <div className="body">Please Scroll</div>
            <div className="scroll-animation">
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
          </div>
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
            <div className="scroll-indicator-mobile">
              <div className="scroll-animation">
                <div className="scroll-blink" style={{ animationDelay: "0s" }}>
                  &gt;
                </div>
                <div
                  className="scroll-blink"
                  style={{ animationDelay: "0.2s" }}
                >
                  &gt;
                </div>
                <div
                  className="scroll-blink"
                  style={{ animationDelay: "0.4s" }}
                >
                  &gt;
                </div>
              </div>
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
        <div className="body copyright-mobile">David Grunzweig &#169; 2024</div>
      </>
    )
  );
};

export default Overview;
