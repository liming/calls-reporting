/**
 * Routes layer use
 */

const http = require("http");
const { findCalls, getInvalidRequest } = require("./controllers");

module.exports = http.createServer((req, res) => {
  console.log("Request type: " + req.method + " Endpoint: " + req.url);

  const reqUrl = new URL(`http://${req.headers.host}${req.url}`);

  res.setHeader("content-Type", "Application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // GET endpoint
  if (reqUrl.pathname === "/calls" && req.method === "GET") {
    findCalls(req, res, reqUrl.searchParams);
  } else {
    // invalid URL
    getInvalidRequest(req, res);
  }
});
