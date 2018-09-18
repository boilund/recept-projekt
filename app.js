// Require the express module
const express = require("express");
const flexjson = require('jsonflex')();
// Crete a new web server
const app = express();
app.use(flexjson);
// Tell the web server to serve files
// from the www folder
app.use(express.static("www"));


// Serve the index.html page on every request that
// doesn't have a file extension in its url
// (so that single page apps work on page reload)
app.get(/^[^\.]*$/, (req, res) => {
    res.sendFile(__dirname + '/www/index.html');
  });

  // Start the web server on port on 3000
app.listen(3000, () => console.log("Listening on port 3000"));
