var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var compression = require("compression");
var fs = require("fs");
var https = require("https");
var http = require('http');
var helmet = require("helmet");
var app = express();

app.use(morgan("common"));
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(compression());

app.get("/", function(req, res) {
    res.json({status: "My API is alive!"});
});

if (process.env.NODE_ENV === 'production') {
    var credentials = {
        key: fs.readFileSync("my-api.key", "utf8"),
        cert: fs.readFileSync("my-api.cert", "utf8")
    };

    https
      .createServer(credentials, app)
      .listen(3000, function() {
      console.log("My API is running...");
    });
} else {
    http
      .createServer(app)
      .listen(3000, function() {
      console.log("My API is running...");
    });
}

module.exports = app;
