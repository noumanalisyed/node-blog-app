const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database('./database.db',function(err){
  if(err){
    console.error(err);
    process.exit(1); //Bail out we can't connect to the DB
  }else{
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
  }
});


const userRoutes = require('./routes/user');

//set the app to use ejs for rendering
app.set('view engine', 'ejs');

app.set("views", __dirname + "/views");
//Path to Author Home/Portal Page
app.get('/', (req, res) => {
  res.render("resources/main.ejs")
});

app.get('/main.ejs', (req, res) => {
  res.render("resources/main.ejs")
});

// Path to Reader (Live Blog)
app.get('/reader.ejs', (req, res) => {
  res.render("resources/reader.ejs")
});

// path to workspace (for author only)
app.get('/workspace.ejs', (req, res) => {
  res.render("resources/workspace.ejs")
});


app.get('/author/main.ejs', (req, res) => {
  res.render("resources/author/main.ejs")
});

// path to edit articles page (for author only)
app.get('/edit_articles.ejs', (req, res) => {
  res.render("resources/edit_articles.ejs")
});

//this adds all the userRoutes to the app under the path /user
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

