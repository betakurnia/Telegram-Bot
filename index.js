const { Telegraf } = require("telegraf");
const feedParser = require("ortoo-feedparser");
const cron = require("node-cron");

const url = "https://www.livechart.me/feeds/episodes";

const bot = new Telegraf();

const articles = [];

feedParser.parseUrl(url).on("article", (article) => {
  articles.push(article);
});

bot.start((ctx) => {
  cron.schedule("5 * * * * *", () => {
    articles.forEach((article) => {
      if (
        Date.parse(new Date()) - 60000 < Date.parse(article.pubDate) &&
        Date.parse(new Date()) > Date.parse(article.pubDate)
      ) {
        ctx.reply(article.title);
      }
    });
  });
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
