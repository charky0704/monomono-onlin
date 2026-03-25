let p = null;
let floor = 1;
let explore = 0;
let maxExplore = 5;
let inBattle = false;

function show(id){
  ["start","create","menu","battle"].forEach(i=>{
    document.getElementById(i).classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

function goCreate(){ show("create"); }

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
  show("menu");
  updateUI();
}

function updateUI(){
  if(!p) return;
  document.getElementById("pname-status").textContent = p.name;
  document.getElementById("plv-status").textContent = p.lv;
  document.getElementById("php-status").textContent = `${p.hp} / ${p.maxhp}`;
  document.getElementById("pexp-status").textContent = p.exp;
}

function exploreArea(){ alert("探索イベント！"); }

function saveGame(){ if(!p) return; localStorage.setItem("mono", JSON.stringify(p)); }

function loadGame(){
  p = JSON.parse(localStorage.getItem("mono"));
  if(!p){ alert("データなし"); return; }
  show("menu");
  updateUI();
}

function logout(){ location.reload(); }

function startTower(){ alert("塔は未実装"); }

// グローバル公開
window.goCreate = goCreate;
window.createPlayer = createPlayer;
window.loadGame = loadGame;
window.exploreArea = exploreArea;
window.saveGame = saveGame;
window.logout = logout;
window.startTower = startTower;
<script src="game.js"></script>
<script src="battle.js"></script>
