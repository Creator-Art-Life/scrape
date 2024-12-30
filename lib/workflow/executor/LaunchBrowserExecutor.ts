import { Enviroment, ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { exec } from "child_process";
import { waitFor } from "@/lib/helper/waitFor";

// const BROWSER_WS =
//   "wss://brd-customer-hl_5c2599de-zone-scrape_flow_browser:db4jr2tyzkt6@brd.superproxy.io:9222";

// const chromeExecutable = "google-chrome";

// const openDevtools = async (page: any, client: any) => {
//   // get current frameId
//   const frameId = page.mainFrame()._id;
//   // get URL for devtools from scraping browser
//   const { url: inspectUrl } = await client.send("Page.inspect", { frameId });
//   // open devtools URL in local chrome
//   exec(`"${chromeExecutable}" "${inspectUrl}"`, (error) => {
//     if (error) throw new Error("Unable to open devtools: " + error);
//   });
//   // wait for devtools ui to load
//   await waitFor(5000);
// };

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    const browser = await puppeteer.launch({
      headless: true, // for testing
    });
    environment.log.info("Browser started successfully");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
