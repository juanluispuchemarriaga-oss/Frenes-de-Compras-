import * as THREE from 'three';
const $=i=>document.getElementById(i),M=Math,R=(a,b)=>a+M.random()*(b-a),P=a=>a[M.random()*a.length|0],cl=(v,a=-1,b=1)=>M.min(b,M.max(a,v)),fmt=n=>'$'+M.round(n).toLocaleString('es');
// ===== DATOS =====
const GN='Cuarzo Opaco,Jade Verdeniebla,Ágata Ceniza,Ónix Medianoche,Jaspe Carmesí,Lapislázuli Real,Ópalo Lunar,Amatista Tormenta,Citrino Solar,Turmalina Eclipse,Topacio Imperial,Aguamarina Abisal,Granate Dragón,Rubí Corazón de Lava,Zafiro Celestial,Esmeralda Eterna,Alejandrita Camaleón,Jade Emperador,Obsidiana del Vacío,Diamante Aurora,Larimar Marea,Painita Fantasma,Benitoíta Estelar,Tanzanita Cósmica,Rodonita Fénix,Cristal Vórtice,Estrella de Nova,Corazón de Galaxia,Lágrima de Titán,Jade Divino Primordial'.split(',');
const GV=GN.map((_,i)=>M.round(4*M.pow(1.45,i)));
const SZ=[['Chica',20],['Mediana',90],['Grande',350],['Colosal',1400]];
const NO='Lámpara,Taza,Almohada,Peluche,Reloj,Gorra,Zapatillas,Mochila,Guitarra,Planta,Cafetera,Cojín,Espejo,Robot,Sombrilla,Bufanda,Teclado,Altavoz,Cámara,Patineta,Tostadora,Cactus,Bicicleta,Dinosaurio'.split(','),AD='Neón,Gigante,Mini,Dorado,Inflable,Cuántico,Retro,Mágico,Ultra,Kawaii,Galáctico,Plegable'.split(',');
const IT=[];for(let i=0;i<48;i++)IT.push({id:i,name:NO[i%24]+' '+AD[(i+(i>23?5:0))%12],price:M.round((6+(i*37)%90)*(1+i*i/60)),t:i%3,c:new THREE.Color().setHSL((i*.137)%1,.65,.55),s:.3+((i*7)%10)/16});
const newS=()=>({money:80,day:1,t:420,gems:{},items:{},placed:[],boxes:[],orders:[],jobs:[],pick:0,hunger:80,thirst:80,food:3,found:{},offers:[],spent:0,sold:0,mined:0});
let cfg={sens:1,vol:.7};try{Object.assign(cfg,JSON.parse(localStorage.getItem('fc_cfg')))}catch(e){}
const sv=()=>localStorage.setItem('fc_cfg',JSON.stringify(cfg));
let S=newS(),px=-4.2,pz=-3.3,yaw=-2.36,pitch=0,mode='menu',busy=null,jx=0,jy=0,walk=0,bob=0,T=0,lapOpen=false,lidOpen=true,hudT=0,tab=0,dr=null,last=0,tt,jt=0,as=0,from='menu',nk=0,sipF=0;const keys={};S.t=1140;
const offers=()=>{S.offers=[];while(S.offers.length<4){const id=M.random()*48|0;if(!S.offers.some(o=>o.id==id))S.offers.push({id,off:+R(.25,.6).toFixed(2),fast:M.random()<.4})}};
const eta=(it,o)=>M.round(M.min(300,8+it.price*.06)*(o&&o.fast?.35:1)),pc=()=>M.round(120*M.pow(1.9,S.pick));
function toast(m){const e=$('toast');e.textContent=m;e.style.opacity=1;clearTimeout(tt);tt=setTimeout(()=>e.style.opacity=0,2400)}
const bad=m=>{SFX.err();toast(m)};
// ===== AUDIO (sintetizado) =====
let AC,mg,NB,dG;
const initA=()=>{if(AC){AC.resume();return}AC=new(window.AudioContext||window.webkitAudioContext)();mg=AC.createGain();mg.gain.value=cfg.vol;mg.connect(AC.destination);
NB=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=M.random()*2-1;
const s=AC.createBufferSource();s.buffer=NB;s.loop=true;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=380;f.Q.value=.6;const g=AC.createGain();g.gain.value=.14;s.connect(f);f.connect(g);g.connect(mg);s.start();
const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=.12;lg.gain.value=.07;l.connect(lg);lg.connect(g.gain);l.start();
const o=AC.createOscillator();o.type='sawtooth';o.frequency.value=95;dG=AC.createGain();dG.gain.value=0;o.connect(dG);dG.connect(mg);o.start()};
const tone=(f,d,ty='sine',v=.2,sl=0,dl=0)=>{if(!AC)return;const t=AC.currentTime+dl,o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(sl)o.frequency.exponentialRampToValueAtTime(M.max(20,f+sl),t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(mg);o.start(t);o.stop(t+d+.02)};
const noise=(d,fq,v=.2,ty='lowpass')=>{if(!AC)return;const s=AC.createBufferSource();s.buffer=NB;const f=AC.createBiquadFilter();f.type=ty;f.frequency.value=fq;const g=AC.createGain(),t=AC.currentTime;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(g);g.connect(mg);s.start(t,M.random(),d)};
const SFX={click:()=>tone(700,.05,'square',.06),buy:()=>{tone(520,.1,'triangle',.2);tone(820,.16,'triangle',.2,0,.09)},coin:()=>{tone(1200,.08,'square',.1);tone(1600,.2,'square',.1,0,.07)},err:()=>tone(150,.25,'sawtooth',.15),
step:s=>s==1?noise(.12,500,.3):s==2?noise(.07,2600,.3,'bandpass'):noise(.06,1300,.35),whoosh:()=>noise(.9,1200,.4,'bandpass'),door:()=>tone(120,.7,'sawtooth',.1,-60),box:()=>noise(.15,900,.3),
rock:()=>{noise(.08,700,.4);tone(110,.1,'square',.12)},gem:()=>[880,1100,1320,1760].forEach((f,i)=>tone(f,.25,'sine',.15,0,i*.08)),boot:()=>{tone(400,.15,'square',.08);tone(800,.2,'square',.08,0,.15)},
lidc:()=>noise(.1,300,.3),pop:()=>tone(900,.1,'triangle',.15,300),tv:()=>noise(.4,3000,.15,'highpass'),drop:()=>{noise(.2,300,.5);tone(80,.2,'sine',.3)},bell:()=>{tone(1000,.5,'sine',.2);tone(1500,.5,'sine',.1)},key:()=>noise(.03,3500,.12,'highpass'),sip:()=>noise(.3,800,.1,'bandpass')};
// ===== ESCENA =====
const rd=new THREE.WebGLRenderer({antialias:true});rd.setPixelRatio(M.min(devicePixelRatio,2));document.body.prepend(rd.domElement);
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(70,1,.1,400);cam.rotation.order='YXZ';
const rs=()=>{rd.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};addEventListener('resize',rs);rs();
sc.fog=new THREE.Fog(0x87ceeb,30,220);
const hemi=new THREE.HemisphereLight(0xffffff,0x665544,.6),sun=new THREE.DirectionalLight(0xffffff,1),moon=new THREE.DirectionalLight(0x6688ff,0),lampL=[new THREE.PointLight(0xffd9a0,0,14),new THREE.PointLight(0xffd9a0,0,14)];
lampL[0].position.set(-3,3,0);lampL[1].position.set(4,3,2);sc.add(hemi,sun,moon,...lampL);
const sk=new THREE.Color(),cD=new THREE.Color(0x8fd3ff),cN=new THREE.Color(0x050a1c),cS=new THREE.Color(0xff7a45);
const sm=new THREE.Mesh(new THREE.SphereGeometry(9,16,12),new THREE.MeshBasicMaterial({color:0xfff2b0,fog:false})),mm=new THREE.Mesh(new THREE.SphereGeometry(6,16,12),new THREE.MeshBasicMaterial({color:0xdde6ff,fog:false}));sc.add(sm,mm);
const sp=[];for(let i=0;i<700;i++){const v=new THREE.Vector3(R(-1,1),R(-.2,1),R(-1,1)).normalize().multiplyScalar(180);sp.push(v.x,v.y,v.z)}
const stG=new THREE.BufferGeometry();stG.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));
const stM=new THREE.PointsMaterial({color:0xffffff,size:2,fog:false,transparent:true,sizeAttenuation:false});sc.add(new THREE.Points(stG,stM));
const cm=new THREE.MeshLambertMaterial({color:0xffffff}),clouds=[];
for(let i=0;i<46;i++){const g=new THREE.Group(),n=3+(M.random()*4|0);for(let j=0;j<n;j++){const s=new THREE.Mesh(new THREE.SphereGeometry(R(3,7),10,8),cm);s.position.set(j*4-n*2,R(-1,1),R(-2,2));s.scale.y=.6;g.add(s)}
const an=R(0,6.28),r=R(28,100);g.position.set(M.cos(an)*r,R(-30,8),M.sin(an)*r);if(M.abs(g.position.z)<18&&g.position.y>-12)g.position.y=-12-R(0,15);g.userData.v=R(.3,1.2);clouds.push(g);sc.add(g)}
const base=new THREE.Mesh(new THREE.ConeGeometry(11,9,9),new THREE.MeshLambertMaterial({color:0x6b5a4a}));base.rotation.x=M.PI;base.position.y=-4.7;sc.add(base);
const grass=new THREE.Mesh(new THREE.CylinderGeometry(11,11,.4,24),new THREE.MeshLambertMaterial({color:0x4caf50}));grass.position.y=-.25;sc.add(grass);
for(let i=0;i<6;i++){const r=new THREE.Mesh(new THREE.DodecahedronGeometry(R(.8,2)),new THREE.MeshLambertMaterial({color:0x7a6a5a}));r.position.set(R(-16,16),R(-14,-6),R(-16,16));sc.add(r)}
const SK=cD.clone();
function env(){const a=(S.t/1440-.25)*M.PI*2,h=M.sin(a),d=cl((h+.15)/.4,0,1),du=M.max(0,1-M.abs(h)/.25);
sk.copy(cN).lerp(cD,d).lerp(cS,du*.55);sc.background=sk;sc.fog.color.copy(sk);
sun.position.set(M.cos(a)*100,h*100,30);moon.position.set(-M.cos(a)*100,-h*100,30);sm.position.copy(sun.position).multiplyScalar(1.4);mm.position.copy(moon.position).multiplyScalar(1.4);
sun.intensity=2.6*d;moon.intensity=1.1*(1-d);hemi.intensity=.35+1.1*d;lampL.forEach(l=>l.intensity=12+40*(1-d));stM.opacity=1-d;cm.color.setScalar(.35+.65*d)}
// ===== CASA =====
const H=new THREE.Group();sc.add(H);const C=[];
const mat=(c,o)=>new THREE.MeshStandardMaterial({color:c,roughness:.8,...o});
const bx=(w,h,d,c,x,y,z,col,o)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,o));m.position.set(x,y,z);H.add(m);if(col)C.push({x,z,w,d});return m};
const sh=(g,c,x,y,z,o)=>{const m=new THREE.Mesh(g,mat(c,o));m.position.set(x,y,z);H.add(m);return m};
bx(16,.2,12,0x9c6b3c,0,-.1,0);bx(16,.2,12,0xf2efe6,0,3.7,0);bx(.3,3.6,12,0xe8d9c4,-8,1.8,0);bx(.3,3.6,12,0xcfe0e6,8,1.8,0);
bx(7,3.6,.3,0xe8d9c4,-4.5,1.8,6);bx(7,3.6,.3,0xe8d9c4,4.5,1.8,6);bx(2,1,.3,0xe8d9c4,0,3.1,6);
bx(16,3.6,.1,0x9fd8ff,0,1.8,-6,0,{transparent:true,opacity:.15,roughness:.1});for(let x=-8;x<=8;x+=4)bx(.25,3.6,.3,0x2b2b35,x,1.8,-6);
const door=bx(2,2.6,.12,0x4b5568,0,1.3,6);door.userData={o:0,t:0};
const setDoor=t=>{if(door.userData.t!==t){door.userData.t=t;SFX.door()}};
bx(2,.02,.9,0x777788,0,.01,5.6);bx(6,.03,4,0xb03a6e,0,.015,0);bx(5,.04,3,0xf0c24b,0,.02,0);
bx(2.4,.6,3.6,0x5b3a29,-6,.3,-4,1);bx(2.2,.3,3.4,0xffffff,-6,.75,-4);bx(2.2,.1,2.4,0x3b82f6,-6,.95,-3.5);bx(1.6,.2,.7,0xfafafa,-6,1,-5.3);
bx(3,.6,.7,0x222222,5,.3,-5.4,1);const tvM=bx(2.6,1.5,.1,0x111111,5,1.45,-5.3,0,{emissive:0x4466ff,emissiveIntensity:.9}).material;
bx(3.2,.8,1.1,0xc0392b,5,.4,-2.6,1);bx(3.2,.9,.3,0xa93226,5,1.05,-2);
bx(3,.8,1.4,0x8d6e63,-4,.4,3,1);bx(.9,.04,.6,0x555566,-4,.82,3.05);bx(.7,.1,.7,0x333344,-4,.5,4.4,1);bx(.7,.8,.1,0x333344,-4,.9,4.75);
const lidG=new THREE.Group();lidG.position.set(-4,.84,2.75);H.add(lidG);const lidM=mat(0x222233,{emissive:0x2a8cff,emissiveIntensity:0});const lidS=new THREE.Mesh(new THREE.BoxGeometry(.9,.6,.04),lidM);lidS.position.y=.3;lidG.add(lidS);lidG.rotation.x=-.3;
bx(1.2,2,1.1,0xf5f5f5,-7.2,1,-.5,1);bx(.05,.6,.05,0x888888,-6.6,1.4,-.1);
bx(1.3,1.8,1.3,0x2e7d32,7,.9,3.8,1);bx(.1,.4,1,0xffe066,6.33,1.5,3.8,0,{emissive:0xffcc00,emissiveIntensity:1});
bx(.5,2.4,3,0x6d4c41,-7.7,1.2,3.8,1);for(let i=0;i<12;i++)bx(.3,.4,.2,new THREE.Color().setHSL(i/12,.6,.5),-7.45,.5+(i%4)*.6,2.7+(i/4|0)*.9);
for(const[x,z]of[[7.2,-5.2],[7.2,.5],[2,5.4]]){sh(new THREE.CylinderGeometry(.3,.22,.5,10),0x8d5524,x,.25,z);sh(new THREE.SphereGeometry(.5,10,8),0x2e9e4f,x,.95,z)}
sh(new THREE.CylinderGeometry(.04,.04,1.8,6),0x444444,3.2,.9,1.6);sh(new THREE.SphereGeometry(.3,12,10),0xffe9b0,3.2,1.9,1.6,{emissive:0xffcc66,emissiveIntensity:1});
for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.9),mat(new THREE.Color().setHSL(i*.3,.7,.55)));m.position.set(7.83,1.9,-3+i*2.2);m.rotation.y=-M.PI/2;H.add(m)}
// personaje del lobby (rostro borroso)
const CH=new THREE.Group();CH.position.set(-4,0,4.4);H.add(CH);
const mk=(g,c,x,y,z,p=CH,o)=>{const m=new THREE.Mesh(g,mat(c,o));m.position.set(x,y,z);p.add(m);return m};
mk(new THREE.BoxGeometry(.5,.7,.3),0x3b7dd8,0,1,0);mk(new THREE.BoxGeometry(.45,.18,.6),0x2b2f45,0,.58,-.3);mk(new THREE.BoxGeometry(.45,.5,.2),0x2b2f45,0,.3,-.6);
const hd=mk(new THREE.SphereGeometry(.17,16,12),0xddc2aa,0,1.5,0,CH,{transparent:true,opacity:.55});mk(new THREE.SphereGeometry(.24,16,12),0xddc2aa,0,1.5,0,CH,{transparent:true,opacity:.2});
const armL=mk(new THREE.BoxGeometry(.12,.12,.5),0x3b7dd8,-.28,1.12,-.3),armR=mk(new THREE.BoxGeometry(.12,.12,.5),0x3b7dd8,.28,1.12,-.3);mk(new THREE.CylinderGeometry(.05,.05,.1,10),0xffffff,0,.1,-.28,armR);
// dron
const DR=new THREE.Group();DR.visible=false;sc.add(DR);const rot=[];
[[-.4,-.4],[.4,-.4],[-.4,.4],[.4,.4]].forEach(([x,z])=>{const r=new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,.02,12),new THREE.MeshBasicMaterial({color:0x99ccff,transparent:true,opacity:.6}));r.position.set(x,.12,z);DR.add(r);rot.push(r)});
DR.add(new THREE.Mesh(new THREE.BoxGeometry(.7,.18,.7),mat(0x333844)));const pk=new THREE.Mesh(new THREE.BoxGeometry(.5,.4,.5),mat(0xc89b5c));pk.position.y=-.35;DR.add(pk);
// ===== LÓGICA =====
const hit=(x,z)=>M.abs(x)>7.6||M.abs(z)>5.6||C.some(o=>M.abs(x-o.x)<o.w/2+.3&&M.abs(z-o.z)<o.d/2+.3);
const W=new THREE.Vector3(0,1.8,9),I=new THREE.Vector3(0,1.8,5.2);
function mkB(b){const s=.4+M.min(.5,IT[b.id].price/900),m=new THREE.Mesh(new THREE.BoxGeometry(s,s*.8,s),mat(b.m?0x8b5cf6:0xc89b5c));m.position.set(b.x,s*.4,b.z);m.add(new THREE.Mesh(new THREE.BoxGeometry(s*.2,s*.81,s*1.02),mat(0xeeeeee)));H.add(m);b.mesh=m;b.s=s}
function mkP(p){const it=IT[p.id],g=it.t==0?new THREE.BoxGeometry(it.s,it.s,it.s):it.t==1?new THREE.SphereGeometry(it.s/2,14,10):new THREE.CylinderGeometry(it.s/2.5,it.s/2.5,it.s,14),m=new THREE.Mesh(g,mat(it.c));m.position.set(p.x,it.s/2,p.z);m.rotation.y=p.r;H.add(m);p.mesh=m}
const clear=()=>S.boxes.concat(S.placed).forEach(o=>o.mesh&&H.remove(o.mesh));
function drop(o){S.orders.splice(S.orders.indexOf(o),1);const n=S.boxes.length,b={id:o.id,m:o.m,x:-2.6+(n%6),z:4.9-((n/6|0)%3)*.9};S.boxes.push(b);mkB(b);toast('📦 ¡Llegó tu pedido!')}
const nx=()=>{dr.ph++;dr.t=0};
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
if(busy){busy.t+=dt;$('
