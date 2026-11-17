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
