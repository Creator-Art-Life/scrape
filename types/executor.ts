import { Browser } from "puppeteer";
import { WorkflowTask } from "./workflow";

export type Enviroment = {
  browser?: Browser;
  // Phase with phseId as key

  phases: Record<
    string, // key: phaseId
    {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    }
  >;
};

export type ExecutionEnvironment<T extends WorkflowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;

  getBrowser(): Browser | null;
};
