import express from "express";
import cors from "cors";
import db from "./db";
import { Request, Response } from "express-serve-static-core/index";

const app = express();
app.use(cors());
app.use(express.json());

//authenticate
function authenticate(req: Request, res: Response): boolean {
  if (req.header("api-key") !== process.env.API_KEY) {
    res.status(401).send("Invalid api key.");
    return false;
  }
  return true;
}

//testing post
app.post("/add-to-test-table", async (req, res) => {
  try {
    if (!authenticate(req, res)) return;
    const { data } = req.body;
    console.log("received " + data);
    await db.proc("add_to_test_table", [data]);
    const reply = `Added ${data} to test_table`;
    console.log(reply);
    res.send(reply);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

//testing post2
app.post("/add-to-my-table", async (req, res) => {
  try {
    if (!authenticate(req, res)) return;
    const { data, foreign_id } = req.body;
    console.log(
      "received " + JSON.stringify({ data: data, foreign_id: foreign_id })
    );
    await db.proc("add_to_test_table", [data]);
    const reply = `Added data: ${data} and foreign_id ${foreign_id} to test_table`;
    console.log(reply);
    res.send(reply);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

//testing get
app.get("/get-test-table", async (_, res) => {
  try {
    console.log("Received request for test_table");
    const reply = await db.func("get_test_table");
    console.log("Sending test_table");
    res.send(reply);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server has started on port " + port);
});
