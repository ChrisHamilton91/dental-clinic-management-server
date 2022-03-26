import express from "express";
import cors from "cors";
import db from "./db";
import { Request, Response } from "express-serve-static-core/index";
import { Person, Employee, Confirmation, Branch, Replacement } from "./schema/person";
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

//Add person as dentist
app.post("/add-person-as-dentist", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("Adding person as dentist...");
    const e: Employee = req.body;
    const result = await db.func(
      "add_person_as_dentist",
      [
        e.house_number,
        e.street,
        e.city,
        e.province,
        e.first_name,
        e.middle_name || "",
        e.last_name,
        e.gender,
        e.ssn,
        e.email,
        e.date_of_birth,
        e.type,
        e.salary,
        e.username,
        e.password,
        e.branch_city
      ],
      queryResult.one
    );
    console.log("Added person as dentist ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Add person as hygienist
app.post("/add-person-as-hygienist", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("Adding person as hygienist...");
    const e: Employee = req.body;
    const result = await db.func(
      "add_person_as_hygienist",
      [
        e.house_number,
        e.street,
        e.city,
        e.province,
        e.first_name,
        e.middle_name || "",
        e.last_name,
        e.gender,
        e.ssn,
        e.email,
        e.date_of_birth,
        e.type,
        e.salary,
        e.username,
        e.password,
        e.branch_city
      ],
      queryResult.one
    );
    console.log("Added person as hygienist ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Add person as receptionist
app.post("/add-person-as-receptionist", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("Adding person as receptionist...");
    const e: Employee = req.body;
    const result = await db.func(
      "add_person_as_receptionist",
      [
        e.house_number,
        e.street,
        e.city,
        e.province,
        e.first_name,
        e.middle_name || "",
        e.last_name,
        e.gender,
        e.ssn,
        e.email,
        e.date_of_birth,
        e.type,
        e.salary,
        e.username,
        e.password,
        e.branch_city
      ],
      queryResult.one
    );
    console.log("Added person as receptionist ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Assign an employee as a dentist
app.post("/assign-employee-to-dentist", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("Assigning dentist to the employee...");
    const c: Confirmation = req.body;
    const result = await db.func(
      "assign_employee_to_dentist",
      [
        c.first_name,
        c.last_name,
        c.ssn,
        c.email
      ],
      queryResult.one
    );
    console.log("Assigned dentist to the employee ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Assign an employee as a hygienist
app.post("/assign-employee-to-hygienist", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("Assigning hygienist to the employee...");
    const c: Confirmation = req.body;
    const result = await db.func(
      "assign_employee_to_hygienist",
      [
        c.first_name,
        c.last_name,
        c.ssn,
        c.email
      ],
      queryResult.one
    );
    console.log("Assigned hygienist to the employee ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Assign an employee as a receptionist
app.post("/assign-employee-to-receptionist", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("Assigning receptionist to the employee...");
    const c: Confirmation = req.body;
    const result = await db.func(
      "assign_employee_to_receptionist",
      [
        c.first_name,
        c.last_name,
        c.ssn,
        c.email
      ],
      queryResult.one
    );
    console.log("Assigned receptionist to the employee ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//De-assign an employee as a dentist
app.post("/retract-dentist-from-employee", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("De-assigning dentist from the employee...");
    const c: Confirmation = req.body;
    const result = await db.func(
      "retract_dentist_from_employee",
      [
        c.first_name,
        c.last_name,
        c.ssn,
        c.email
      ],
      queryResult.one
    );
    console.log("De-assigned dentist from the employee ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//De-assign an employee as a hygienist
app.post("/retract-hygienist-from-employee", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("De-assigning hygienist from the employee...");
    const c: Confirmation = req.body;
    const result = await db.func(
      "retract_hygienist_from_employee",
      [
        c.first_name,
        c.last_name,
        c.ssn,
        c.email
      ],
      queryResult.one
    );
    console.log("De-assigned hygienist from the employee ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//De-assign an employee as a receptionist
app.post("/retract-receptionist-from-employee", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("De-assigning receptionist from the employee...");
    const c: Confirmation = req.body;
    const result = await db.func(
      "retract_receptionist_from_employee",
      [
        c.first_name,
        c.last_name,
        c.ssn,
        c.email
      ],
      queryResult.one
    );
    console.log("De-assigned receptionist from the employee ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Remove an employee
app.post("/fire-employee", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("Fire an employee...");
    const c: Confirmation = req.body;
    const result = await db.func(
      "fire_employee",
      [
        c.first_name,
        c.last_name,
        c.ssn,
        c.email
      ],
      queryResult.one
    );
    console.log("Fired the employee ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Create branch and new manager
app.post("/create-branch-and-manager", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("Creating branch and manager...");
    const e: Employee = req.body;
    const result = await db.func(
      "create_branch_and_manager",
      [
        e.house_number,
        e.street,
        e.city,
        e.province,
        e.first_name,
        e.middle_name || "",
        e.last_name,
        e.gender,
        e.ssn,
        e.email,
        e.date_of_birth,
        e.type,
        e.salary,
        e.username,
        e.password,
        e.branch_city
      ],
      queryResult.one
    );
    console.log("Created branch and manager ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Create branch with existing manager
app.post("/create-branch", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("Creating branch...");
    const b: Branch = req.body;
    const result = await db.func(
      "create_branch",
      [
        b.first_name,
        b.last_name,
        b.ssn,
        b.email,
        b.city
      ],
      queryResult.one
    );
    console.log("Created branch ", result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

//Replace manager with another employee
app.post("/change-manager", async (req, res) => {
  try{
    if (!authenticate(req, res)) return;
    console.log("Changing Manager...");
    const r: Replacement = req.body;
    const result = await db.func(
      "change_manager",
      [
        r.first_name,
        r.last_name,
        r.ssn,
        r.email,
        r.rep_first_name,
        r.rep_last_name,
        r.rep_ssn,
        r.rep_email
      ],
      queryResult.one
    );
    console.log("Manager changed ", result);
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

//Show all dentists
app.get("/show-dentists", async (_, res) =>{
  try{
    const result = await db.func("show_dentists");
    res.send(result);
  } catch (err){
    console.log(err);
    res.status(500).send({ message: err.message, detail: err.detail });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server has started on port " + port);
});
