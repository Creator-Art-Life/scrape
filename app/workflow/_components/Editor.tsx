import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import TopBar from "./topbar/TopBar";
import TaskMenu from "./TaskMenu";
import { FlowValidationContextProvider } from "@/components/context/FlowValidationContext";
import { WorkflowStatus } from "@/types/workflow";
import MobileWarning from "@/hooks/mobile-warning.tsx";
import { AppWindow } from "lucide-react";

function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <MobileWarning text="Back" link={"/workflows"} icon={<AppWindow />}>
      <FlowValidationContextProvider>
        <ReactFlowProvider>
          <div className="flex flex-col h-full w-full overflow-hidden">
            <TopBar
              title="Workflow Editor"
              subtitle={workflow.name}
              workflowId={workflow.id}
              isPublished={workflow.status === WorkflowStatus.PUBLISHED}
            />
            <section className="flex h-full overflow-auto">
              <TaskMenu />
              <FlowEditor workflow={workflow} />
            </section>
          </div>
        </ReactFlowProvider>
      </FlowValidationContextProvider>
    </MobileWarning>
  );
}

export default Editor;
