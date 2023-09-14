const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
require('dotenv').config();
puppeteer.use(StealthPlugin());

(async () => {
   const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
      headless: false,
      args:[
         '--no-sandbox',
         '--disable-gpu',
         '--enable-webgl',
      ]
   }); 

   const loginUrl = "https://mail.google.com";
   const page = await browser.newPage();


   await page.goto(loginUrl, { waitUntil: 'networkidle2' });
   await page.type('input[type="email"]', process.env.LOGIN);
   await page.keyboard.press('Enter');
   await page.waitForTimeout(2000);
   await page.type('input[type="password"]', process.env.PASSWORD);
   await page.keyboard.press('Enter');
   await page.waitForNavigation(["networkidle0", "load", "domcontentloaded"]);
   const elementsWithDataTooltip = await page.$$eval('[href]', (elements) => {
    for(element of elements){
        if(element.getAttribute('href') == "https://mail.google.com/mail/u/0/#inbox"){
            return element.getAttribute('aria-label');
        }  
    }
  });
  console.log(elementsWithDataTooltip)
  await browser.close();
})();