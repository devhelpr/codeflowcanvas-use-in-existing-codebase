import { Flow, FlowNode } from "@devhelpr/visual-programming-system";
import { NodeInfo } from "@devhelpr/web-flow-executor";
import { useRef, useEffect } from "react";
import { FlowEngine } from "../flow-engine/flow-engine";

export const useFlowEngine = (
  flow: Flow<NodeInfo>,
  onNodeMessage: (keyName: string, value: any) => void
) => {
  const flowEngine = useRef<FlowEngine>(new FlowEngine());
  useEffect(() => {
    if (flow?.flows?.flow?.nodes) {
      flowEngine.current.initialize(
        flow.flows.flow.nodes as FlowNode<NodeInfo>[]
      );
      flowEngine.current.run();
      flowEngine.current.canvasApp.setOnNodeMessage(onNodeMessage);
    }
    return () => {
      flowEngine.current.destroy();
    };
  }, [flow, onNodeMessage]);

  return {
    flowEngine: flowEngine.current,
    sendMessageToNode: (key: string, value: string) => {
      flowEngine.current.canvasApp.sendMessageToNode(key, value);
    },
  };
};
