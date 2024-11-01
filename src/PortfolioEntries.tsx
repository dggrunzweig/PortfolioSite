import { ReactElement } from "react";

import About from "./component/About";
import AudioPlayer from "./component/AudioPlayer";
import KnobDemo from "./component/KnobDemo";
import { PortfolioEntry } from "./component/PortfolioItem";
import ProductCardDemo from "./component/ProductCardDemo";
import QuoteTableDemo from "./component/QuoteTableDemo";
import VirtualDesktop from "./component/VirtualDesktop";
import { vd_files } from "./component/VirtualDesktopFileList";

const createEntry = (
  name: string,
  source_link: string,
  description: string,
  more_info: boolean,
  element?: ReactElement,
  problem_text?: string,
  problem_image_urls?: string[],
  exploration_text?: string,
  exploration_image_urls?: string[],
  challenges_text?: string,
  challenges_image_urls?: string[],
  outcome_text?: string,
  outcome_image_urls?: string[]
): PortfolioEntry => {
  return {
    name: name,
    source_link: source_link,
    description: description,
    more_info: more_info,
    element: element,
    problem_text: problem_text,
    problem_image_urls: problem_image_urls,
    exploration_text: exploration_text,
    exploration_image_urls: exploration_image_urls,
    challenges_text: challenges_text,
    challenges_image_urls: challenges_image_urls,
    outcome_text: outcome_text,
    outcome_image_urls: outcome_image_urls,
  };
};

export const portfolio_entries = [
  createEntry(
    "Audio Player",
    "https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/AudioPlayer.tsx",
    "An animated audio player widget built with canvas animations and Web Audio.",
    true,
    <AudioPlayer
      audio_file_url="audio_files/Ron_Trent.mp3"
      title="Ron Trent - Morning Factory"
    />,
    "I follow musicians who write about their process platforms like Substack and Medium. Neither platform was designed with the idea that some writers would need to showcase sounds as an essential part of their writing. As a result, the audio experience on these types of sites often lacks polish and intention.",
    ["./images/AudioPlayer/Widget Comparison.png"],
    "As a source of inspiration I turned to my personal history of cherished audio devices, my first silver and white iPod. I wanted to capture the charm of this device, through things like bit fonts, text-based icons, and limited colors. To create a more visually engaging experience, I sought to pair this with an animation that was reminiscent of the spectrograms on early digital audio equipment but imbued with a softness afforded by modern, high-resolution, screens.",
    [
      "./images/AudioPlayer/ipod-classic.png",
      "./images/AudioPlayer/graphic eq.webp",
    ],
    "The primary technical limitation I placed on the project was that it should use only React, Web Audio, CSS, and Canvas animations. This would ensure the project had no dependencies on external libraries and that animation would be supported without needing WebGL. While simpler approaches exist for streaming audio, I wanted to create an audio player that the sonic characteristics of older analog mediums like vinyl records or cassettes. This experience juxtaposed against the digital nature of the widget gives it a unique personality.  This required loading the audio stream into a WebAudio buffer player which allows the user to manipulate things like playback speed and direction.",
    ["./images/AudioPlayer/challenges.png"],
    "The final product is a standalone widget that can be easily reused for multiple audio files. As an input, the user provides a URL to the audio file on the server and a title for the audio file (in this example “Ron Trent - Morning Factory”). The use of animations and the ability to explore various sonic manipulations through the interface give the player far more character and interactivity than the traditional file player interface.",
    ["./images/AudioPlayer/Outcome.png"]
  ),
  createEntry(
    "Virtual Desktop",
    "https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/VirtualDesktop.tsx",
    "A virtual desktop for browsing through photos or products.",
    false,
    <VirtualDesktop files={vd_files} />
  ),
  createEntry(
    "Product Card",
    "https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/ProductCard.tsx",
    "An interactive product card ideal for technical leaning product design.",
    false,
    <ProductCardDemo />
  ),
  createEntry(
    "Analog Knob",
    "https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/Knob.tsx",
    "Inspired by the legendary Vestex rotary mixers used by early House and Techno DJs.",
    false,
    <KnobDemo />
  ),
  createEntry(
    "Quote Table",
    "https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/QuoteTable.tsx",
    "A table view for storing quotes. Quotes can be added, removed, or previewed.",
    false,
    <QuoteTableDemo />
  ),
  createEntry(
    "Substrata",
    "https://github.com/dggrunzweig/Bassline",
    "A percussive low-frequency synthesizer. Designed for the ritualistic and hypnotic.",
    false,
    <>
      <iframe
        className="substrata-desktop"
        src="https://substrata-synth.netlify.app/"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
      <div className="substrata-mobile">
        <img src="./substrata/Substrata.png" />
        <div className="body">Not Available on Mobile</div>
      </div>
    </>
  ),
  createEntry(
    "About",
    "https://github.com/dggrunzweig",
    "Design portfolio of David Grunzweig - software engineer, generative artist, electronic musician.",
    false,
    <About />
  ),
];
