const express = require("express");
const puppeteer = require("puppeteer");

const dummyQueries = require("./dummyQuery.json");
const referers = require("./referers.json");
const userAgents = require("./userAgents.json");

const app = express();

const rootRouter = express.Router();
rootRouter.get("/infinityCrawling", async (_req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const randomReferers = referers[Math.floor(Math.random() * referers.length)];
    const randomUserAgents = userAgents[Math.floor(Math.random() * userAgents.length)];
    while (true) {
      const page = await browser.newPage();
      await page.setUserAgent(randomUserAgents);
      await page.setExtraHTTPHeaders({ referer: randomReferers });
      for (let i = 0; i < dummyQueries.length; i++) {
        await page.goto(`https://www.rocelec.com/search?q=${dummyQueries[i]}`);
        await page.waitForTimeout(Math.floor(Math.random() * 2000) + 5000);
        await page.waitForSelector(".search-results");
        const partNumbers = await page.evaluate(() => {
          if (!document.querySelector(".search-cell-part-no__part-number")) return [];
          return Array.from(document.querySelectorAll(".search-cell-part-no__part-number")).map((v) => {
            return v.textContent;
          });
        });
        console.log("index :", i, "data :", partNumbers);
        await page.waitForTimeout(Math.floor(Math.random() * 2000) + 150000);
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).send("Error!");
  }
});
rootRouter.get("/crawlByQuery", async (req, res) => {
  try {
    const query = req.query?.q;
    if (typeof query != "string" || typeof query != "number") throw new Error("문자 또는 숫자만 검색 가능합니다");
    const browser = await puppeteer.launch({ headless: true });
    const randomReferers = referers[Math.floor(Math.random() * referers.length)];
    const randomUserAgents = userAgents[Math.floor(Math.random() * userAgents.length)];
    const page = await browser.newPage();
    await page.setUserAgent(randomUserAgents);
    await page.setExtraHTTPHeaders({ referer: randomReferers });
    await page.goto(`https://www.rocelec.com/search?q=${query}`, { waitUntil: "networkidle0" });
    await page.waitForSelector(".search-results");
    const partNumbers = await page.evaluate(() => {
      if (!document.querySelector(".search-cell-part-no__part-number")) return [];
      return Array.from(document.querySelectorAll(".search-cell-part-no__part-number"))
        .map((v) => {
          if (typeof v?.textContent == "string") return v.textContent.trim();
          else return null;
        })
        .filter((v) => v);
    });
    await page.close();
    await browser.close();
    res.status(202).json({ data: partNumbers });
  } catch (err) {
    console.error(err);
    res.json({ data: [] });
  }
});

app.use("/api", rootRouter);
app.use("/", (_req, res) => {
  res.status(202).send("Hello");
});
app.listen("3001", () => {
  console.log("Listen PORT : 3001");
});
