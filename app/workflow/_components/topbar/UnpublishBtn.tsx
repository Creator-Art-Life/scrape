"use client";

import { UnpublishWorkflow } from "@/actions/workflows/UnpublishWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { DownloadIcon, PlayIcon, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function UnpublishBtn({ workflowId }: { workflowId: string }) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: (data) => {
      toast.success("workflow unpublished", { id: workflowId });
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
        toast.loading("Unpublishing workflow...", { id: workflowId });
        mutation.mutate(workflowId);
      }}
    >
      <DownloadIcon size={16} className="stroke-orange-400" />
      Unpublish
    </Button>
  );
}
