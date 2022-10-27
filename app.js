const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "My name is Rana Mujtaba. I am from Lahore, Pakistan. I'm majoring in computer science from DePauw University, and I expect to graduate in May 2024. I learned to code 2 years ago. Python was my first love. I love web deveopment, and I am a react fanatic. I am interested in learning AWS, and entegrating their services in my projects. Machien learning is another topic which has piqued my interest. Although I learned to code later on in life, problem solving is a skill I possesed since I was a child.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  body: String
};

const Post = mongoose.model("Posts", postSchema);

// const posts = [];

app.get("/", function(req, res) {

  Post.find({}, function(err, posts) {
    res.render("home", {
      homeText: homeStartingContent,
      posts: posts
    });
  });




});


app.get("/about", function(req, res) {
  res.render("about", {
    aboutText: aboutContent
  });
});


app.get("/contact", function(req, res) {
  res.render("contact", {
    contactText: contactContent
  });
});


app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    body: req.body.postContent
  });
  post.save(function(err) {
    if (!err) {
        res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

app.get('/posts/:postId', function(req, res) {
  const postId = req.params.postId;
  Post.findOne({_id: postId}, function(err, foundPost) {
    res.render("post", {postTitle: foundPost.title , postBody: foundPost.body })
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
