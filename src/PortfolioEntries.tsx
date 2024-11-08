import { ReactElement } from "react";

import About from "./component/About";
import AudioPlayer from "./component/AudioPlayer";
import { PortfolioEntry } from "./component/PortfolioItem";
import ProductCardDemo from "./component/ProductCardDemo";
import TaskTableDemo from "./component/TaskTable/TaskTableDemo";
import VirtualDesktop from "./component/VirtualDesktop";
import { vd_files } from "./component/VirtualDesktopFileList";

const createEntry = (
  name: string,
  source_link: string,
  description: string,
  more_info: boolean,
  element?: ReactElement,
  problem_text?: string,
  problem_image_url?: string,
  exploration_text?: string,
  exploration_image_url?: string,
  challenges_text?: string,
  challenges_image_url?: string,
  outcome_text?: string,
  outcome_image_url?: string
): PortfolioEntry => {
  return {
    name: name,
    source_link: source_link,
    description: description,
    more_info: more_info,
    element: element,
    problem_text: problem_text,
    problem_image_url: problem_image_url,
    exploration_text: exploration_text,
    exploration_image_url: exploration_image_url,
    challenges_text: challenges_text,
    challenges_image_url: challenges_image_url,
    outcome_text: outcome_text,
    outcome_image_url: outcome_image_url,
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
    "I enjoy reading articles by musicians who write about their process on platforms like Substack and Medium. Neither platform was designed with the idea that some writers would need to showcase sounds as an essential part of their writing. As a result, the audio experience on these types of sites often lacks polish and intention. In general, audio file player widgets tend to direct us towards a passive relationship with listening that is emblematic of the era of digital convenience.",
    "./images/AudioPlayer/Widget Comparison.png",
    "As a source of inspiration I turned to my personal history of cherished audio devices, my first silver and white iPod. I wanted to capture the charm of this device through things like bit fonts, text-based icons, and limited colors. To create a more visually engaging experience, I sought to pair this with an animation that was reminiscent of the spectrograms on early digital audio equipment but imbued with a softness afforded by modern, high-resolution, screens. It also felt important that the audio experience should allow some interactivity, letting listeners hear the audio in ways that the original creator may not have expected.",
    "./images/AudioPlayer/ipod-classic.png",
    "The primary technical limitation I placed on the project was that it should use only React, Web Audio, CSS, and Canvas animations. This would ensure the project had no dependencies on external libraries and that animation would be supported without needing WebGL. While simpler approaches exist for streaming audio, I wanted to create an audio player with the sonic characteristics of older analog mediums like vinyl records or cassettes. This experience juxtaposed against the digital nature of the widget gives it a unique personality.  This required loading the audio stream into a WebAudio buffer player which allows the user to manipulate things like playback speed and direction.",
    "./images/AudioPlayer/challenges.png",
    "The final product is a standalone widget that can be easily reused throughout a site. As an input, the developer provides a file URL and track title string (in this example “Ron Trent - Morning Factory”). The use of animations and the ability to explore various sonic manipulations through the interface give the player more character and interactivity, inviting listeners to play rather than passively consume.",
    "./images/AudioPlayer/Outcome.png"
  ),
  createEntry(
    "Virtual Desktop",
    "https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/VirtualDesktop.tsx",
    "A virtual desktop for browsing through photos or products.",
    true,
    <VirtualDesktop files={vd_files} />,
    "All e-commerce companies need a way to showcase their products - I sought to create an interactive experience that lets users actively explore products in a way that was both familiar and novel.",
    "./images/helmut_lang/vd_problem.png",
    "I was inspired after reading about Helmet Lang's 1998 runway show 'Seance De Travail' which was the first digital only runway show. It was released as a website and a CD-ROM containing photos and videos of the show. I thought about what it would be like to receive that CD in 1998 and pop it into my computer to view the various shots and clothing pieces. The idea of re-creating the desktop experience of an old computer and browsing files felt like a great (although indirect) UI experience. I took inspiration from the UI of the iMac G3 (Mac OS9) released the same year.",
    "./images/helmut_lang/hl-cd-rom.webp",
    "The project presented a few unique challenges. I wanted users to be able to interact with window panes in a similar fashion to a normal desktop, so it was critical that they could be dragged, re-ordered, maximized and closed. This required using state in React in clever ways to ensure that the z-indexes of each open pane could be modified based on the user's interactions. Allowing the user to drag also presented a challenge - it required calculating the x and y pixel offset of the panes in relation to the desktop but the coordinate system of the mouse is connected to the viewport position. The project was built using only React and Vanilla CSS.",
    "./images/helmut_lang/mac os 9.png",
    "The result is a responsive React component that takes a list of image URLs and item descriptions as an input and generates the layout and panes automatically. While this format is not ideal for a site with a large number of products to showcase, it could be the perfect playful alternative for showing off pieces from a new limited product line. Images and text taken from Endyma Archive's site featuring pieces from this era of Helmut Lang.",
    "./images/helmut_lang/hl-online-show.webp"
  ),
  createEntry(
    "Product Card",
    "https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/ProductCard.tsx",
    "An interactive product card ideal for technical leaning product design.",
    true,
    <ProductCardDemo />,
    "Showcasing a product requires a combination of text, media, and interactions to fulfill all the feature requirements and convey the full story behind the item. However, shoppers typically want a way to view multiple products in the same category quickly and don’t want to be presented with all the information about a product up front. If a single image is selected to represent the product that doesn’t connect with the viewer, they likely won’t look into it further. A low effort mechanism is needed to allow a customer to quickly get a better idea of the product.",
    "/images/ProductCard/problem.png",
    "I wanted the images to seamlessly change as the users moved their mouse across the page, revealing different views of each product without the user needing to click into the image. I wanted to explore a minimalistic and technical style for this project, inspired by tech wear clothing makers like Arc’Teryx, ACW, and ACRONYM. The interface utilizes a flat layout and is styled with colors influenced by high-vis clothing and concrete structures, and ideally suited for products like Tech Wear, Mechanical Keyboards, or Everyday Carry.",
    "/images/ProductCard/exploration.png",
    "The primary challenges for this project was finding a way to recreate a similar experience on mobile devices. Without a mouse position to track, the basic mechanism of the project no longer works. I opted instead to use swiping on mobile devices, allowing a user to quickly swipe through all the photos on a product without needing to go to the main product page.",
    "/images/ProductCard/challenges.png",
    "The final product is a standalone react component that can be reused as many times as necessary. The component accepts a name, product ID, price, description, a list of image urls, and a function for the buy button as inputs. The project was built using vanilla react and CSS without additional libraries or packages.",
    "/images/ProductCard/outcome.png"
  ),
  createEntry(
    "Task Tracker",
    "https://github.com/dggrunzweig/PortfolioSite/blob/main/src/component/TaskTable/TaskTable.tsx",
    "A tracker for to-do lists with automatic re-ordering. Tasks can be added, removed, and edited.",
    true,
    <TaskTableDemo />,
    "I typically keep track of to-do list items in my notes app or Notion, but this is a limited interface for keeping track of tasks with different owners and timelines. While I am familiar with more complex systems for tracking tasks like Jira, I wanted something that felt like it landed between these two options.",
    "/images/TaskTable/problem.png",
    "I wanted a way to quickly see and scan through all my tasks as a starting point, storing them as rows in a table with a reduced amount of information immediately visible. I knew that it would be helpful to have longer descriptions available as well, which shouldn’t require navigating to a new view to see. The table should also allow me to add, remove, or edit existing tasks as well as re-order my tasks based on their priority and which were still open.",
    "/images/TaskTable/exploration.png",
    "The primary challenge related to this project stemmed from automatically reorder tasks based on a variety of categories. I created a typescript interface to define tasks and wrote a custom sorting function which operated on the array of tasks stored by the table. Each time a user interacts with a task, changing its priority or status, the table should automatically update the ordering.",
    "/images/TaskTable/challenges.png",
    "The task tracker provides a helpful productivity tool that doesn’t have the weight and complexity of typical engineering management tools, but goes beyond the simplicity of tracking things in my notes app or Notion. The tracker works seamlessly in both mobile and desktop modes. The project was built entirely with vanilla React and CSS, the only external package used is for the Date Picker in the add pane.",
    "/images/TaskTable/outcome.png"
  ),
  createEntry(
    "Substrata",
    "https://github.com/dggrunzweig/Bassline",
    "A percussive low-frequency synthesizer. Designed for the ritualistic and hypnotic.",
    true,
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
        <div className="body" style={{ maxWidth: "100%" }}>
          Not Available on Mobile
        </div>
      </div>
    </>,
    "When writing kick drum and bassline patterns in my musical project, Night Sea, I consistently reuse the same process for sound design and sequencing. I wondered if I could leverage my knowledge of web audio and web midi to create the ideal synthesizer and sequencer for this purpose. I sought to build a free, web-based instrument. It should provide a way for total beginners to learn and play around, while also having features and a sound quality that would appeal to more experienced gear heads.",
    "./images/substrata/substrata_problem.png",
    "My initial approach was inspired by existing drum synthesizers like the Moog DFAM or the Elektron Machinedrum. However, I wanted to bring the design fully into the digital realm by creating a UI that leveraged the power of a mouse and keyboard rather than trying to emulate a physical device. This resulted in the design of the 2D Button, the central part of the sequencer which allows a user to turn on or off a step and set specific synthesizer settings per each step with the draggable dots.",
    "./images/substrata/substrata_inspiration.png",
    "After designing the audio system initially with web audio, I found frustrating timbre differences between browsers that felt “unprofessional” in quality. I decided to pursue using WASM for the audio engine instead, writing all of the sequencing and synthesis code in C and then compiling it with Emscripten into a web audio worklet. In addition, I wanted Substrata to be able to integrate into my larger hardware synth setup, so it needed to be able to synchronize with other instruments using a centralized MIDI clock. I designed Substrata to accept a midi clock signal from a selectable source and use that to synchronize the step sequencer onboard.",
    "./images/substrata/substrata_challenges.png",
    "Substrata is still a work in progress, with a few more features planned including presets and LFOs. The current version achieves perfect cross browser compatibility as well as native WAV file audio encoding thanks to the C and WASM backend. The audio code is fully tested in C using GoogleTest. The synthesizer has become a favorite tool for me and my collaborator in our studio projects, creating hypnotic and driving bassline and kick patterns for our techno releases.",
    "./images/substrata/substrata_outcomes.png"
  ),
  createEntry(
    "About",
    "https://github.com/dggrunzweig",
    "Design portfolio of David Grunzweig - software engineer, generative artist, electronic musician.",
    false,
    <About />
  ),
];
