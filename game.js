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
