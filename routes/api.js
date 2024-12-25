"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    console.log("API/CHECK REQ BODY:", req.body);

    const { puzzle, coordinate, value } = req.body;

    // Validate required fields
    if (!puzzle || !coordinate || !value) {
      console.log({ error: "Required field(s) missing" });
      return res.json({ error: "Required field(s) missing" });
    }

    // Validate coordinate format
    if (!/^[a-iA-I][1-9]$/.test(coordinate)) {
      console.log({ error: "Invalid coordinate" });
      return res.json({ error: "Invalid coordinate" });
    }

    // Validate value format
    if (!/^[1-9]$/.test(value)) {
      console.log({ error: "Invalid value" });
      return res.json({ error: "Invalid value" });
    }

    // Validate the puzzle string
    const validationResult = solver.validate(puzzle);
    if (validationResult.error) {
      console.log({ error: validationResult.error });
      return res.json({ error: validationResult.error });
    }

    // Parse coordinate into row and column
    const row = coordinate[0].toUpperCase().charCodeAt(0) - 64; // Correct mapping from A-I to 1-9
    const col = parseInt(coordinate[1], 10);

    // Call the checkPlacement method
    const placementResult = solver.checkPlacement(puzzle, row, col, value);

    if (!placementResult.valid) {
        return res.json({
            valid: false,
            conflict: placementResult.conflict,
        });
    }
    return res.json({ valid: true });
  });

app.route("/api/solve").post((req, res) => {
    console.log("API/SOLVE REQ BODY:", req.body);
    const { puzzle } = req.body;
    if (!puzzle) {
      console.log({ error: "Required field missing" });
      return res.json({ error: "Required field missing" });
    }
    const validationResult = solver.validate(puzzle);
    if (validationResult.error) {
      console.log({ error: validationResult.error });
      return res.json({ error: validationResult.error });
    } else {
      const solveResult = solver.solve(puzzle);
      if (!solveResult) {
        console.log({ error: "Puzzle cannot be solved" });
        return res.json({ error: "Puzzle cannot be solved" });
      } else {
        console.log({ solution: solveResult });
        return res.json({ solution: solveResult });
      }
    }
  });
};
