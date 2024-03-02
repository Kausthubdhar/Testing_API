import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  const typeL = req.body.type.length, parL = req.body.participants.length;
  let url;
  if(typeL == 0 && parL == 0) res.redirect('/');
  else if(parL == 0) url = "https://bored-api.appbrewery.com/filter?type=" + req.body.type;
  else url = "https://bored-api.appbrewery.com/filter?type=" + req.body.type + "&participants=" + req.body.participants;
  try{
    const response = await axios.get(url);
    const Data = response.data;
    const obj = Data[Math.floor(Math.random() * Data.length)];
    res.render("index", {data : obj});
  }
  catch(error){
      console.error("Falied to make request " + error.message);
      res.render("index");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
