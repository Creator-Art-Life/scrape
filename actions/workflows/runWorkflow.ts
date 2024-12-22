"use server";

import prisma from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefenition?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const { workflowId, flowDefenition } = form;
  if (!workflowId) {
    throw new Error("workflow is required");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });
  if (!workflow) {
    throw new Error("workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;
  if (!flowDefenition) {
    throw new Error("flow defenition is not defined");
  }

  const flow = JSON.parse(flowDefenition);
  const result = FlowExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("flow defenition not valid");
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }

  executionPlan = result.executionPlan;

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      definition: flowDefenition,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("workflow execution not created");
  }

  ExecuteWorkflow(execution.id); // run this on backgound

  // redirect(`/workflows/runs/${workflowId}/${execution.id}`);

  return { execution, workflowId };
}
