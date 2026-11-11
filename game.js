// Vi sparar nio rutor i en array.
// Numren visar vilka positioner spelarna kan välja.
let board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Övning 2: Spelare O börjar.
let currentPlayer = "O";

// false betyder att spelet fortfarande pågår.
let gameOver = false;

// Övning 3: Vi räknar hur många giltiga drag som gjorts i matchen.
let moveCount = 0;

function showBoard() {
  // Index börjar på 0 i en array.
  console.log(` ${board[0]} | ${board[1]} | ${board[2]} `);
  console.log("---+---+---");
  console.log(` ${board[3]} | ${board[4]} | ${board[5]} `);
  console.log("---+---+---");
  console.log(` ${board[6]} | ${board[7]} | ${board[8]} `);
}

function updateScreen() {
  // Vi tar bort tidigare utskrifter.
  console.clear();
  // Övning 1: Vi visar vår nya rubrik i konsolen.
  console.log("RECADEMY - TRE I RAD\n");

  showBoard();

  // Övning 3: Vi visar hur många drag som gjorts hittills.
  console.log(`\nAntal drag: ${moveCount}`);
}

function hasWon() {
  // Varje grupp innehåller tre positioner i vår array.
  let winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Vågrätt
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Lodrätt
    [0, 4, 8],
    [2, 4, 6], // Diagonalt
  ];

  // Vi undersöker en möjlig vinnarrad i taget.
  for (let line of winningLines) {
    let [a, b, c] = line;

    // Alla tre rutor måste ha den aktuella spelarens symbol.
    if (
      board[a] === currentPlayer &&
      board[b] === currentPlayer &&
      board[c] === currentPlayer
    ) {
      return true;
    }
  }

  // Vi hittade ingen vinnande rad.
  return false;
}

function isDraw() {
  // every() ger true när alla rutor uppfyller vårt villkor.
  return board.every((cell) => cell === "X" || cell === "O");
}

function switchPlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function move(position) {
  // Spelaren får inte göra drag efter att spelet är slut.
  if (gameOver) {
    console.log("Spelet är slut! Skriv startGame() för att spela igen.");
    return;
  }

  // Vi accepterar endast heltalen 1 till 9.
  if (!Number.isInteger(position) || position < 1 || position > 9) {
    console.log("Ogiltigt val! Välj ett nummer mellan 1 och 9.");
    return;
  }

  // Spelaren anger 1–9, men arrayens index är 0–8.
  let index = position - 1;

  // En ruta med X eller O är redan upptagen.
  if (board[index] === "X" || board[index] === "O") {
    console.log("Den rutan är redan upptagen! Välj en annan.");
    return;
  }

  // Vi sparar symbolen och visar den nya spelplanen.
  board[index] = currentPlayer;

  // Övning 3: Vi ökar räknaren med ett efter ett giltigt drag.
  moveCount++;

  updateScreen();
  // Har spelaren fått tre i rad?
  if (hasWon()) {
    console.log(`Spelare ${currentPlayer} vann!`);
    console.log("Skriv startGame() för att spela igen.");
    gameOver = true;
    return;
  }

  // Är alla rutor upptagna utan vinnare?
  if (isDraw()) {
    console.log("Oavgjort! Ingen vann.");
    console.log("Skriv startGame() för att spela igen.");
    gameOver = true;
    return;
  }

  // Spelet fortsätter, så nästa spelare får göra sitt drag.
  switchPlayer();
  console.log(`Spelare ${currentPlayer}s tur.`);
  console.log("Skriv move(1) till move(9) för att välja en ruta.");
} // Här avslutas funktionen move().

function startGame() {
  // Vi återställer spelplanen till nio numrerade rutor.
  board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  currentPlayer = "O";
  gameOver = false;

  // Övning 3: Vi nollställer räknaren inför den nya matchen.
  moveCount = 0;

  // Vi visar den nollställda spelplanen.
  updateScreen();
  // console.log("Spelare X börjar!");
  // Övning 2: Tack vare variabeln currentPlayer kommer alltid rätt spelare att visas!
  console.log(`Spelare ${currentPlayer} börjar!`);

  console.log("Skriv move(1) till move(9) för att välja en ruta.");
}

// Vi startar den första matchen.
startGame();
