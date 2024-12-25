const puzzleStrings = [
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
    '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
    '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6',
    '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'
  ];

let counter = 0;
let currentPuzzle = "";

const fillGrid = (string) => {
  for (let j = 0; j < 9; j++) {  
    for (let i = 1; i < 10; i++) {
      console.log(`${String.fromCharCode(j + 97)}-${i}`, string[i + (j * 9) - 1]);
      if (string[i + (j * 9) - 1] !== ".") {
        document.getElementById(`${String.fromCharCode(j + 97)}-${i}`).innerText = string[i + (j * 9) - 1];
      }
    }
  }
}

document.getElementById("generate-puzzle-btn").addEventListener("click", () => {
  currentPuzzle = puzzleStrings[counter];
  fillGrid(currentPuzzle);
  if (counter === 4) {
    counter = 0;
  } else {
    counter++;
  }
});

document.getElementById("solve-puzzle-btn").addEventListener("click", () => {
  if (!currentPuzzle) {
    return alert("No puzzle to solve")
  }
  fetch("https://chunk-sudoku-solver-47890bb073ab.herokuapp.com/api/solve", {
    method: "POST",
    "Content-Type": "application/json",
    body: {puzzle: currentPuzzle}
  })
  .then(response => response.json())
  .then(data => {
    const { solution } = data;
    console.log("Solution", JSON.stringify(solution))
    fillGrid(JSON.stringify(solution));
    currentPuzzle = "";
    })
    .catch(err => {
      alert(err)
    })
});

document.getElementById("check-placement-btn").addEventListener("click", () => {
  const coordinate = document.getElementById("coordinate-input").value;
  const value = document.getElementById("value-input").value;
  fetch("https://chunk-sudoku-solver-47890bb073ab.herokuapp.com/api/check", {
    method: "POST",
    "Content-Type": "application/json",
    body: {
      puzzle: currentPuzzle,
      coordinate,
      value
    }
  })
    .then(response => response.json())
    .then(data => {
      alert(JSON.stringify(data))
    })

})
