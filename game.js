let p = null;
let floor = 1;
let explore = 0;
let maxExplore = 5;
let inBattle = false;

/* ===== 画面切り替え ===== */
function show(id){
    ["start","create","menu","battle"].forEach(i=>{
        const el = document.getElementById(i);
        if(el) el.classList.add("hidden");
    });
    const target = document.getElementById(id);
    if(target) target.classList.remove("hidden");
}

/* ===== キャラ作成画面へ ===== */
function goCreate(){
    show("create");
}

/* ===== プレイヤー作成 ===== */
function createPlayer(){
    const name = document.getElementById("name")?.value;
    const file = document.getElementById("img")?.files[0];

    if(!name){
        alert("名前必須");
        return;
    }

    if(!file){
        alert("見た目必須");
        return;
    }

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

/* ===== メニュー更新 ===== */
function updateUI(){
  if(!p) return;
  const nameEl = document.getElementById("pname-status");
  const lvEl = document.getElementById("plv-status");
  const hpEl = document.getElementById("php-status");
  const expEl = document.getElementById("pexp-status");

  if(nameEl) nameEl.textContent = p.name;
  if(lvEl) lvEl.textContent = p.lv;
  if(hpEl) hpEl.textContent = `${p.hp} / ${p.maxhp}`;
  if(expEl) expEl.textContent = p.exp;
}
    const statusEl = document.getElementById("status");
    if(statusEl){
        statusEl.innerHTML = 
        `${p.name}<br>Lv:${p.lv}<br>Floor:${floor}<br>EXP:${p.exp}<br>Explore:${explore}/${maxExplore}`;
    } else {
        console.warn("status要素が見つかりません");
    }
}

/* ===== 探索 ===== */
function exploreArea(){
    show("menu");

    const statusEl = document.getElementById("status");
    if(statusEl){
        statusEl.innerHTML =
        `${p.name}<br>Lv:${p.lv}<br>Floor:${floor}<br>探索:${explore}/${maxExplore}`;
    }
}

/* ===== セーブ ===== */
function saveGame(){
    if(!p) return;
    localStorage.setItem("mono",JSON.stringify(p));
}

/* ===== ロード ===== */
function loadGame(){
    p = JSON.parse(localStorage.getItem("mono"));

    if(!p){
        alert("データなし");
        return;
    }

    if(typeof floor === "undefined") floor = 1;
    if(typeof explore === "undefined") explore = 0;
    if(typeof maxExplore === "undefined") maxExplore = 5;
    if(typeof inBattle === "undefined") inBattle = false;

    show("menu");
    updateUI();
}

/* ===== ログアウト ===== */
function logout(){
    location.reload();
}

/* ===== ボスクリア後 ===== */
function clearBoss(){
    floor++;
    explore = 0;
    alert("次の階層へ！");
    show("menu");
    updateUI();
}

/* ===== ダミー関数 ===== */
function startTower(){
    alert("塔機能は未実装です");
}

/* ===== グローバル公開 ===== */
window.goCreate = goCreate;
window.createPlayer = createPlayer;
window.loadGame = loadGame;
window.explore = exploreArea;
window.saveGame = saveGame;
window.logout = logout;
window.startTower = startTower;
