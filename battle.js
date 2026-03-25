/* ===== 初期化 ===== */
let towerFloor = 1;
let maxTowerFloor = 5;

/* ===== 敵データ（仮） ===== */
const enemyTemplate = {
    name: "SLIME",
    hp: 50,
    atk: 10,
    exp: 30
};

/* ===== 戦闘開始 ===== */
function startBattle(e = enemyTemplate){

    if(!p) return;

    inBattle = true;

    show("battle");

    const enemy = {...e}; // コピーして使う

    /* 表示セット */
    document.getElementById("pimg").src = p.img;
    document.getElementById("pname").innerText = p.name;
    document.getElementById("ename").innerText = enemy.name;

    let php = p.hp;
    let ehp = enemy.hp;

    /* HPバー初期化 */
    updateHP(php, ehp, enemy.hp);

    /* ログ初期化 */
    document.getElementById("log").innerHTML = "";
    log("BATTLE START!");

    /* 戦闘ループ */
    const loop = setInterval(()=>{

        /* プレイヤー攻撃 */
        ehp -= 10;
        log(p.name + " attack!");

        /* 敵死亡 */
        if(ehp <= 0){
            clearInterval(loop);
            winBattle(enemy);
            return;
        }

        /* 敵攻撃 */
        php -= enemy.atk;
        log("Enemy attack!");

        /* プレイヤー死亡 */
        if(php <= 0){
            clearInterval(loop);
            loseBattle(enemy);
            return;
        }

        /* HP更新 */
        updateHP(php, ehp, enemy.hp);

    },800);
}

/* ===== 勝利 ===== */
function winBattle(enemy){

    inBattle = false;

    p.exp += enemy.exp;

    /* 塔判定 */
    if(enemy.name.includes("TOWER")){
        towerFloor++;
        log("塔クリア！ " + towerFloor + "階へ");

        if(towerFloor > maxTowerFloor){
            maxTowerFloor = towerFloor;
        }
    }

    /* レベルアップ */
    if(p.exp >= p.lv * 100){
        p.lv++;
        p.exp = 0;
        p.maxhp += 20;
        p.hp = p.maxhp;
        log("LEVEL UP!");
    }

    setTimeout(()=>{
        show("menu");
        updateUI();
    },1200);
}

/* ===== 敗北 ===== */
function loseBattle(enemy){

    inBattle = false;

    /* 塔判定 */
    if(enemy.name.includes("TOWER")){
        log("塔リタイア: " + towerFloor + "階");
        towerFloor = 1;
    }

    p.hp = p.maxhp;

    setTimeout(()=>{
        show("menu");
        updateUI();
    },1200);
}

/* ===== HP更新 ===== */
function updateHP(php, ehp, emax){

    document.getElementById("php").style.width =
        (php / p.maxhp) * 100 + "%";

    document.getElementById("ehp").style.width =
        (ehp / emax) * 100 + "%";

    p.hp = php;
}

/* ===== ログ ===== */
function log(text){
    document.getElementById("log").innerHTML += text + "<br>";
}

/* ===== グローバル公開 ===== */
window.startBattle = startBattle;
