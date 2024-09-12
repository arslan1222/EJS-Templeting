const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname,"public")));

const PORT = 8080;

// EJS 
app.get('/', (req, res) => {
    res.render("home.ejs");
});

// app.get('/rolldice', (req, res) => {
//     let dicValue = Math.floor(Math.random() * 6) + 1;
//     res.render("rollDice.ejs", {number: dicValue});
// });


app.get('/roll', (req, res) => {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    res.render("rollDice.ejs", {diceValue});
});

// app.get("/id/:username", (req, res)=>{
//     let followers = ['Ahmed', 'Ahsan', 'Muneeb', 'Taimoor', 'Tayyab'];
//     const { username } = req.params;
//     res.render("homepage.ejs", {username, followers});
// })

app.get("/id/:username", (req, res)=>{
    let { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data){
        res.render("homepage.ejs", {data});
    } else {
        res.render("error.ejs")
    }
    
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})