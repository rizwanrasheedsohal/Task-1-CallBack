const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request = require("request");
var validUrl = require("valid-url");

exports.scrap = function (req, res) {
  let addressArray = req.query.address;

  //if there is a single address in query
  if (!Array.isArray(addressArray)) {
    addressArray = [addressArray];
  }
  getTitles(addressArray, (titles) => {
    //now render HTML after getting all responses
    res.render("titles", { titles });
  });
};

getTitles = (addressArray, callback) => {
  const titles = [];
  let count = 0;

  for (let address of addressArray) {
    if (!validUrl.isUri(address)) {
      address = "https://" + address;
    }
    request(address, function (error, response, body) {
      count++; // Variable used for when to call the callback function for rendering UI
      if (error) {
        //No response from URL
        titles.push(address + " -No Response");
      } else {
        let dom = new JSDOM(body);
        let title = dom.window.document.querySelector("title");
        if (title !== null) {
          titles.push(address + " - " + "'" + title.textContent + "'");
          if (count == addressArray.length) {
            callback(titles);
          }
        }
      }
    });
  }
};
