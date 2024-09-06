import { ChangeEvent, useState } from "react";
import celsiusFahrenheitFlow from "./assets/celsius-fahrenheit.json";
import { useFlowEngine } from "./hooks/use-flow-engine";

import "./App.css";

function App() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const { sendMessageToNode } = useFlowEngine(
    celsiusFahrenheitFlow,
    (key, value) => {
      if (key === "celsius") {
        setCelsius(value);
      }
      if (key === "fahrenheit") {
        setFahrenheit(value);
      }
    }
  );

  return (
    <>
      <p>Celsius to Fahrenheit using codeflowcanvas</p>
      <div className="w-[clamp(240px,100%,1024px)] mx-auto">
        <div className="flex flex-col">
          <label>Celcius</label>
          <input
            className="border border-solid border-black "
            name="celsius"
            value={celsius}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setCelsius(event.target.value);
              const input = event.target as HTMLInputElement;
              console.log("celsius input", input.value);
              sendMessageToNode("celsius", input.value);
            }}
          />
          <label>Fahrenheit</label>
          <input
            className="border border-solid border-black"
            name="fahrenheit"
            value={fahrenheit}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFahrenheit(event.target.value);
              const input = event.target as HTMLInputElement;
              console.log("fahrenheit input", input.value);
              sendMessageToNode("fahrenheit", input.value);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
