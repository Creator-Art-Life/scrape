"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const router = useRouter();
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (data) => {
      toast.success("Execution started", { id: "flow-execution" });
      router.replace(`/workflow/runs/${data.workflowId}/${data.execution.id}`);
    },
    onError: () => {
      toast.error("Something went wrong", { id: "flow-execution" });
    },
  });
  return (
    <Button
      variant={"outline"}
      disabled={mutation.isPending}
      className="felx items-center gap-2"
      onClick={() => {
        const plan = generate();
        if (!plan) {
          // client side validation
          return;
        }
        mutation.mutate({
          workflowId: workflowId,
          flowDefenition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
}

export default ExecuteBtn;
