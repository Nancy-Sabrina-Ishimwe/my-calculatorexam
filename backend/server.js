const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Load database
let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));

// POST: Create calculation
app.post("/calculations", (req, res) => {
    const { expression, result } = req.body;

    const newCalc = {
        id: Date.now(),
        expression,
        result,
        createdAt: new Date()
    };

    data.calculations.push(newCalc);
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

    res.status(201).json(newCalc);
});

// GET: List calculations
app.get("/calculations", (req, res) => {
    res.json(data.calculations);
});


app.put("/calculations/:id", (req, res) => {
    const id = Number(req.params.id);
    const { expression, result } = req.body;

    const calc = data.calculations.find(c => c.id === id);

    if (!calc) return res.status(404).json({ message: "Not found" });

    calc.expression = expression || calc.expression;
    calc.result = result || calc.result;

    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

    res.json(calc);
});


app.delete("/calculations", (req, res) => {
    data.calculations = [];
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
    res.json({ message: "All calculations deleted" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
