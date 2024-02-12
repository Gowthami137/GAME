document.addEventListener('DOMContentLoaded', () => 
{
  const board = document.getElementById('board');
  const size = 10;
  const minesCount = 15;
  let revealedCount = 0;
  let cells = [];
  
  // Creating board
  for (let i = 0; i < size; i++) {
      cells[i] = [];
      for (let j = 0; j < size; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell', 'hidden');
          cell.dataset.row = i;
          cell.dataset.col = j;
          cell.addEventListener('click', () => revealCell(i, j));
          board.appendChild(cell);
          cells[i][j] = {
              element: cell,
              isMine: false,
              isRevealed: false,
              count: 0
          };
      }
  }
  
  
  for (let i = 0; i < minesCount; i++) {
      let row, col;
      do {
          row = Math.floor(Math.random() * size);
          col = Math.floor(Math.random() * size);
      } while (cells[row][col].isMine);
      cells[row][col].isMine = true;
      for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
              const r = row + dr;
              const c = col + dc;
              if (r >= 0 && r < size && c >= 0 && c < size) {
                  cells[r][c].count++;
              }
          }
      }
  }
  
 
  function revealCell(row, col) {
      const cell = cells[row][col];
      if (cell.isRevealed || cell.element.classList.contains('flagged')) return;
      cell.isRevealed = true;
      cell.element.classList.remove('hidden');
      if (cell.isMine) {
          cell.element.classList.add('mine');
          gameOver();
      } else {
          revealedCount++;
          cell.element.textContent = cell.count || '';
          if (cell.count === 0) {
              for (let dr = -1; dr <= 1; dr++) {
                  for (let dc = -1; dc <= 1; dc++) {
                      const r = row + dr;
                      const c = col + dc;
                      if (r >= 0 && r < size && c >= 0 && c < size) {
                          revealCell(r, c);
                      }
                  }
              }
          }
          if (revealedCount === size * size - minesCount) {
              gameWin();
          }
      }
  }
  

  function gameWin() {
      alert('Congratulations! You win!');
      revealAllCells();
  }
  
 
  function gameOver() {
      alert('Game Over! You hit a mine!');
      revealAllCells();
  }
  
  
  function revealAllCells() {
      cells.forEach(row => {
          row.forEach(cell => {
              cell.isRevealed = true;
              cell.element.classList.remove('hidden');
              if (cell.isMine) {
                  cell.element.classList.add('mine');
              }
          });
      });
  }
});
