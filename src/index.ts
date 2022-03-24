import express from "express";
import cors from "cors";
import db from "./db";
import { Request, Response } from "express-serve-static-core/index";
import { Person } from "./schema/person";
import { queryResult } from "pg-promise";

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

//test api-key
app.get("/test-api-key", async (req, res) => {
  if (req.header("api-key") === process.env.API_KEY) res.send(true);
  else res.send(false);
});

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

//Add person as patient
app.post("/add-person-as-patient", async (req, res) => {
  try {
    if (!authenticate(req, res)) return;
    console.log("Adding person as patient...");
    const p: Person = req.body;
    const result = await db.func(
      "add_person_as_patient",
      [
        p.house_number,
        p.street,
        p.city,
        p.province,
        p.first_name,
        p.middle_name || "",
        p.last_name,
        p.gender,
        p.ssn,
        p.email,
        p.date_of_birth,
        p.user_id || null,
      ],
      queryResult.one
    );
    console.log("Added person as patient ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Get all patients
app.get("/get-all-patients", async (_, res) => {
  try {
    const result = await db.func("get_all_patients");
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Get all employees
app.get("/get-all-employees", async (_, res) => {
  try {
    const result = await db.func("get_all_employees");
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Get all dentists
app.get("/get-all-dentists", async (_, res) => {
  try {
    const result = await db.func("get_all_dentists");
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server has started on port " + port);
});
