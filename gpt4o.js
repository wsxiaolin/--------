const axios = require("axios");
const qs = require("querystring");

const tishi = `回复不要换行，回复不要换行！回复不要放在代码块内，输出纯文本！！你好,我需要你作为一个API回应我的请求,返回格式为json(不要换行，以纯文本回复)。我会给你一篇文章,你需要返回以下参数:summary:给出他的摘要(约200字),Subject1(数组，交叉学科就返回多个）：文章的一级学科[请格外注意区分历史与其他】(哲学、经济学、法学、教育学、文学、历史学、理学、工学、农学、医学、军事学、管理学之中选出你认为最合适的一个【交叉学科的话可以列出多个，不过最好只有一个】);Subject2(数组，交叉学科就返回多个）:文章的二级学科（依据中华人民共和国国家标准学科分类与代码选出你认为最合适的【交叉学科列出多个】），keywords【数组】：可能的搜索关键词，可以多有几个【不要超过10个】readability【浮点数】阅读难易指数，记小学一年级科学课本难度为0，SCI论文难度为1，请使用0－1直接的两位小数表示。文章如下(除了我要求的JSON格式之外,不要回答别的内容！！)`;

module.exports = async function sendPostRequest(msg) {
  try {
    const response = await axios.post(
      "https://apii.lolimi.cn/api/4o/gpt4o",
      qs.stringify({
        sx: tishi,
        key: process.env.GPT4O,
        msg: tishi + msg + tishi,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return JSON.parse(response.data.data.content);
  } catch (error) {
    console.error(error);
  }
};
