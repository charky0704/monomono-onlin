/* ===== 画面切り替え ===== */
function show(id){
    ["start","create","menu","battle"].forEach(i=>{
        document.getElementById(i).classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
}

/* ===== キャラ作成画面へ ===== */
function goCreate(){
    show("create");
}

/* ===== プレイヤー作成 ===== */
function createPlayer(){

    const name = document.getElementById("name").value;
    const file = document.getElementById("img").files[0];

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

    // 初期値を定義
    floor = 1;
    explore = 0;
    maxExplore = 5;
    inBattle = false;

    saveGame();
    show("menu");
    updateUI();
}

/* ===== メニュー更新 ===== */
function updateUI(){

    if(!p) return;

    document.getElementById("status").innerHTML =
    `${p.name}<br>Lv:${p.lv}<br>Floor:${floor}<br>EXP:${p.exp}<br>Explore:${explore}/${maxExplore}`;
}

/* ===== 探索 ===== */
function exploreArea(){
    show("menu");
    if(!p) return;
    document.getElementById("status").innerHTML =
    `${p.name}<br>Lv:${p.lv}<br>Floor:${floor}<br>探索:${explore}/${maxExplore}`;
}

function startExploreBattle(){

    if(inBattle) return;

    startBattle({
        name:"SLIME",
        hp:50 + floor * 20,
        atk:10 + floor * 5,
        exp:20 + floor * 10
    });
}

function startBoss(){

    if(explore < maxExplore){
        alert("まだボスは解放されていない");
        return;
    }

    startBattle({
        name:"BOSS",
        hp:200 + floor * 50,
        atk:25 + floor * 10,
        exp:200
    });
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

    // 初期値を安全に定義
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

function clearBoss(){

    floor++;
    explore = 0;

    alert("次の階層へ！");
    show("menu");
    updateUI();
}

/* ===== ダミー定義（エラー防止） ===== */
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
