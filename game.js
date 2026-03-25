/* ===== 軽量戦闘用設定 ===== */
let inBattle = false;
const enemyList = [
  {name:"SLIME", hp:30, atk:5, exp:10},
  {name:"GOBLIN", hp:50, atk:10, exp:20}
];

/* ===== 探索（簡易戦闘付き） ===== */
function exploreArea(){
    if(!p) return;
    if(inBattle) return alert("戦闘中は探索できません");

    explore++;
    if(explore > maxExplore) explore = maxExplore;

    // ランダムで敵と遭遇
    const encounter = Math.random() < 0.5; // 50%で遭遇
    if(encounter){
        const enemy = enemyList[Math.floor(Math.random()*enemyList.length)];
        startBattle(enemy);
    } else {
        alert(`${p.name}は安全に探索した！ 探索進捗: ${explore}/${maxExplore}`);
    }

    updateUI();
}

/* ===== 簡易戦闘 ===== */
function startBattle(enemy){
    inBattle = true;
    let php = p.hp;
    let ehp = enemy.hp;
    let logText = "";

    while(php > 0 && ehp > 0){
        ehp -= 10; // プレイヤー攻撃
        logText += `${p.name} attack! ${enemy.name}は${ehp>0?ehp:0}HP\n`;
        if(ehp <=0) break;

        php -= enemy.atk; // 敵攻撃
        logText += `${enemy.name} attack! ${p.name}は${php>0?php:0}HP\n`;
    }

    p.hp = php>0?php:0;
    inBattle = false;

    if(p.hp <=0){
        alert(logText + "敗北...\nHPを全回復");
        p.hp = p.maxhp;
    } else {
        p.exp += enemy.exp;
        alert(logText + "勝利!\nEXP+" + enemy.exp);
    }

    updateUI();
}

/* ===== グローバル公開 ===== */
window.exploreArea = exploreArea;
