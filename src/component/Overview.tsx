import "./Overview.css";
import "./../PortfolioEntries";
import { portfolio_entries } from "./../PortfolioEntries";
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
          {portfolio_entries.map((entry, i) => {
            return (
              <div className="overview-section">
                {entry.element}
                <div
                  className="large-button overview-button"
                  onClick={() => onButtonClick(i + 1)}
                >
                  {entry.name}
                </div>
                {i == 0 && (
                  <div className="scroll-indicator-mobile">
                    <div className="scroll-animation">
                      <div
                        className="scroll-blink"
                        style={{ animationDelay: "0s" }}
                      >
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
                )}
              </div>
            );
          })}
        </div>

        <div className="body copyright-mobile">David Grunzweig &#169; 2024</div>
      </>
    )
  );
};

export default Overview;
