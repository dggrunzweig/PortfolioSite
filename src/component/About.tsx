import "./About.css";

const About = () => {
  return (
    <div className="about-div">
      <img src="images/profile/profile.jpeg" className="profile-photo" />
      <div className="about-section">
        <div className="header2">Hello!</div>
        <div className="body about-body">
          Actively seeking a role in design engineering or front-end design.
          Interested in seeing how my design style and engineering skillset
          could help elevate your company's user experience? Please reach out
          at: david@greentwig.xyz
          <br />
          <br />
          Sincerely,
          <br />
          David Grunzweig
          <br />
          <br />
          <div
            className="link"
            onClick={() => {
              window.open("resume/Grunzweig Resume 2024.pdf", "_blank");
            }}
          >
            Full Resume
          </div>
        </div>
        <div className="header2">Work</div>
        <div className="body about-body">
          Artist and Creative Technologist - Night Sea Studio (2023-2024)
          <br />
          Senior Hardware Engineer and Technical Lead - Google (2021-2023)
          <br />
          Senior DSP Engineer - Dysonics (2015-2021)
        </div>
        <div className="body about-body">
          <div className="header2">Education</div>
          Master's Degree in Music, Science, and Technology - Stanford
          University
          <br />
          Bachelor's Degree in Electrical Engineering - Stanford University
        </div>
      </div>
      <div className="about-section">
        <div className="header2">Selected Artworks</div>
        <div className="body about-body">
          <a href="https://verse.works/series/lo-by-night-sea" className="link">
            l.o
          </a>
          <br />
          An algorithmic audiovisual artwork. Released with ArtBlocks in 2023 as
          a longform series of 200. Built with web audio, three.js and glsl.
          Created in collaboration with Johan Ismael.
          <br />
          <br />
          <a
            href="https://www.fxhash.xyz/generative/0xf4D3dD492Bc90e515EBEa96b660c97C499704BB7"
            className="link"
          >
            ratio
          </a>
          <br />
          An algorithmic audiovisual artwork. Released in 2023 as part of the
          FxHash 2.0 launch in collaboration with TenderArt NYC. Longform series
          of 50. Built with web audio, three.js and glsl. Created in
          collaboration with Johan Ismael.
          <br />
          <br />
          <a
            href="https://silentseason.bandcamp.com/album/still"
            className="link"
          >
            still
          </a>
          <br />
          An album exploring the intersection of ambient music, distant memories
          of dancefloors, and reverence for the ever-changing beauty of the
          world. Released in 2020 on Silent Season. Created in collaboration
          with Johan Ismael.
          <br />
          <br />
          <a
            href="https://tapeghost.bandcamp.com/album/mobius"
            className="link"
          >
            mobius
          </a>
          <br />
          An album of experimental techno, released in 2018 on Arushi Jain's
          Ghunghru imprint.
        </div>
      </div>
    </div>
  );
};

export default About;
