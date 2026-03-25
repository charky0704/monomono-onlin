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
function goCreate(){ show("create"); }

/* ===== プレイヤー作成 ===== */
function createPlayer(){
    const name = document.getElementById("name")?.value;
    const file = document.getElementById("img")?.files[0];

    if(!name){ alert("名前必須"); return; }
    if(!file){ alert("見た目必須"); return; }

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

/* ===== 探索 ===== */
function exploreArea(){
    if(!p) return;
    explore++;
    if(explore > maxExplore) explore = maxExplore;
    alert(`${p.name}は探索した！ 探索進捗: ${explore}/${maxExplore}`);
    updateUI();
}

/* ===== セーブ ===== */
function saveGame(){
    if(!p) return;
    localStorage.setItem("mono", JSON.stringify(p));
    alert("ゲームをセーブしました！");
}

/* ===== ロード ===== */
function loadGame(){
    p = JSON.parse(localStorage.getItem("mono"));
    if(!p){ alert("データなし"); return; }
    show("menu");
    updateUI();
}

/* ===== ログアウト ===== */
function logout(){ location.reload(); }

/* ===== ダミー塔 ===== */
function startTower(){ alert("塔機能は未実装です"); }

/* ===== グローバル公開 ===== */
window.goCreate = goCreate;
window.createPlayer = createPlayer;
window.loadGame = loadGame;
window.exploreArea = exploreArea;
window.saveGame = saveGame;
window.logout = logout;
window.startTower = startTower;
