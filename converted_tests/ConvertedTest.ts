import { chromium, expect } from "@playwright/test";

let browser = await chromium.launch();
let page = await browser.newPage();

await page.goto("https://www.google.com");

// Find search box and type text
let searchBox = await page.$("#searchBox");
await searchBox.fill("Selenium Java");

// Submit search
await searchBox.click();

// Print title after search
console.log(`Title After Search: ${page.title()}`);

await browser.close();