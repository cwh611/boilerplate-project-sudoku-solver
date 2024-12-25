class SudokuSolver {
  validate(puzzleString) {
    const validRegex = /^[1-9.]+$/;
    if (puzzleString.length !== 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    } else if (!validRegex.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    } else {
      return true;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowIndex = row - 1; // Convert 1-based row to 0-based
    const currentRow = puzzleString.slice(rowIndex * 9, rowIndex * 9 + 9);
    return currentRow.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const columnIndex = column - 1; // Convert 1-based column to 0-based
    for (let i = 0; i < 9; i++) {
      if (parseInt(puzzleString[i * 9 + columnIndex]) === parseInt(value)) {

        return true; // Conflict found, so placement is invalid
      }
    }
    return false; // No conflict, valid placement
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const startRow = Math.floor((row - 1) / 3) * 3; // 0-based region start row
    const startCol = Math.floor((column - 1) / 3) * 3; // 0-based region start column

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const currentIndex = (startRow + r) * 9 + (startCol + c);
        if (parseInt(puzzleString[currentIndex]) === parseInt(value)) {
          return true; // Conflict found
        }
      }
    }
    return false; // No conflict
  }

  checkPlacement(puzzleString, row, col, value) {
      const index = (row - 1) * 9 + (col - 1);
      if (puzzleString[index] === value) {
        return {valid: true}
      }
      // Continue checking row, col, and region conflicts
      const rowConflict = this.checkRowPlacement(puzzleString, row, col, value);
      const colConflict = this.checkColPlacement(puzzleString, row, col, value);
      const regionConflict = this.checkRegionPlacement(puzzleString, row, col, value);

      const conflict = [];
      if (rowConflict) conflict.push("row");
      if (colConflict) conflict.push("column");
      if (regionConflict) conflict.push("region");

      if (conflict.length === 0) {
          return { valid: true };
      } else {
          return { valid: false, conflict };
      }
  }
  
  solve(puzzleString) {
    const mainFunction = () => {
      const currentPuzzleArray = Array.from(puzzleString);
      const currentEmptyIndex = currentPuzzleArray.findIndex(el => el === ".");

      // Termination condition: if no more empty cells, puzzle is solved
      if (currentEmptyIndex === -1) {
        return puzzleString;
      }

      const currentRow = Math.floor(currentEmptyIndex / 9) + 1;
      const currentCol = (currentEmptyIndex % 9) + 1;

      for (let i = 1; i <= 9; i++) {
        const value = i.toString();
        if (
          !this.checkRowPlacement(puzzleString, currentRow, currentCol, value) &&
          !this.checkColPlacement(puzzleString, currentRow, currentCol, value) &&
          !this.checkRegionPlacement(puzzleString, currentRow, currentCol, value)
        ) {
          const newPuzzleArray = currentPuzzleArray.slice();
          newPuzzleArray[currentEmptyIndex] = value;
          puzzleString = newPuzzleArray.join("");

          const result = mainFunction();
          if (result) {
            return result;
          }

          // Backtrack
          puzzleString = currentPuzzleArray.join("");
        }
      }

      // If no value fits, return null to signal backtracking
      return null;
    };

    return mainFunction();
  }
}

module.exports = SudokuSolver;