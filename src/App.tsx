import "./App.css";
import NavMenu from "./component/NavMenu";
import AudioPlayer from "./component/AudioPlayer";
import Knob from "./component/Knob";
import ProductCard from "./component/ProductCard";
import PortfolioItem from "./component/PortfolioItem";
import VirtualDesktop, {
  PseudoFile,
  CreatePseudoFile,
} from "./component/VirtualDesktop";
import { useRef } from "react";

function App() {
  const knobOnChange = (value: number) => {
    console.log("Knob Value: " + value);
  };

  // create fake files for desktop simulator
  const files = new Array<PseudoFile>();
  files.push(
    CreatePseudoFile(
      "helmut_lang/cotton-chesterfield-coat.webp",
      "This classic Chesterfield coat is one of Lang's most iconic pieces, encapsulating his visually resolute and streamlined approach to power dressing."
    )
  );
  files.push(
    CreatePseudoFile(
      "helmut_lang/waffle-knit-shirt.jpg",
      "An unlikely find even for the most diligent Helmut Lang collectors, this T-Shirt is a strong example of Lang's iconic no-so-basic basics from a very distinctive moment in the history of contemporary fashion. "
    )
  );
  files.push(
    CreatePseudoFile(
      "helmut_lang/abstract-print-shirt.webp",
      "A beautiful piece that combines everyday versatility with sophistication, this top is a signature creation from Helmut Lang's most prolific period as a designer. "
    )
  );
  files.push(
    CreatePseudoFile(
      "helmut_lang/painter-jeans.webp",
      "Lang's iconic 'Painter Jean' was introduced for S/S 1998 and is certainly one of his most celebrated denim creations. Nearly two decades after their release, they have become one of Lang's most coveted garments."
    )
  );
  files.push(
    CreatePseudoFile(
      "helmut_lang/tailored-biker-coat.webp",
      "An iconic Helmut Lang outerwear design, this coat captures the A/W 1999 collection's much-imitated aesthetic. Its superb quality, beautiful fabric and directional aesthetic will make it a wardrobe essential that you will reach for again and again."
    )
  );
  files.push(
    CreatePseudoFile(
      "helmut_lang/biker-parka-with-straps.webp",
      "Inspired by astronaut uniforms, motorcycle safety gear and rave subcultures, Lang created a subversively elegant and uncompromisingly modern universe that has since then inspired a long list of designers. "
    )
  );
  files.push(
    CreatePseudoFile(
      "helmut_lang/cotton-padded-biker-coat.webp",
      "The parka has an oversized, unstructured silhouette; the shoulders are fairly defined, however the body is cut wide and straight for a dramatic shape with plenty of room for layering."
    )
  );

  const intro_ref = useRef<HTMLDivElement>(null!);
  const audio_player_ref = useRef<HTMLDivElement>(null!);
  const virtual_desktop_ref = useRef<HTMLDivElement>(null!);
  const product_card_ref = useRef<HTMLDivElement>(null!);
  const knob_ref = useRef<HTMLDivElement>(null!);
  const substrata_ref = useRef<HTMLDivElement>(null!);

  const refs = useRef([
    intro_ref,
    audio_player_ref,
    virtual_desktop_ref,
    product_card_ref,
    knob_ref,
    substrata_ref,
  ]);

  return (
    <>
      <div className="app">
        <NavMenu
          menu_item_names={[
            "intro",
            "audio player",
            "Virtual Desktop",
            "product card",
            "analog knob",
            "substrata",
          ]}
          portfolio_item_refs={refs}
        />
        <div ref={intro_ref}>
          <PortfolioItem
            name="David Grunzweig"
            description={[
              "Front End Design Portfolio",
              "The following is a selection of digital design artifacts intended to represent my skillset and design taste.",
              "Desktop and Mobile friendly.",
            ]}
            children={
              <div className="header2">
                All projects were built using ReactJS with vanilla Typescript
                and CSS, no external libraries or React packages were used.{" "}
              </div>
            }
            image_urls={[
              "images/profile/profile.avif",
              "images/profile/artwork.avif",
            ]}
            source_link=""
          />
        </div>
        <div ref={audio_player_ref}>
          <PortfolioItem
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
        </div>
        <div ref={virtual_desktop_ref}>
          <PortfolioItem
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
            children={<VirtualDesktop files={files} />}
            source_link="https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/VirtualDesktop.tsx"
          />
        </div>
        <div ref={product_card_ref}>
          <PortfolioItem
            name="Product Card"
            description={[
              `An interactive product card ideal for technical leaning product design.`,
              `As a user moves their mouse across the image, the image will automatically change based on it's position within the image. Clicking "Info" will reveal a longer description of the product. Clicking the image will reveal an enlarged version of the image as an overlay. Swiping is used to changes images on mobile. The use of high-viz and concrete color scheme along with technical typeface reinforces the stripped back and utilitarian aesthetic of the products.`,
              `The developer provides product name, id, image urls, descriptions, price, and buy function as inputs. Images from SSENSE, ACW, and ACRONYM.`,
            ]}
            image_urls={[]}
            source_link="https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/ProductCard.tsx"
            children={
              <div className="product-card-viewer">
                <ProductCard
                  name="Contour Jacket"
                  short_desc="A lightweight textured nylon jacket, in a relaxed fit."
                  price={575.0}
                  full_desc="A lightweight textured nylon jacket, in a relaxed fit. CORDURA® pads the chest and neck, adding contrast to the zip area and a technical affect. Sleeves carry a deep hem and internal cuff. On the body, curved panels build a long, asymmetric seam running from front to back hem."
                  id="1"
                  image_url={[
                    "acw_jacket/acw_1.webp",
                    "acw_jacket/acw_2.webp",
                    "acw_jacket/acw_3.webp",
                    "acw_jacket/acw_4.webp",
                  ]}
                  onClickBuy={(id: string): void => {
                    console.log("Attempting to buy: " + id);
                  }}
                />
                <ProductCard
                  name="Frontage Knit Crewneck"
                  short_desc="A Merino wool crewneck."
                  price={535.0}
                  full_desc="A Merino wool crewneck. The layering effect is achieved through a double-bed jacquard technique. This is augmented by the fashioning of threads throughout."
                  id="2"
                  image_url={[
                    "acw_sweater/sweater-1.webp",
                    "acw_sweater/sweater-2.webp",
                    "acw_sweater/sweater-3.webp",
                    "acw_sweater/sweater-4.webp",
                  ]}
                  onClickBuy={(id: string): void => {
                    console.log("Attempting to buy: " + id);
                  }}
                />
                <ProductCard
                  name="J123A-GT Bomber Jacket"
                  short_desc="GORE-TEX® 3L nylon ripstop bomber jacket."
                  price={1655.0}
                  full_desc="
Windproof, water-repellent, breathable, and lightweight. GORE-TEX® stretch laminate stand collar, hem, and cuffs. Zip closure. Zip pockets. Velcro tabs at front and sleeves. Concealed bungee-style drawstring at hem. Zip expansion panel at sides seams. Flap pocket at sleeve. Locker loop at back collar. Detachable elasticized shoulder strap at interior. Taped seams. Unlined. Includes studded and logo-printed velcro tape"
                  id="3"
                  image_url={[
                    "ACRONYM-Jacket/jacket-1.avif",
                    "ACRONYM-Jacket/jacket-2.avif",
                    "ACRONYM-Jacket/jacket-3.avif",
                    "ACRONYM-Jacket/jacket-4.avif",
                  ]}
                  onClickBuy={(id: string): void => {
                    console.log("Attempting to buy: " + id);
                  }}
                />
              </div>
            }
          />
        </div>
        <div ref={knob_ref}>
          <PortfolioItem
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
            children={
              <div className="knob-div">
                <Knob
                  name="Angle"
                  units="˚"
                  onChange={knobOnChange}
                  init_value={90}
                  min_value={0}
                  max_value={270}
                  enabled={true}
                  use_float={false}
                ></Knob>
                <Knob
                  name="Level"
                  units="dB"
                  onChange={knobOnChange}
                  init_value={-12}
                  min_value={-40}
                  max_value={6}
                  enabled={true}
                  use_float={true}
                ></Knob>
                <Knob
                  name="Level"
                  units="dB"
                  onChange={knobOnChange}
                  init_value={0}
                  min_value={-60}
                  max_value={12}
                  enabled={false}
                  use_float={false}
                ></Knob>
              </div>
            }
          />
        </div>
        <div ref={substrata_ref}>
          <PortfolioItem
            name="Substrata"
            description={[
              `A percussive low-frequency synthesizer. Designed for the ritualistic and hypnotic.`,
              `Inspired by the instruments like the Moog DFAM and my experience programming low frequency drum sequences in my musical partnership Night Sea. The Substrata synthesizer is a full featured synthesizer on the web. The sequencing and audio core were created in C, compiled to WASM, and then wrapped in a Web Audio worklet node. The UI is built with React and Tailwind CSS.`,
              `The synthesizer supports recording directly to WAV files, accomplished in C and then sent via ports as a blob of binary data for download. The use of Web MIDI allows the sequencer to be sync'd with external clock sources like a DAW or other hardware synthesizers. Internally the synthesizer uses wavetables for a crunchy and lo-fi digital tone.`,
            ]}
            image_urls={[]}
            source_link="https://github.com/dggrunzweig/Bassline"
            children={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1em",
                }}
              >
                <div
                  className="header2"
                  style={{
                    textDecoration: "underline",
                    color: "var(--portfolio-header-color)",
                  }}
                  onClick={() => {
                    let new_tab = window.open(
                      "https://substrata-synth.netlify.app/",
                      "_blank"
                    );
                    new_tab?.focus();
                  }}
                >
                  View the Project Live Here
                </div>
                <img
                  src="substrata/Substrata.png"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}

export default App;
