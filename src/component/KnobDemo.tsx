import Knob from "./Knob";
import "./KnobDemo.css";
const KnobDemo = () => {
  const knobOnChange = (value: number) => {
    console.log("Knob Value: " + value);
  };
  return (
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
  );
};

export default KnobDemo;
