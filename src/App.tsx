import "./App.css";
import AudioPlayer from "./component/AudioPlayer";
import ProductCard from "./component/ProductCard";
function App() {
  return (
    <>
      <div className="app">
        <div className="header1">David Grunzweig</div>
        <div className="header2">Front-end Design Portfolio</div>
        <div className="portfolio-item">
          <div className="description">
            <div className="header1">Audio Player</div>
            <div className="header3">
              An animated audio player widget built with React, canvas
              animations, and Web Audio, requires no external libraries.
              Inspired by the flat interface design of the early iPod, the type
              is a modernized version of Susan Kare's Chicago.
              <br />
              <br />
              The react component accepts a URL to a file and a title string as
              the input. The controls allow a user to restart, rewind,
              play/pause, fast forward and adjust the playback speed. The user
              can drag the position of the playhead to change to a different
              point in the track. The animation uses the frequency content of
              the current audio data to animate a custom waveform design. The
              ability for the user to modify the sound of the recording with the
              rewind, fast-forward, and playback rate controls reminds a user of
              more traditional formats like records or cassettes.
            </div>
          </div>
          <AudioPlayer
            audio_file_url="audio_files/Ron_Trent.mp3"
            title="Ron Trent - Morning Factory"
          />
        </div>
        <div className="portfolio-item">
          <div className="description">
            <div className="header1">Product Card</div>
            <div className="header3">
              An interactive product card ideal for technical leaning product
              design.
              <br />
              <br />
              The card is built with React and CSS. The developer provides
              product name, id, image urls, descriptions, price, and buy
              function as inputs. As a user moves their mouse across the image,
              the image will automatically change based on it's position within
              the image. Clicking "Info" will reveal a longer description of the
              product. Clicking the image will reveal an enlarged version of the
              image as an overlay. The use of high-viz and concrete color scheme
              along with technical typeface reinforces the stripped back and
              utilitarian aesthetic of the products.
              <br />
              <br />
              Images from SSENSE, ACW, 1017 ALYX 9SM, and ACRONYM.
            </div>
          </div>
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
        </div>
        <div className="portfolio-item">
          <div className="description">
            <div className="header1">Image Gallery</div>
            <div className="header3">
              An animated audio player widget built with React, canvas
              animations, and Web Audio, requires no external libraries.
              Inspired by the flat interface design of the early iPod, the type
              is a modernized version of Susan Kare's Chicago.
              <br />
              <br />
              The react component accepts a URL to a file and a title string as
              the input. The controls allow a user to restart, rewind,
              play/pause, fast forward and adjust the playback speed. The user
              can drag the position of the playhead to change to a different
              point in the track. The animation uses the frequency content of
              the current audio data to animate a custom waveform design. The
              ability for the user to modify the sound of the recording with the
              rewind, fast-forward, and playback rate controls reminds a user of
              more traditional formats like records or cassettes.
            </div>
          </div>
        </div>
        <div className="portfolio-item">
          <div className="description">
            <div className="header1">Buttons</div>
            <div className="header3">
              An animated audio player widget built with React, canvas
              animations, and Web Audio, requires no external libraries.
              Inspired by the flat interface design of the early iPod, the type
              is a modernized version of Susan Kare's Chicago.
              <br />
              <br />
              The react component accepts a URL to a file and a title string as
              the input. The controls allow a user to restart, rewind,
              play/pause, fast forward and adjust the playback speed. The user
              can drag the position of the playhead to change to a different
              point in the track. The animation uses the frequency content of
              the current audio data to animate a custom waveform design. The
              ability for the user to modify the sound of the recording with the
              rewind, fast-forward, and playback rate controls reminds a user of
              more traditional formats like records or cassettes.
            </div>
          </div>
        </div>
        <div className="portfolio-item">
          <div className="description">
            <div className="header1">Audio Player</div>
            <div className="header3">
              An animated audio player widget built with React, canvas
              animations, and Web Audio, requires no external libraries.
              Inspired by the flat interface design of the early iPod, the type
              is a modernized version of Susan Kare's Chicago.
              <br />
              <br />
              The react component accepts a URL to a file and a title string as
              the input. The controls allow a user to restart, rewind,
              play/pause, fast forward and adjust the playback speed. The user
              can drag the position of the playhead to change to a different
              point in the track. The animation uses the frequency content of
              the current audio data to animate a custom waveform design. The
              ability for the user to modify the sound of the recording with the
              rewind, fast-forward, and playback rate controls reminds a user of
              more traditional formats like records or cassettes.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
