"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function RunBtn({ workflowId }: { workflowId: string }) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (data) => {
      router.replace(`/workflow/runs/${workflowId}/${data.execution.id}`);
      toast.success("Workflow started", { id: workflowId });
    },
    onError: () => {
      toast.success("Something went wrong", { id: workflowId });
    },
  });
  return (
    <Button
      variant={"outline"}
      size="sm"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Sheduling run...", { id: workflowId });
        mutation.mutate({
          workflowId,
        });
      }}
    >
      <PlayIcon size={10} />
      Run
    </Button>
  );
}
