/*
Name : yeonsu park
Id   :128899218
Email:ypark91@myseneca.ca
cLink:
*/
var express = require("express");
var app = express();
var path = require("path");
const exphbs = require("express-handlebars");
var HTTP_PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
//register handlebars
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use(bodyParser.urlencoded({ extended: true }));
function onHttpStart() {
console.log("Express http server listening on: " + HTTP_PORT);
}
// setup another route to listen on /blog.html
app.get("/", function(req,res){
  res.render("dashboard", { layout: false });
  });
app.get("/login", function(req,res){
   res.sendFile(path.join(__dirname,"connection/login.html"))
   //res.render("login",{layout:false})
 });
 app.post("/login", (req, res) => {
  var loginData = {
      email: req.body.email,
      pw: req.body.password,
      expression: /[~`!#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(req.body.email)
  }
  if (loginData.email == "" || loginData.pw == "") {
      res.render("login", { data: loginData, layout: false });
      return;
  }
  if (loginData.expression) {
      res.render("login", { data: loginData, layout: false });
      return;
  }
  res.render("dashboard", { layout: false });
});
//====================registration 
app.get("/registration", function(req,res){
  res.sendFile(path.join(__dirname,"connection/registration.html"))
});
app.post("/registration", (req, res) => {
  var regData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      reEntPw : req.body.reEntPw,
      phoneNumber: req.body.phoneNumber,
      expressionP: /^[a-zA-Z]\w{5,15}$/.test(req.body.password),
      expressionPN: /^[2-9]\d{2}-\d{3}-\d{4}$/.test(req.body.phoneNumber)
  }
  matchedPassword = () =>{
    if(regData.password == regData.reEntPw){
      return true;
    }else{
      return false;
    }
  }
   regData.matchedPassword = matchedPassword

  if (regData.firstName == "" || regData.lastName == "" || regData.email == "" || regData.password == "" || regData.reEntPw == "" || regData.phoneNumber == ""){
    res.render("registration", { data: regData, layout: false });
    return;
  }
  if (regData.expressionP) {
      res.render("registration", { data: regData, layout: false });
      return;
  } 
  if (regData.expressionPN) {
    res.render("registration", { data: regData, layout: false });
    return;
}
res.render("dashboard",{layout: false})
});

app.use(function(req,res){
  res.status(404).send("Page not found")
})

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT,onHttpStart)