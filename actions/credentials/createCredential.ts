"use server";

import { symmetricEncrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import {
  createCredentialSchema,
  createCredentialSchemaType,
} from "@/schema/credentials";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function CreateCredential(form: createCredentialSchemaType) {
  const { data, success } = createCredentialSchema.safeParse(form);
  if (!success) throw new Error("invalid form data");

  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  const encryptValue = symmetricEncrypt(data.value);

  console.log("@@TEST", {
    plain: data.value,
    encrypted: encryptValue,
  });
  const result = await prisma.credential.create({
    data: {
      userId,
      name: data.name,
      value: encryptValue,
    },
  });

  if (!result) throw new Error("failed to create credential");

  revalidatePath("/credentials");
}
