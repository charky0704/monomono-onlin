let inBattle = false;

const enemy = { name:"SLIME", hp:50, atk:10, exp:30 };

function startBattle(){
  if(!p) return;
  inBattle = true;
  show("battle");

  document.getElementById("pimg").src = p.img;
  document.getElementById("pname").innerText = p.name;
  document.getElementById("ename").innerText = enemy.name;

  let php = p.hp;
  let ehp = enemy.hp;

  updateHP(php, ehp, enemy.hp);
  log("BATTLE START!");

  const loop = setInterval(()=>{
    ehp -= 10;
    log(p.name+" attack!");
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
