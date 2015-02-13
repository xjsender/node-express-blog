var express = require("express");
var app = express();

var hbs = require("hbs");

var blogEngine = require("./lib/blog")

app.set("view engine", "html");
app.engine("html", hbs.__express);
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("index", {
        title: "My Blog",
        entries: blogEngine.getBlogEntries()
    });
});

app.get("/about", function(req, res) {
    res.render("about", {
        title: "About Me"
    });
});

app.get("/article/:id", function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render("article", {
        title: entry.title, 
        blog: entry
    });
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})