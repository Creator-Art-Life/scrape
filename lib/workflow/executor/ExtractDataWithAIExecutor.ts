import { ExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "../task/ClickElement";
import { ExtractDataWithAITask } from "../task/ExtractDataWithAI";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import OpenAi from "openai";

export async function ExtractDataWithAIExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAITask>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("input=>credentials not defined");
    }

    const promt = environment.getInput("Promt");
    if (!promt) {
      environment.log.error("input=>promt not defined");
    }

    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("input=>content not defined");
    }

    //Get credentials from db

    const credential = await prisma.credential.findUnique({
      where: { id: credentials },
    });

    if (!credential) {
      environment.log.error("credential not found");
      return false;
    }

    const plainCredentialsValue = symmetricDecrypt(credential.value);

    if (!plainCredentialsValue) {
      environment.log.error("cannot decrypt credentials");
      return false;
    }

    const mockExtractedData = {
      usernameSelector: "#username",
      passwordSelector: "#password",
      loginSelector: "body > div > form > input.btn.btn-primary",
    };

    const openai = new OpenAi({
      apiKey: plainCredentialsValue,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text",
        },
        {
          role: "user",
          content: content,
        },
        { role: "user", content: promt },
      ],
      temperature: 1,
    });

    environment.log.info(`Promt tokens: ${response.usage?.prompt_tokens}`);
    environment.log.info(
      `Complition tokens: ${response.usage?.completion_tokens}`
    );

    const result = response.choices[0].message.content;
    if (!result) {
      environment.log.error("empty response from AI");
      return false;
    }

    environment.setOutput("Extracted data", result);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
