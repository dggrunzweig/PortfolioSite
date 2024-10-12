import { useState, useRef, useEffect } from "react";
import "./Contact.css";

interface props {
  available: boolean;
}

const Contact = ({ available }: props) => {
  const number_of_reps = 22;
  const reps = new Array<number>(number_of_reps).fill(0);
  const [contact_visible, setContactVisible] = useState(false);
  const [copied_index, setCopiedIndex] = useState(-1);

  // opens a link or copies to clipboard
  const CopyOrOpen = (index: number) => {
    const value = contact_copy.current[index];
    if (open_link.current[index]) {
      const new_tab = window.open(value, "_blank");
      new_tab?.focus();
    } else {
      navigator.clipboard.writeText(value);
      setCopiedIndex(index);
    }
  };

  // resets copy state
  useEffect(() => {
    if (copied_index >= 0) {
      setTimeout(() => {
        setCopiedIndex(-1);
      }, 1000);
    }
  }, [copied_index]);

  const contact_data = useRef([
    "david@greentwig.xyz",
    "(509)-863-3320",
    "LinkedIn",
    "Instagram",
  ]);
  const contact_copy = useRef([
    "david@greentwig.xyz",
    "(509)-863-3320",
    "https://www.linkedin.com/in/david-grunzweig/",
    "https://www.instagram.com/dgg_av/",
  ]);
  const open_link = useRef([false, false, true, true]);

  return (
    <div className="contact-banner">
      <div className="scroll-bar">
        {reps.map((_, i) => {
          return (
            available && (
              <div key={1235 * i} className="banner-item-scrolling">
                Available For Work
              </div>
            )
          );
        })}
      </div>
      <div
        className="banner-item-fixed"
        onClick={() => {
          setContactVisible(!contact_visible);
        }}
      >
        Contact
      </div>
      {contact_visible && (
        <div className="banner-contact-info">
          {contact_data.current.map((d, i) => {
            return (
              <div
                className="banner-contact-info-item"
                key={d}
                onClick={() => {
                  CopyOrOpen(i);
                }}
              >
                {i == copied_index ? "Copied To Clipboard" : d}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Contact;
