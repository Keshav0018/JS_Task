const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset-btn");

let turnO = true;

const winningConfig = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;

    checkWinner();
  });
});

const checkWinner = () => {
  winningConfig.forEach((arr) => {
    const pos1 = boxes[arr[0]].innerText;
    const pos2 = boxes[arr[1]].innerText;
    const pos3 = boxes[arr[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 == pos2 && pos2 == pos3) {
        alert(`Player : ${pos1} wins`);
      }
    }
  });
};

const resetGame = () => {
  turnO = true;
};
