//export 

const puzzlesAndSolutions = [
  [
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
    '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
  ],
  [
    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
    '568913724342687519197254386685479231219538467734162895926345178473891652851726943'
  ],
  [
    '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
    '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
  ],
  [
    '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6',
    '473891265851726394926345817568913472342687951197254638734162589685479123219538746'
  ],
  [
    '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
    '827549163531672894649831527496157382218396475753284916962415738185763249374928651'
  ]
];

let puzzleOne = "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51";

let puzzleFill = "";

const numbers = [...Array(9)].map((_, i) => i + 1);

let possibilities = [];

while (puzzleOne.includes(".")) {

  for (let j = 0; j < 9; j++) {
    const row = puzzleOne.slice(j * 9, (j * 9) + 9);
    const rowNumbers = Array.from(row.replace(/\./g, "")); 
    const rowNumbersConverted = rowNumbers.map(num => parseInt(num));
    for (let i = 0; i < 9; i++) {
      possibilities[j * 9 + i] = [];
      if (row[i] !== ".") {
        possibilities[j * 9 + i].push("N/A");
        continue;
      }
      for (let k = 1; k < 10; k++) {
        if (!rowNumbersConverted.includes(k)) {
          possibilities[j * 9 + i].push(k);
        }
      }
    }
  }

  for (let a = 0; a < 9; a++) {
    let column = "";
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      column += puzzleOne[rowIndex * 9 + a];
    }
    
    const colNumbers = Array.from(column.replace(/\./g, ""));
    const colNumbersConverted = colNumbers.map(num => parseInt(num));
    
    for (let b = 0; b < 9; b++) {
      if (puzzleOne[b * 9 + a] !== ".") {
        continue;
      }
      for (let c = 1; c < 10; c++) {
        if (colNumbersConverted.includes(c)) {
          for (let d = possibilities[b * 9 + a].length - 1; d >= 0; d--) {
            if (possibilities[b * 9 + a][d] === c) {
              possibilities[b * 9 + a].splice(d, 1);
            }
          }
        }
      }
    }
  }

  for (let z = 0; z < 3; z++) {
    for (let f = 0; f < 3; f++) {
      let square = "";
      for (let e = z * 3; e < (z * 3) + 3; e++) {
        for (let d = f * 3; d < (f * 3) + 3; d++) {
          square += puzzleOne[d + (e * 9)]
          const squareNumbers = Array.from(square.replace(/\./g, ""));
          const squareNumbersConverted = squareNumbers.map(num => parseInt(num));
          if (puzzleOne[d + (e * 9)] !== ".") {
            continue; 
          } else {
            for (let g = 1; g < 10; g++) {
              if (squareNumbersConverted.includes(g)) {
                for (let h = possibilities[d + (e * 9)].length - 1; h >= 0; h--) {
                  if (possibilities[d + (e * 9)][h] === g) {
                    possibilities[d + (e * 9)].splice(h, 1);
                  };
                };
              };
            };
          };
        };
      };
    };
  };

  let progressMade = false;
  for (let i = 0; i < possibilities.length; i++) {
    if (possibilities[i].length === 1 && puzzleOne[i] === ".") {
      puzzleOne = puzzleOne.slice(0, i) + possibilities[i][0] + puzzleOne.slice(i + 1);
      progressMade = true;
    }
  }
  if (!progressMade) break; 

console.log("Current puzzle state", puzzleOne);

};