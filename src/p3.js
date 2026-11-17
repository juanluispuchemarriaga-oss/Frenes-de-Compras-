function droneU(dt){
if(!dr){const o=S.orders.find(o=>o.left<=0);if(o){dr={o,ph:0,t:0,f:new THREE.Vector3(R(-60,60),30,115)};DR.visible=true;pk.visible=true;DR.position.copy(dr.f)}}
if(dr){dr.t+=dt;const k=M.min(1,dr.t/(dr.ph==0?7:dr.ph==1?2:dr.ph==2?1:6));
if(dr.ph==0){DR.position.lerpVectors(dr.f,W,k);if(k>.75)setDoor(1);if(k>=1)nx()}
else if(dr.ph==1){DR.position.lerpVectors(W,I,k);if(k>=1){pk.visible=false;SFX.drop();drop(dr.o);nx()}}
else if(dr.ph==2){if(k>=1)nx()}
else{DR.position.lerpVectors(I,dr.f,k*k);if(k>.3)setDoor(0);if(k>=1){DR.visible=false;dr=null}}
rot.forEach(r=>r.rotation.y+=dt*40)}
if(dG)dG.gain.value=dr?M.max(0,1-DR.position.distanceTo(cam.position)/80)*.2:0}
function openBox(b){const t=(1.5+b.s*3)/(1+S.pick*.35);$('bw').style.display='block';busy={t:0,max:t,f:()=>{H.remove(b.mesh);S.boxes.splice(S.boxes.indexOf(b),1);S.items[b.id]=(S.items[b.id]||0)+1;let m=IT[b.id].name;if(!S.found[b.id]){S.found[b.id]=1;m='✨ NUEVO en el índice: '+m}if(b.m&&M.random()<.35){const c=M.round(R(50,300));S.money+=c;m+=' + bono '+fmt(c)}SFX.bell();toast(m)}}}
function pickUp(o){H.remove(o.mesh);S.placed.splice(S.placed.indexOf(o),1);S.items[o.id]=(S.items[o.id]||0)+1;SFX.pop();toast('Recogiste '+IT[o.id].name+' (colócalo desde 🎒 Almacén)')}
function place(id){if(!S.items[id])return;S.items[id]--;const p={id,x:cl(px-M.sin(yaw)*1.4,-7.4,7.4),z:cl(pz-M.cos(yaw)*1.4,-5.4,5.4),r:yaw};S.placed.push(p);mkP(p);SFX.pop();lapClose();toast('Colocaste '+IT[id].name+' · acércate para moverlo')}
function pickGem(z){const r=.8+.04*z+M.min(.1,S.pick*.008),w=GN.map((_,k)=>M.pow(r,k));let x=R(0,w.reduce((a,b)=>a+b));for(let k=0;k<30;k++){if((x-=w[k])<=0)return k}return 29}
const sleepF=()=>{if(S.t>=1140||S.t<360){mode='fx';$('flash').classList.add('on');SFX.whoosh();setTimeout(()=>{if(S.t>=1140)S.day++;S.t=420;S.hunger=M.max(10,S.hunger-15);S.thirst=M.max(10,S.thirst-15);offers();bonus();save(1);$('flash').classList.remove('on');mode='play';showDay()},1000)}else bad('Aún no tienes sueño: duerme de noche 🌙')};
const bonus=()=>{const b=20+S.day*5;S.money+=b;toast('🎁 Bono diario: '+fmt(b))};
const fridge=()=>{S.thirst=M.min(100,S.thirst+35);let m='💧 Bebiste agua';if(S.food>0){S.food--;S.hunger=M.min(100,S.hunger+30);m+=' y comiste 🍗 (quedan '+S.food+')'}else m+='. Sin comida: compra víveres en Temu';SFX.pop();toast(m)};
const sell=()=>{let t=0,n=0;for(const k in S.gems){t+=GV[k]*S.gems[k];n+=S.gems[k]}if(!n)return bad('No tienes gemas para vender');S.gems={};S.money+=t;S.sold+=t;SFX.coin();toast(`💰 Vendiste ${n} gemas por ${fmt(t)}`)};
const tv=()=>{SFX.tv();toast(P(['📺 Teletienda: ¡Compra 2 y llévate 3!','📺 Noticias: 100% de probabilidad de nubes','📺 Dibujos: las cajas bailarinas','📺 Anuncio: ¡Jade divino al 90% de descuento!']))};
function openLap(){if(!lidOpen){lidOpen=true;SFX.boot()}lapOpen=true;mode='ui';ovs('lap');lap()}
function lapClose(){lapOpen=false;if(mode=='ui')mode='play';ovs('')}
const INT=[{x:-6,z:-4,r:3.2,l:'Dormir',f:sleepF},{x:-7.2,z:-.5,r:2.3,l:'Refri',f:fridge},{x:-4,z:3,r:2,l:'Usar laptop',f:openLap},{x:7,z:3.8,r:2.4,l:'Máquina de gemas',f:sell},{x:5,z:-4.3,r:2.2,l:'Ver TV',f:tv}];
function near(){let b=null,bd=1e9;const c=INT.concat(S.boxes.map(o=>({x:o.x,z:o.z,r:1.4,l:'Abrir caja',f:()=>openBox(o)})),S.placed.map(o=>({x:o.x,z:o.z,r:1.3,l:'Recoger '+IT[o.id].name,f:()=>pickUp(o)})));
for(const o of c){const d=M.hypot(o.x-px,o.z-pz);if(d<o.r&&d<bd){bd=d;b=o}}return b}
const doAct=()=>{if(mode!='play'||busy)return;const o=near();if(o)o.f()};
// ===== LAPTOP UI =====
function card(id,o){const it=IT[id],p=o?M.round(it.price*(1-o.off)):it.price,e=eta(it,o);return`<div class=cd><b>${it.name}</b>${S.found[id]?' ✔':''}<br>${o?`<s>${fmt(it.price)}</s> -${M.round(o.off*100)}% `:''}${fmt(p)} · ⏱ ${e>=60?M.round(e/60)+' min':e+' s'}${o&&o.fast?' ⚡envío veloz':''}<br><button data-a=buy data-v=${id} data-o=${o?1:0}>Comprar</button></div>`}
function lap(){const L=$('lb'),sy=L.scrollTop;let h='';
if(tab==0){h+=`<b>⚡ Ofertas del día (💰 ${fmt(S.money)})</b>`;S.offers.forEach(o=>h+=card(o.id,o));
h+=`<div class=cd><b>🎁 Caja misteriosa</b> · ${fmt(150)}<br>Contenido aleatorio (¡puede traer bono!)<br><button data-a=mys>Comprar</button></div><div class=cd><b>⛏️ Pico nivel ${S.pick+1}</b> · ${fmt(pc())}<br>Rompe más rápido, abre cajas antes y mejora tu suerte<br><button data-a=pick>Mejorar</button></div><div class=cd><b>🥫 Víveres x5</b> · ${fmt(25)}<br><button data-a=food>Comprar</button></div><b>Catálogo</b>`;IT.forEach(i=>h+=card(i.id))}
else if(tab==1){h+=`<div class=cd>⛏️ Pico nivel ${S.pick+1} · Espacios ${S.jobs.length}/${1+(S.pick>>1)}</div>`;SZ.forEach((z,i)=>h+=`<div class=cd>🪨 Piedra ${z[0]} · ${fmt(z[1])}<br>Más grande = gemas más raras<br><button data-a=cut data-v=${i}>Romper</button></div>`);h+='<b>En proceso</b>';S.jobs.forEach(j=>h+=`<div class=cd>${SZ[j.s][0]} · ${M.ceil(j.left)}s<div class=pg><i style="width:${100-j.left/j.max*100}%"></i></div></div>`)}
else{h+=`<div class=cd>💰 ${fmt(S.money)} · Gastado ${fmt(S.spent)} · Vendido ${fmt(S.sold)} · Gemas rotas ${S.mined}</div><b>💎 Gemas (véndelas en la máquina)</b>`;GN.forEach((n,i)=>{if(S.gems[i])h+=`<div class=cd>${n} x${S.gems[i]} · ${fmt(GV[i])} c/u</div>`});h+='<b>🎒 Objetos</b>';IT.forEach(i=>{if(S.items[i.id]>0)h+=`<div class=cd>${i.name} x${S.items[i.id]}<br><button data-a=put data-v=${i.id}>Colocar</button></div>`});h+=`<div class=cd>📖 Índice ${Object.keys(S.found).length}/48<br>${IT.map(i=>S.found[i.id]?i.name:'???').join(' · ')}</div>`}
L.innerHTML=h;L.scrollTop=sy;document.querySelectorAll('#lw .tb [data-a=tab]').forEach((b,i)=>b.classList.toggle('s',i==tab))}
function act(a,v,o){
if(a=='tab')tab=v;
else if(a=='buy'){const it=IT[v],of=o?S.offers.find(x=>x.id==v):null,p=of?M.round(it.price*(1-of.off)):it.price;if(S.money<p)return bad('Dinero insuficiente');S.money-=p;S.spent+=p;S.orders.push({id:v,left:eta(it,of)});SFX.buy();toast('🛒 Pedido: '+it.name)}
else if(a=='mys'){if(S.money<150)return bad('Dinero insuficiente');S.money-=150;S.spent+=150;S.orders.push({id:M.random()*48|0,left:30+(M.random()*60|0),m:1});SFX.buy();toast('🎁 Caja misteriosa en camino')}
else if(a=='pick'){const c=pc();if(S.money<c)return bad('Dinero insuficiente');S.money-=c;S.pick++;SFX.coin();toast('⛏️ Pico nivel '+(S.pick+1))}
else if(a=='food'){if(S.money<25)return bad('Dinero insuficiente');S.money-=25;S.food+=5;SFX.buy();toast('🥫 +5 comidas en el refri')}
else if(a=='cut'){const z=SZ[v];if(S.jobs.length>=1+(S.pick>>1))return bad('Sin espacio: mejora el pico');if(S.money<z[1])return bad('Dinero insuficiente');S.money-=z[1];const t=5*(1+v*.9)/(1+S.pick*.8)*(S.hunger<20||S.thirst<20?1.5:1);S.jobs.push({g:pickGem(v),s:v,left:t,max:t});SFX.rock()}
else if(a=='put')return place(v);
lap()}
// ===== SIMULACIÓN =====
function sim(dt){S.t+=dt*3;if(S.t>=1440){S.t-=1440;S.day++;offers();bonus()}
S.hunger=M.max(0,S.hunger-dt*.12);S.thirst=M.max(0,S.thirst-dt*.18);S.orders.forEach(o=>o.left-=dt);droneU(dt);
for(let i=S.jobs.length-1;i>=0;i--){const j=S.jobs[i];j.left-=dt;if(j.left<=0){S.gems[j.g]=(S.gems[j.g]||0)+1;S.mined++;S.jobs.splice(i,1);SFX.gem();toast('💎 '+GN[j.g]+' ('+fmt(GV[j.g])+')')}}
if(busy){busy.t+=dt;$('bar').style.width=M.min(100,busy.t/busy.max*100)+'%';busy.k=(busy.k||0)+dt;if(busy.k>.35){busy.k=0;SFX.box()}if(busy.t>=busy.max){const f=busy.f;busy=null;$('bw').style.display='none';f()}}
