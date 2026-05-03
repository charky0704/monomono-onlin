let p = null;
let inBattle = false;
let currentEnemy = null;

function show(id){
  document.querySelectorAll('.screen').forEach(el=>{
    el.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// NEW GAMEボタン用
function goCreate(){
  show("create");
}

function createPlayer(){
  const name = document.getElementById("name").value;
  const file = document.getElementById("img").files[0];

  if(!name){ alert("名前は必須です"); return; }
  if(!file){ alert("見た目は必須です"); return; }

  p = { 
    name:name, 
    img:URL.createObjectURL(file), 
    lv:1, 
    exp:0, 
    hp:100, 
    maxhp:100 
  };

  saveGame();
  updateUI();
  show("menu");
}

function updateUI(){
  if(!p) return;
  document.getElementById("status").innerHTML =
    `名前: ${p.name}<br>Lv: ${p.lv}<br>HP: ${p.hp}/${p.maxhp}<br>EXP: ${p.exp}`;
}

function exploreArea(){
  const f = floors?.[game?.currentFloor || 1];

  let enemy = null;

  game.exploreCount = (game.exploreCount || 0) + 1;

  // 隠し
  if(Math.random() < 0.05){
    enemy = { name: f.hidden, hp: 80, atk: 15, exp: 100 };
  }
  // ボス
  else if(game.exploreCount >= f.bossNeed){
    enemy = { name: f.boss, hp: 200, atk: 25, exp: 300 };
    game.exploreCount = 0;
  }
  // 通常
  else{
    const name = f.enemy[Math.floor(Math.random()*f.enemy.length)];
    enemy = { name, hp: 50, atk: 10, exp: 20 };
  }

  log(`⚔️ ${enemy.name} が現れた`);

  currentEnemy = enemy;
  startBattle();
}

function saveGame(){ 
  if(!p) return; 
  localStorage.setItem("mono", JSON.stringify(p)); 
}

function loadGame(){
  p = JSON.parse(localStorage.getItem("mono"));
  if(!p){ alert("データなし"); return; }
  show("menu");
  updateUI();
}

function logout(){ 
  location.reload(); 
}

// グローバル公開
window.goCreate = goCreate;
window.createPlayer = createPlayer;
window.loadGame = loadGame;
window.exploreArea = exploreArea;
window.saveGame = saveGame;
window.logout = logout;
