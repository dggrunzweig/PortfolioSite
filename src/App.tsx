import { Children, useRef } from "react";
import "./App.css";
import AudioPlayer from "./component/AudioPlayer";
import Knob from "./component/Knob";
import ProductCard from "./component/ProductCard";
import SummerSale from "./component/SummerSale";
import PortfolioItem from "./component/PortfolioItem";
import VirtualDesktop, {
  PseudoFile,
  CreatePseudoFile,
} from "./component/VirtualDesktop";

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

  return (
    <>
      <div className="app">
        <div className="title1">David Grunzweig</div>
        <div className="title2">Front-end Design Portfolio</div>
        <PortfolioItem
          name="Audio Player"
          description={[
            `An animated audio player widget built with React, canvas
animations, and Web Audio, requires no external libraries.
Inspired by the flat interface design of the early iPod and the text based UX in early WinAmp, the player uses Susan Kare's Chicago typeface and text character based icons.`,
            `The react component accepts a URL to a file and a title string as
the input. The controls allow a user to restart, rewind,
play/pause, fast forward and adjust the playback speed. The user
can drag the position of the playhead to change to a different
point in the track. The animation uses the frequency content of
the current audio data to animate a custom waveform design. The
ability for the user to modify the sound of the recording with the
rewind, fast-forward, and playback rate controls reminds a user of
more traditional formats like records or cassettes.`,
          ]}
          image_urls={["images/ipod-classic.png", "images/winamp_skin.png"]}
          children={
            <AudioPlayer
              audio_file_url="audio_files/Ron_Trent.mp3"
              title="Ron Trent - Morning Factory"
            />
          }
        />
        <PortfolioItem
          name="Virtual Desktop File Browser"
          description={[
            "A virtual desktop for browsing through photos or products.",
            "Inspired by Helmet Lang's 1998 runway show 'Seance De Travail' which was the first digital only runway show. Released as a CD-ROM containing an application and images of the various clothing pieces. Images and text taken from Endyma Archive's site featuring pieces from this era of the designer.",
            "Users can open an image by clicking on it, drag the pane around with the mouse, the panes are reordered when clicked. The list base React component takes a list of image URLs and item descriptions as an input and generates the layout automatically.",
          ]}
          image_urls={["images/helmut-lang-online-show-1998.webp"]}
          children={<VirtualDesktop files={files} />}
        />

        <PortfolioItem
          name="Product Card"
          description={[
            `An interactive product card ideal for technical leaning product design.`,
            `The card is built with React and CSS. The developer provides product name, id, image urls, descriptions, price, and buy function as inputs. As a user moves their mouse across the image, the image will automatically change based on it's position within the image. Clicking "Info" will reveal a longer description of the product. Clicking the image will reveal an enlarged version of the image as an overlay. The use of high-viz and concrete color scheme along with technical typeface reinforces the stripped back and utilitarian aesthetic of the products.`,
            `Images from SSENSE, ACW, 1017 ALYX 9SM, and ACRONYM.`,
          ]}
          image_urls={[]}
          children={
            <div className="product-card-viewer">
              <ProductCard
                name="Contour Jacket"
                short_desc="A lightweight textured nylon jacket, in a relaxed fit."
                price={575.0}
                full_desc="A lightweight textured nylon jacket, in a relaxed fit. CORDURA® pads the chest and neck, adding contrast to the zip area and a technical affect. Sleeves carry a deep hem and internal cuff. On the body, curved panels build a long, asymmetric seam running from front to back hem."
                id="1"
                image_url={[
                  "/acw_jacket/acw_1.webp",
                  "/acw_jacket/acw_2.webp",
                  "/acw_jacket/acw_3.webp",
                  "/acw_jacket/acw_4.webp",
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
                  "/acw_sweater/sweater-1.webp",
                  "/acw_sweater/sweater-2.webp",
                  "/acw_sweater/sweater-3.webp",
                  "/acw_sweater/sweater-4.webp",
                ]}
                onClickBuy={(id: string): void => {
                  console.log("Attempting to buy: " + id);
                }}
              />
              <ProductCard
                name="Black Low Buckle Boots"
                short_desc="Ankle-high buffed calfskin boots in black."
                price={600.0}
                full_desc="
              Ankle-high buffed calfskin boots in black. Wraparound cord with signature press-release buckle at collar. Webbing pull-loop at heel collar. Buffed calfskin lining. Stacked calfskin heel. Calfskin sole with rubber injection. Heel: H1"
                id="3"
                image_url={[
                  "/alyx_boot/boot-1.avif",
                  "/alyx_boot/boot-2.avif",
                  "/alyx_boot/boot-3.avif",
                  "/alyx_boot/boot-4.avif",
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
                id="4"
                image_url={[
                  "/ACRONYM-Jacket/jacket-1.avif",
                  "/ACRONYM-Jacket/jacket-2.avif",
                  "/ACRONYM-Jacket/jacket-3.avif",
                  "/ACRONYM-Jacket/jacket-4.avif",
                ]}
                onClickBuy={(id: string): void => {
                  console.log("Attempting to buy: " + id);
                }}
              />
            </div>
          }
        />
        <PortfolioItem
          name="Pure CSS and React Knob"
          description={[
            `A controllable knob built with React and CSS. Inspired by the
              style of the legendary Vestex rotary mixers used by early House
              and Techno DJs. The subtle skeumorphic design pays tribute to it's
              physical ancestor while keeping a clean and minimal design style
              rooted in the digital present.`,
            `A developer can set the name, initial value, min value, max
              value, update function, and an enabled flag. The knob can be set
              to provide either float or integer values depending on the
              settings provided by developer. If the knob is rotated while the
              "shift" key is held, the knob snaps to max or min values.`,
            `Three examples are provided, the first uses integer values, the
              second uses float, and the third is how the knob looks when
              disabled.`,
          ]}
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

        <PortfolioItem
          name="Endless Summer (or Winter) Animation"
          description={[
            `An animated banner section with a nostalgic and hazy vibe. Two
          possible color palettes, one for spring / summer and one for fall /
          winter.`,
            `The animation is accomplished generatively with a canvas element,
          the text defocusing is accomplished using CSS settings. The
          animation is inspired by light leak and noise + dust in old films.`,
          ]}
          image_urls={[]}
          children={
            <>
              <SummerSale
                title="End of Summer Sale is Here!"
                onClick={() => {
                  console.log("End of Summer Sale Button Clicked");
                }}
                dusk_mode={false}
              ></SummerSale>
              <SummerSale
                title="Winter Sale is Here!"
                onClick={() => {
                  console.log("Winter Sale Button Clicked");
                }}
                dusk_mode={true}
              ></SummerSale>
            </>
          }
        />
      </div>
    </>
  );
}

export default App;
