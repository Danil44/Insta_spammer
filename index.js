const puppeteer = require("puppeteer");
const UserRequest = require("./UserRequest");
const Chat = require("./Chat");
const logSymbols = require("log-symbols");

(async () => {
  const userRequest = new UserRequest();
  const username = await userRequest.getUserName();
  const password = await userRequest.getPassword();
  const message = await userRequest.getMessage();
  const messagesCount = await userRequest.getCountOfMessages();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on("console", msg => {
    for (let i = 0; i < msg._args.length; ++i)
      console.log(`${msg._text}`);
  });

  //Log in
  const emailInput = '[name="username"]';
  await page.goto("https://www.instagram.com/", { waitUntil: "networkidle2" });

  await page.waitForSelector(emailInput);
  await page.type(emailInput, username);

  await page.keyboard.down("Tab");
  await page.keyboard.type(password);

  try {
    console.log("::Logging in...");

    await page.evaluate(() => {
      let btns = [
        ...document.querySelector(".HmktE").querySelectorAll("button")
      ];
      btns.forEach(function(btn) {
        if (btn.innerText == "Log In") btn.click();
      });
    });
    const error = document.querySelector('.pbNvD');

    if(error) throw Error
  } catch (error) {
    await page.screenshot({ path: "login_error.png" });
    console.log(logSymbols.error, "Failed to log in");
    await browser.close()
  }

  await page.waitForNavigation();

  console.log(logSymbols.success, "Logged in");
  ///////////////////////////////////////////////////

  //Spam 
  await page.goto("https://www.instagram.com/direct/inbox/", {
    waitUntil: "networkidle2"
  });

  const chat = new Chat({
    page,
    conversationId: userRequest.getConversationId()
  });

  try {
    await chat.openConversation();
    console.log("::Spamming...");
    for (let i = 0; i < messagesCount; i++) {
      await page.type("textarea", message);
      await page.keyboard.down("Tab");
      await page.keyboard.down("Enter");
    }
  console.log(logSymbols.success, "Done");
  } catch (error) {
    console.log(logSymbols.error, error);
  }
  //////////////////////////////////////////////////////
  await browser.close();
})();
