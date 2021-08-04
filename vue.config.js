// change "/crud/" to your subdomain path
// if you dont use subdomain, just change "/crud/" to "/"

module.exports = {
  // with subdomain
  publicPath: process.env.NODE_ENV === "production" ? "/crud/" : "/",

  // without subdomain (example)
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
};
