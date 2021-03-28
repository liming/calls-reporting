/**
 * Controller layer is the layer transfer HTTP context to data request
 */

const services = require("./services");

const findCalls = (req, res, params) => {
  console.log("[debug] parse the search string and query the results");

  console.log(params.get("start"));

  const start = parseInt(params.get("start")) || 0;
  const limit = parseInt(params.get("limit")) || 10;
  const onlyException = params.get("exception") === "true";

  services
    .findCalls({ start, limit, onlyException })
    .then((calls) => {
      res.statusCode = 200;
      res.end(JSON.stringify(calls));
    })
    .catch((err) => {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: err.message }));
    });
};

const getInvalidRequest = (req, res) => {
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Invalid endpoint" }));
};

module.exports = { findCalls, getInvalidRequest };
