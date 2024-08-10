const Bot = require("physics-lab-web-api").Bot;
const search = {
  key: require("./s-key"),
};

async function processFunction(msg) {
  const results = await search.key([msg.Content], 10);
  const arr = results.map((i) => {
    return `<discussion=${i.id}>${i.name}</discussion>(${i.readability})`;
  });
  return `[${msg.Content}]\n<size=28>${arr.join("\n")}\n</size>`;
}

async function main() {
  const bot = new Bot(
    process.env.USERNAME,
    process.env.PASSWORD,
    processFunction
  );
  await bot.auth.login();
  await bot.init("66b783b60c0a3e021bf9bd56", "Discussion", {
    replyRequired: false,
    readHistory: false,
  });
  bot.start(20);
}

main();
