"use client";

import { PublishWorkflow } from "@/actions/workflows/PublishWorkflow";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function PublishBtn({ workflowId }: { workflowId: string }) {
  const router = useRouter();
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: (data) => {
      toast.success("workflow published", { id: workflowId });
      router.replace(`/workflow/editor/${data.id}`);
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
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
        toast.loading("Publishing workflow...", { id: workflowId });
        mutation.mutate({
          id: workflowId,
          flowDefenition: JSON.stringify(toObject()),
        });
      }}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  );
}
