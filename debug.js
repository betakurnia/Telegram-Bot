const { Telegraf } = require("telegraf");
const bot = new Telegraf("YOUR BOT TOKEN");
const url = "https://www.livechart.me/feeds/episodes";
let Parser = require("rss-parser");
let parser = new Parser();
var cron = require("node-cron");
var dateFormat = require("dateformat");

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

bot.start((ctx) => {
  ctx.reply("Anime Updates BOT v1");
  ctx.reply(
    "NOTE : You will get a real-time notification when there is an episode update."
  );
  cron.schedule("* * * * *", () => {
    console.log("INFO! cron-status : active");
    (async () => {
      let feed = await parser.parseURL(url);
      feed.items.forEach((item, i) => {
        if (
          Date.parse(convertTZ(new Date(), "Asia/Jakarta")) - 30000 <
            Date.parse(convertTZ(item.pubDate, "Asia/Jakarta")) &&
          Date.parse(convertTZ(new Date(), "Asia/Jakarta")) + 30000 >
            Date.parse(convertTZ(item.pubDate, "Asia/Jakarta"))
        ) {
          var x =
            "<b>" +
            item.title +
            "</b>\n" +
            dateFormat(
              convertTZ(item.pubDate, "Asia/Jakarta"),
              "HH:MM, d mmmm yyyy"
            ) +
            "\n\nCategories: " +
            item.categories;
          setTimeout(function () {
            console.log("NEW!", item.title, Date.parse(item.pubDate));
            ctx.replyWithHTML("<b>New episode update detected!</b>");
            ctx.replyWithHTML(x);
          }, i * 750);
        }
        console.log(Date.parse(item.pubDate), item.title);
      });
      console.log(
        Date.parse(new Date()) - 30000,
        new Date(),
        Date.parse(new Date()) + 30000
      );
    })();
  });
  cron.schedule("*/15 * * * *", () => {
    ctx.reply("cron-status : active");
  });
});
bot.command("last", (ctx) => {
  ctx.replyWithHTML("<b>Recently aired episodes in the last 24 hours</b>");
  (async () => {
    let feed = await parser.parseURL(url);
    const articles = [];
    articles.push(feed);
    articles.forEach((article) => {
      const x = article.items;
      x.forEach((item, i) => {
        var x =
          "<b>" +
          item.title +
          "</b>\n" +
          dateFormat(
            convertTZ(item.pubDate, "Asia/Jakarta"),
            "HH:MM, d mmmm yyyy"
          ) +
          "\n\nCategories: " +
          item.categories;
        setTimeout(function () {
          ctx.replyWithHTML(x);
        }, i * 750);
      });
    });
  })();
});
bot.hears("ehe", (ctx) => ctx.reply("Ehe Te Nandayo!"));
bot.launch();
