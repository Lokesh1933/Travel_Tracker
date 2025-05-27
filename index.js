import dotenv from "dotenv"
dotenv.config()
import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: process.env.PASSWORD,
  port: 5432,
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
db.connect()
const result = await db.query("SELECT * FROM visited_countries",(res,err) =>{
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    console.log("Query result:", res.rows);
  }
})
  
app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT * FROM visited_countries")
 res.render("index.ejs",{countries:result.rows, total: result.rows.length});

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
