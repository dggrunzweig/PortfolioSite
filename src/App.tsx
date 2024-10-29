import "./App.css";
import NavMenu from "./component/NavMenu";
import AudioPlayer from "./component/AudioPlayer";
import ProductCardDemo from "./component/ProductCardDemo";
import PortfolioItem from "./component/PortfolioItem";
import VirtualDesktop from "./component/VirtualDesktop";
import { vd_files } from "./component/VirtualDesktopFileList";
import { useState, useRef } from "react";
import Overview from "./component/Overview";
import KnobDemo from "./component/KnobDemo";
import About from "./component/About";

function App() {
  const [current_tab, setCurrentTab] = useState(0);
  const nextPage = () => {
    setCurrentTab((t) => {
      return (t + 1) % 7;
    });
  };
  const prevPage = () => {
    setCurrentTab((t) => {
      t = t - 1;
      if (t < 0) t += 7;
      return t;
    });
  };
  const [menu_items, setMenuItems] = useState([
    "overview",
    "audio player",
    "Virtual Desktop",
    "product card",
    "analog knob",
    "substrata",
    "about",
    "linkedin",
    "email",
  ]);
  const timer_id = useRef(0);
  const setMenuIndex = (i: number) => {
    if (i <= 6) setCurrentTab(i);
    if (i == 7) {
      // go to linked in
      const new_tab = window.open(
        "https://www.linkedin.com/in/david-grunzweig/",
        "_blank"
      );
      new_tab?.focus();
    }
    if (i == 8) {
      navigator.clipboard.writeText("david@greentwig.xyz");
      menu_items[8] = "Copied";
      setMenuItems([...menu_items]);
      clearTimeout(timer_id.current);
      timer_id.current = setTimeout(() => {
        menu_items[8] = "email";
        setMenuItems([...menu_items]);
      }, 2000);
    }
  };

  return (
    <>
      <div className="app">
        <NavMenu
          menu_item_names={menu_items}
          onItemClick={setMenuIndex}
          current_page={current_tab}
        />
        <div className="view-area">
          <Overview visible={current_tab == 0} onButtonClick={setCurrentTab} />
          <PortfolioItem
            visible={current_tab == 1}
            nextPage={nextPage}
            prevPage={prevPage}
            name="Audio Player"
            description={[
              `An animated audio player widget built with canvas animations and Web Audio.`,
              `Inspired by the flat interface design of the early iPod and the text based UX in early WinAmp, the player uses Susan Kare's Chicago typeface and text character based icons.`,
              `The react component accepts a URL to a file and a title string as
the input. The controls allow a user to restart, rewind,
play/pause, fast forward and adjust the playback speed. The user
can drag the position of the playhead to change to a different
point in the track. The animation uses the frequency content of
the current audio data to animate a custom waveform design. The UX is reminiscent of
more traditional formats like records or cassettes, allowing the user to hear variations in the sound as they interact with it.`,
            ]}
            image_urls={["images/ipod-classic.png", "images/winamp_skin.png"]}
            children={
              <AudioPlayer
                audio_file_url="audio_files/Ron_Trent.mp3"
                title="Ron Trent - Morning Factory"
              />
            }
            source_link="https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/AudioPlayer.tsx"
          />

          <PortfolioItem
            visible={current_tab == 2}
            nextPage={nextPage}
            prevPage={prevPage}
            name="Virtual Desktop"
            description={[
              "A virtual desktop for browsing through photos or products.",
              "Inspired by Helmet Lang's 1998 runway show 'Seance De Travail' which was the first digital only runway show. It was released as a website and a CD-ROM containing photos and videos of the show. Users can open an image by clicking on it. A pane can be closed or maximized with the buttons in the top right corner. The pane can be dragged around with the mouse. If multiple panes are open, clicking one brings it to front. ",
              "The base React component takes a list of image URLs and item descriptions as an input and generates the layout automatically.  Images and text taken from Endyma Archive's site featuring pieces from this era of the designer.",
            ]}
            image_urls={[
              "helmut_lang/hl-cd-rom.webp",
              "helmut_lang/hl-online-show.webp",
            ]}
            children={<VirtualDesktop files={vd_files} />}
            source_link="https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/VirtualDesktop.tsx"
          />

          <PortfolioItem
            visible={current_tab == 3}
            nextPage={nextPage}
            prevPage={prevPage}
            name="Product Card"
            description={[
              `An interactive product card ideal for technical leaning product design.`,
              `As a user moves their mouse across the image, the image will automatically change based on it's position within the image. Clicking "Info" will reveal a longer description of the product. Clicking the image will reveal an enlarged version of the image as an overlay. Swiping is used to changes images on mobile. The use of high-viz and concrete color scheme along with technical typeface reinforces the stripped back and utilitarian aesthetic of the products.`,
              `The developer provides product name, id, image urls, descriptions, price, and buy function as inputs. Images from SSENSE, ACW, and ACRONYM.`,
            ]}
            image_urls={[]}
            source_link="https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/ProductCard.tsx"
            children={<ProductCardDemo />}
          />

          <PortfolioItem
            visible={current_tab == 4}
            nextPage={nextPage}
            prevPage={prevPage}
            name="Analog Knob"
            description={[
              `Inspired by the
              style of the legendary Vestex rotary mixers used by early House
              and Techno DJs. `,
              `The subtle skeumorphic design pays tribute to it's
              physical ancestor while keeping a clean and minimal design style
              rooted in the digital present. `,
              `A developer can set the name, initial value, min value, max
              value, update function, and an enabled flag. The knob can be set
              to provide either float or integer values depending on the
              settings provided by developer. If the knob is rotated while the
              "shift" key is held, the knob snaps to max or min values. Three examples are provided, the first uses integer values, the
              second uses float, and the third is how the knob looks when
              disabled.`,
            ]}
            source_link="https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/Knob.tsx"
            image_urls={["images/vestax-1.webp", "images/vestax-2.webp"]}
            children={<KnobDemo />}
          />

          <PortfolioItem
            visible={current_tab == 5}
            nextPage={nextPage}
            prevPage={prevPage}
            name="Substrata"
            description={[
              `A percussive low-frequency synthesizer. Designed for the ritualistic and hypnotic.`,
              `Inspired by the instruments like the Moog DFAM and my experience programming low frequency drum sequences in my musical partnership Night Sea. The Substrata synthesizer is a full featured synthesizer on the web. The sequencing and audio core were created in C, compiled to WASM, and then wrapped in a Web Audio worklet node. The UI is built with React and Tailwind CSS.`,
              `The synthesizer supports recording directly to WAV files, accomplished in C and then sent via ports as a blob of binary data for download. The use of Web MIDI allows the sequencer to be sync'd with external clock sources like a DAW or other hardware synthesizers. Internally the synthesizer uses wavetables for a crunchy and lo-fi digital tone.`,
            ]}
            image_urls={[]}
            source_link="https://github.com/dggrunzweig/Bassline"
            children={
              <iframe
                src="https://substrata-synth.netlify.app/"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              />
            }
          />
          <PortfolioItem
            visible={current_tab == 6}
            nextPage={nextPage}
            prevPage={prevPage}
            name="About"
            description={[
              `Design portfolio of David Grunzweig - software engineer, generative artist, electronic musician.`,
            ]}
            image_urls={[]}
            source_link="https://github.com/dggrunzweig"
            children={<About />}
          />
        </div>
      </div>
    </>
  );
}

export default App;
