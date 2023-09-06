// Variáveis para controlar o estado do jogo
let scores, currentScore, activePlayer, playing;

// Função para inicializar o jogo
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // 0 para o jogador 1, 1 para o jogador 2
  playing = true;

  // Atualizar a interface do usuário
  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  document.querySelector('.dice').style.display = 'none';
}

// Função para alternar jogadores
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

// Função para rolar o dado
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    // Gerar um número aleatório entre 1 e 6 para simular o lançamento de um dado
    const dice = Math.floor(Math.random() * 6) + 1;

    // Exibir a imagem do dado correspondente
    const diceImage = document.querySelector('.dice');
    diceImage.style.display = 'block';
    diceImage.src = `dice-${dice}.png`;

    // Atualizar a pontuação atual se o número não for 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Passar para o próximo jogador
      switchPlayer();
    }
  }
});

// Função para manter a pontuação
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    // Adicionar a pontuação atual à pontuação total do jogador ativo
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Verificar se o jogador venceu
    if (scores[activePlayer] >= 100) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector('.dice').style.display = 'none';
      playing = false;
    } else {
      // Passar para o próximo jogador
      switchPlayer();
    }
  }
});

// Função para iniciar um novo jogo
document.querySelector('.btn--new').addEventListener('click', init);

// Inicializar o jogo quando a página carregar
init();
