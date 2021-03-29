const fetch = require("node-fetch");
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const isAbsoluteUrl = require("is-absolute-url");
const titles = [];

exports.scrap = async function (req, res) {
  getTitle(req, res, renderResponse);
};

getTitle = async (req, res, callback) => {
  const addressArray = req.query.address;
  for (let address of addressArray) {
    if (!isAbsoluteUrl(address)) {
      address = "https://" + address;
    }
    try {
      let response = await got(address);
      let dom = new JSDOM(response.body);
      let title = dom.window.document.querySelector("title").textContent;
      titles.push(title);
      console.log(title);
    } catch (error) {
      return res.end("Error while fetching Title || URL is invalid");
    }
  }
  callback(res);
};

renderResponse = (res) => {
  console.log(titles);
  res.render("titles", { titles });
};
