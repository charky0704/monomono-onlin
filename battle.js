let inBattle = false;

const enemy = { name:"SLIME", hp:50, atk:10, exp:30 };

function startBattle(){
  if(!player || !currentEnemy) return;

  show("battle");

  let php = player.hp;
  let ehp = currentEnemy.hp;

  log(`${currentEnemy.name} が現れた！`);

  const loop = setInterval(() => {

    // プレイヤー攻撃
    ehp -= 10;
    log(`${player.name}の攻撃！`);

    if(ehp <= 0){
      clearInterval(loop);
      winBattle();
      return;
    }

    // 敵攻撃
    php -= currentEnemy.atk;
    log(`敵の攻撃！`);

    if(php <= 0){
      clearInterval(loop);
      loseBattle();
      return;
    }

  }, 800);
}

  inBattle = true;

  const enemy = currentEnemy;

  document.getElementById("pimg").src = player.img;
  document.getElementById("pname").innerText = player.name;
  document.getElementById("ename").innerText = enemy.name;

  let php = player.hp;
  let ehp = enemy.hp;

  updateHP(php, ehp, enemy.hp);
  log("BATTLE START!");

  const loop = setInterval(()=>{
    ehp -= 10;
    log(player.name+" attack!");
    if(ehp <=0){ clearInterval(loop); winBattle(); return; }

    php -= enemy.atk;
    log("Enemy attack!");
    if(php <=0){ clearInterval(loop); loseBattle(); return; }

    updateHP(php, ehp, enemy.hp);
  }, 800);
}

function updateHP(php, ehp, emax){
  document.getElementById("php").style.width = (php/p.maxhp*100)+"%";
  document.getElementById("ehp").style.width = (ehp/emax*100)+"%";
  p.hp = php;
}

function log(text){ document.getElementById("log").innerHTML += text+"<br>"; }

function winBattle(){ alert("勝利！"); inBattle=false; }
function loseBattle(){ alert("敗北"); inBattle=false; }
window.startBattle = startBattle;
