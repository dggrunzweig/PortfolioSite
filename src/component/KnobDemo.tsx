import Knob from "./Knob";
const KnobDemo = () => {
  const style = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "1em",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: "2em 2em 2em 2em",
    boxSizing: "border-box",
  };

  const knobOnChange = (value: number) => {
    console.log("Knob Value: " + value);
  };
  return (
    <div className="knob-div" style={style}>
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
  );
};

export default KnobDemo;
