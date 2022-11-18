function printHighscores() {
  let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  console.log(highscores)

  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  for (let i = 0; i < highscores.length; i++) {
    let liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
    let olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  localStorage.removeItem('highscores');
  location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

printHighscores();
