let towerFloor = 1;
let maxTowerFloor = 5;

const enemyTemplate = { name:"SLIME", hp:50, atk:10, exp:30 };

/* ===== 戦闘開始 ===== */
function startBattle(e = enemyTemplate){
    if(!p) return;
    inBattle = true;
    show("battle");

    const enemy = {...e};

    const pimgEl = document.getElementById("pimg");
    if(pimgEl) pimgEl.src = p.img;

    const pnameEl = document.getElementById("pname");
    if(pnameEl) pnameEl.innerText = p.name;

    const enameEl = document.getElementById("ename");
    if(enameEl) enameEl.innerText = enemy.name;

    let php = p.hp;
    let ehp = enemy.hp;

    updateHP(php, ehp, enemy.hp);

    const logEl = document.getElementById("log");
    if(logEl) logEl.innerHTML = "";

    log("BATTLE START!");

    const loop = setInterval(()=>{
        ehp -= 10;
        log(`${p.name} attack!`);

        if(ehp <= 0){
            clearInterval(loop);
            winBattle(enemy);
            return;
        }

        php -= enemy.atk;
        log("Enemy attack!");

        if(php <= 0){
            clearInterval(loop);
            loseBattle(enemy);
            return;
        }

        updateHP(php, ehp, enemy.hp);
    },800);
}

/* ===== 勝利 ===== */
function winBattle(enemy){
    inBattle = false;
    p.exp += enemy.exp;

    if(enemy.name.includes("TOWER")){
        towerFloor++;
        log("塔クリア！ " + towerFloor + "階へ");
        if(towerFloor > maxTowerFloor) maxTowerFloor = towerFloor;
    }

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
    const phpEl = document.getElementById("php");
    const ehpEl = document.getElementById("ehp");

    if(phpEl) phpEl.style.width = (php/p.maxhp)*100 + "%";
    if(ehpEl) ehpEl.style.width = (ehp/emax)*100 + "%";

    p.hp = php;
}

/* ===== ログ ===== */
function log(text){
    const logEl = document.getElementById("log");
    if(logEl) logEl.innerHTML += text + "<br>";
}

/* ===== グローバル公開 ===== */
window.startBattle = startBattle;
