let p = null;

function show(id){
  ["start","create","menu","battle"].forEach(i=>{
    const el = document.getElementById(i);
    if(el) el.classList.add("hidden");
  });
  const target = document.getElementById(id);
  if(target) target.classList.remove("hidden");
}

function goCreate(){
  alert("goCreate が呼ばれた！");
  show("create");
}

function createPlayer(){
  const name = document.getElementById("name").value;
  const file = document.getElementById("img").files[0];

  if(!name){ alert("名前は必須です"); return; }
  if(!file){ alert("見た目は必須です"); return; }

  p = { name:name, img:URL.createObjectURL(file), lv:1, exp:0, hp:100, maxhp:100 };

  alert(`キャラクター作成完了: ${p.name}`);
  // 次の画面があれば show("menu") などで表示
}

window.goCreate = goCreate;
window.createPlayer = createPlayer;
  p = {
    name: name,
    img: URL.createObjectURL(file),
    lv: 1,
    exp: 0,
    hp: 100,
    maxhp: 100
  };

  saveGame();
  show("menu");
  updateUI();
}

function updateUI(){
  if(!p) return;
  document.getElementById("status").innerHTML =
    `名前: ${p.name}<br>Lv: ${p.lv}<br>HP: ${p.hp}/${p.maxhp}<br>EXP: ${p.exp}`;
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

// グローバル公開
window.goCreate = goCreate;
window.createPlayer = createPlayer;
window.loadGame = loadGame;
window.exploreArea = exploreArea;
window.saveGame = saveGame;
window.logout = logout;
