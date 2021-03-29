const { log } = require("debug");
var express = require("express");
var router = express.Router();
// const got = require("got");
const scrapper = require("../scraper.js");

/* GET home page. */
router.get("/I/want/title", scrapper.scrap);
module.exports = router;
