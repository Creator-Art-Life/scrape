"use client";
import { UpdateWorkflowCron } from "@/actions/workflows/updateWorkflowCron";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  CalendarIcon,
  ClockIcon,
  CoinsIcon,
  TriangleAlertIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import parser from "cron-parser";
import TooltipWrapper from "@/components/TooltipWrapper";
import { RemoveWorkflowSchedule } from "@/actions/workflows/removeWorkflowSchedule";
import { Separator } from "@/components/ui/separator";

export default function SchedulerDialog(props: {
  workflowId: string;
  cron: string | null;
}) {
  const [cron, setCron] = useState(props.cron || "");
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");

  const mutation = useMutation({
    mutationFn: UpdateWorkflowCron,
    onSuccess: () => {
      toast.success("Schedule updated succcessfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cron" });
    },
  });

  const RemoveScheduleMutation = useMutation({
    mutationFn: RemoveWorkflowSchedule,
    onSuccess: () => {
      toast.success("Schedule removed succcessfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cron" });
    },
  });

  useEffect(() => {
    try {
      parser.parseExpression(cron);
      const humanCronStr = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanCronStr);
    } catch (error) {
      setValidCron(false);
    }
  }, [cron]);

  const workflowHasValidCron = props.cron && props.cron.length > 0;
  const readableSavedCron =
    workflowHasValidCron && cronstrue.toString(props.cron!);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className={cn(
            "text-sm p-0 h-auto text-orange-500",
            workflowHasValidCron && "text-primary"
          )}
          size={"sm"}
        >
          {workflowHasValidCron && (
            <div className="flex items-center gap-2 cursor-pointer">
              <ClockIcon />
              {readableSavedCron}
            </div>
          )}
          {!workflowHasValidCron && (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="h-3 w-3" />
              Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
        />
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm">
            Specify a cron expression to schedule periodic workflow execution.
            All times are in UTC
          </p>
          <Input
            placeholder="E.g. * * * * *"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
          />
          <div
            className={cn(
              "bg-accent rounded-md p-4 border text-sm",
              validCron && "border-primary text-primary"
            )}
          >
            {validCron ? readableCron : "Not a valid cron a expression"}
          </div>
          {workflowHasValidCron && (
            <DialogClose asChild>
              <div className="">
                <Button
                  className="w-full text-destructive border-destructive hover:text-destructive"
                  variant={"outline"}
                  disabled={
                    mutation.isPending || RemoveScheduleMutation.isPending
                  }
                  onClick={() => {
                    toast.loading("Removing schedule...", { id: "cron" });
                    RemoveScheduleMutation.mutate(props.workflowId);
                  }}
                >
                  Remove current shedule
                </Button>
                <Separator className="my-4" />
              </div>
            </DialogClose>
          )}
        </div>
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button className="w-full" variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              disabled={mutation.isPending || !validCron}
              onClick={() => {
                toast.loading("Saving...", { id: "cron" });
                mutation.mutate({
                  id: props.workflowId,
                  cron,
                });
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}