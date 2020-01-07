const { loginAuthTarget, oauthProvider } = require("../config");

module.exports = (req, res) => {
  res.status(200).send(`
    <a href="/auth" target="${loginAuthTarget}">
      Log in with ${oauthProvider.toUpperCase()}
    </a>`);
};
