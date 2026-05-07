let player = null;
let inBattle = false;
let currentEnemy = null;

let game = {
  currentFloor: 1,
  exploreCount: 0
};
let tempStatus = {
  str: 0,
  vit: 0,
  agi: 0,
  int: 0
};

let point = 20;
const floors = {
  1: {
    enemy: ["スライム", "ウルフ"],
    boss: "ゴブリンキング",
    hidden: "レアスライム",
    bossNeed: 5
  },
  2: {
    enemy: ["コウモリ", "スケルトン"],
    boss: "ダークナイト",
    hidden: "シャドウスライム",
    bossNeed: 7
  }
};
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

function log(text){
  const el = document.getElementById("log");
  if(el) el.innerHTML += text + "<br>";
}

function createPlayer(){
  const name = document.getElementById("name").value;
  const file = document.getElementById("img").files[0];

  if(!name){ alert("名前は必須です"); return; }
  if(!file){ alert("見た目は必須です"); return; }
function updatePointUI(){
  document.getElementById("point").innerText = point;

  document.getElementById("strVal").innerText = tempStatus.str;
  document.getElementById("vitVal").innerText = tempStatus.vit;
  document.getElementById("agiVal").innerText = tempStatus.agi;
  document.getElementById("intVal").innerText = tempStatus.int;
}
function addStat(type){
  if(point <= 0) return;

  tempStatus[type]++;
  point--;

  updatePointUI();
}

function subStat(type){
  if(tempStatus[type] <= 0) return;

  tempStatus[type]--;
  point++;

  updatePointUI();
}
player = {
  name,
  img: URL.createObjectURL(file),
  lv: 1,
  exp: 0,
  hp: 100,
  maxhp: 100,
  status: {
    str: 0,
    vit: 0,
    agi: 0,
    int: 0
  },
  weapon: ["なし", "なし"]
};

  saveGame();
  updateUI();
  show("menu");
}

function updateUI(){
  if(!player) return;

  document.getElementById("charImg").src = player.img;

  document.getElementById("status").innerHTML = `
    名前: ${player.name}<br>
    Lv: ${player.lv}<br>
    HP: ${player.hp}/${player.maxhp}<br>
    ATK: ${player.status.atk}<br>
    DEF: ${player.status.def}<br>
    SPD: ${player.status.spd}<br>
    武器: ${player.weapon.join(" / ")}
  `;
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
  if(!player) return;
  localStorage.setItem("mono", JSON.stringify(player));
}

function loadGame(){
  player = JSON.parse(localStorage.getItem("mono"));
  if(!player){ alert("データなし"); return; }
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
window.addEventListener("orientationchange", () => {
  location.reload();
});
window.addStat = addStat;
window.subStat = subStat;
window.updatePointUI = updatePointUI;
