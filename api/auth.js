const { authorizationUri } = require("../config");

// Initial page redirecting to Github
module.exports = (req, res) => {
  res.writeHead(302, { Location: authorizationUri });
  res.end();
};
