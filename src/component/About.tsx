import "./About.css";

const About = () => {
  return (
    <div className="about-div">
      <img src="images/profile/profile.avif" className="profile-photo" />
      <div className="body about-body">
        <div className="header2">Hello!</div>
        <br />
        Interested in seeing how my design style and engineering skillset could
        help elevate your company's user experience? Please reach out at:
        david@greentwig.xyz
        <br />
        <br />
        Sincerely,
        <br />
        David Grunzweig
        <br />
        <br />
        <div className="header2">Work</div>
        <br />
        Artist and Creative Technologist - Night Sea Studio (2023-2024)
        <br />
        Senior Hardware Engineer and Technical Lead - Google (2021-2023)
        <br />
        Senior DSP Engineer - Dysonics (2015-2021)
        <br />
        <br />
        <div className="header2">Education</div>
        <br />
        Master's Degree in Music, Science, and Technology - Stanford University
        <br />
        Bachelor's Degree in Electrical Engineering - Stanford University
        <br />
        <br />
        <div
          className="small-button"
          style={{ color: "var(--blue-4)" }}
          onClick={() => {
            window.open("resume/Grunzweig Resume 2024.pdf", "_blank");
          }}
        >
          Full Resume
        </div>
      </div>
    </div>
  );
};

export default About;
