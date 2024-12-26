"use server";

import prisma from "@/lib/prisma";
import {
  duplicateWorkflowSchema,
  duplicateWorkflowSchemaType,
} from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DuplicateWorkflow(form: duplicateWorkflowSchemaType) {
  const { success, data } = duplicateWorkflowSchema.safeParse(form);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const sourseWorkflow = await prisma.workflow.findUnique({
    where: { id: data?.workflowId, userId },
  });

  if (!sourseWorkflow) throw new Error("workflow not found");

  const result = await prisma.workflow.create({
    data: {
      userId,
      name: data?.name ?? "",
      description: data?.description,
      status: WorkflowStatus.DRAFT,
      definition: sourseWorkflow.definition,
    },
  });

  if (!result) {
    throw new Error("failed to duplicate workflow");
  }

  revalidatePath("/workflows");
}
