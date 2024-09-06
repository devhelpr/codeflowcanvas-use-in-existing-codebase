import "./App.css";
import { FlowNode } from "@devhelpr/visual-programming-system";
import { NodeInfo } from "@devhelpr/web-flow-executor";
import celsiusFahrenheitFlow from "./assets/celsius-fahrenheit.json";
import { FlowEngine } from "./flow-engine/flow-engine";
import { ChangeEvent, useEffect, useRef, useState } from "react";

function App() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const flowEngine = useRef<FlowEngine>(new FlowEngine());
  useEffect(() => {
    flowEngine.current.initialize(
      celsiusFahrenheitFlow.flows.flow.nodes as FlowNode<NodeInfo>[]
    );
    flowEngine.current.run();
    flowEngine.current.canvasApp.setOnNodeMessage((key, value) => {
      if (key === "celsius") {
        setCelsius(value);
      }
      if (key === "fahrenheit") {
        setFahrenheit(value);
      }
    });
    return () => {
      flowEngine.current.destroy();
    };
  }, []);
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
              flowEngine.current.canvasApp.sendMessageToNode(
                "celsius",
                input.value
              );
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
              flowEngine.current.canvasApp.sendMessageToNode(
                "fahrenheit",
                input.value
              );
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
