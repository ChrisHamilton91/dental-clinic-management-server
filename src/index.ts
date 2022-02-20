import express from "express";
import cors from "cors";
import db from "./db";

const app = express();
app.use(cors());
app.use(express.json());

//testing post
app.post("/add-to-test-table", async (req, res) => {
  try {
    const { data } = req.body;
    console.log("received " + data);
    await db.proc("add_to_test_table", [data]);
    const reply = `Added ${data} to test_table`;
    console.log(reply);
    res.send(reply);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

//testing get
app.get("/get-test-table", async (req, res) => {
  try {
    console.log("Received request for test_table");
    const reply = await db.func("get_test_table");
    console.log("Sending test_table");
    res.send(reply);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server has started on port " + port);
});
