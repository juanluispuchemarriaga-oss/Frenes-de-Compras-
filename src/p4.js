else if(a=='cut'){const z=SZ[v];if(S.jobs.length>=1+(S.pick>>1))return bad('Sin espacio: mejora el pico');if(S.money<z[1])return bad('Dinero insuficiente');S.money-=z[1];const t=5*(1+v*.9)/(1+S.pick*.8)*(S.hunger<20||S.thirst<20?1.5:1);S.jobs.push({g:pickGem(v),s:v,left:t,max:t});SFX.rock()}
else if(a=='put')return place(v);
lap()}
// ===== SIMULACIÓN =====
function sim(dt){if(autoUp>0&&(autoUp-=dt)<=0)standUp();if(fro&&M.hypot(px+7.2,pz+.5)>3.2){fro=0;SFX.fr()}S.t+=dt*3;if(S.t>=1440){S.t-=1440;S.day++;offers();bonus()}
S.hunger=M.max(0,S.hunger-dt*.12);S.thirst=M.max(0,S.thirst-dt*.18);S.orders.forEach(o=>o.left-=dt);droneU(dt);
for(let i=S.jobs.length-1;i>=0;i--){const j=S.jobs[i];j.left-=dt;if(j.left<=0){S.gems[j.g]=(S.gems[j.g]||0)+1;S.mined++;S.jobs.splice(i,1);SFX.gem();toast('💎 '+GN[j.g]+' ('+fmt(GV[j.g])+')')}}
if(busy){busy.t+=dt;$('bar').style.width=M.min(100,busy.t/busy.max*100)+'%';busy.k=(busy.k||0)+dt;if(busy.k>.35){busy.k=0;SFX.box()}if(busy.t>=busy.max){const f=busy.f;busy=null;$('bw').style.display='none';f()}}
if(lapOpen&&tab==1&&S.jobs.length){jt+=dt;if(jt>.5){jt=0;lap();SFX.rock()}}
as+=dt;if(as>30){as=0;save(1)}
hudT+=dt;if(hudT>.2){hudT=0;const hh=S.t/60|0,mi=S.t%60|0,dt2=new Date(Date.UTC(2031,2,13+S.day)).toLocaleDateString('es',{timeZone:'UTC',day:'numeric',month:'short',year:'numeric'});
$('st').textContent=`📅 ${dt2}  ⏰ ${hh}:${String(mi).padStart(2,'0')}\nDía ${S.day} · 💰 ${fmt(S.money)}\n🍗 ${S.hunger|0}%  💧 ${S.thirst|0}%  📦 ${S.orders.length}`;
const o=mode=='play'&&!busy?near():null,a=$('act');a.style.display=o?'block':'none';if(o)a.textContent='🖐 '+o.l}}
function move(dt){
let mx=(keys.KeyD?1:0)-(keys.KeyA?1:0)+jx,mz=(keys.KeyS?1:0)-(keys.KeyW?1:0)+jy;const l=M.hypot(mx,mz);if(l>1){mx/=l;mz/=l}
if(seat){if(l>.3||jumpQ)standUp();else{jumpQ=0;cam.position.set(px,seat=='bed'?1.35:1.3,pz);cam.rotation.set(pitch,yaw,0);return}}
const cr=keys.KeyC||keys.ShiftLeft||crT,c=M.cos(yaw),s=M.sin(yaw),k=(cr?1.7:3.3)*dt,vx=(mx*c+mz*s)*k,vz=(-mx*s+mz*c)*k;
if(!hit(px+vx,pz,py))px+=vx;if(!hit(px,pz+vz,py))pz+=vz;
const og=py<=gnd(px,pz,py)+.02&&vy<=0;if(jumpQ&&og&&!cr){vy=6;SFX.jump()}jumpQ=0;
vy-=14*dt;py+=vy*dt;const g=gnd(px,pz,py);if(py<=g&&vy<=0){if(vy<-5)SFX.land();py=g;vy=0}
if(py<-14)return die();
const mv=M.hypot(vx,vz);if(mv>.001&&og){bob+=dt*9;walk+=mv;if(walk>.85*(cr?.7:1)){walk=0;SFX.step(M.abs(px)<3&&M.abs(pz)<2?1:(M.abs(px)<1.5&&pz>4)||x2(px,pz)?2:0)}}
if(lidOpen&&!lapOpen&&M.hypot(px+4,pz-3)>3.4){lidOpen=false;SFX.lidc()}
eye+=((cr?1.05:1.65)-eye)*M.min(1,dt*10);
cam.position.set(px,py+eye+(mv>.001&&og?M.sin(bob)*.03:0),pz);cam.rotation.set(pitch,yaw,0)}
const x2=(x,z)=>M.abs(x)>8.1||M.abs(z)>6.1;
function menuF(dt){S.t=(S.t+dt*4)%1440;cam.position.set(-1.3+M.sin(T*.12)*.12,1.55,3.9);cam.lookAt(-4,1.2,3.7);
mt-=dt;if(mt<=0){const r=M.random();ms=ms=='type'?(r<.4?'sip':r<.7?'think':'type'):'type';mt=ms=='type'?R(4,9):ms=='sip'?3.4:R(1.5,3)}
const ty=ms=='type',e=M.min(1,dt*3);sipT+=((ms=='sip'?1:0)-sipT)*M.min(1,dt*2.2);
armR.position.set(.28,1.12+sipT*.3+(ty?M.sin(T*17)*.012:0),-.3+sipT*.12);armR.rotation.x=-sipT*1.1;armL.position.y=1.12+(ty?M.sin(T*14+1)*.014:0);
hd.position.y=1.5+M.sin(T*1.6)*.008+sipT*.03;hd.rotation.x+=((ms=='think'?.1:0)-sipT*.35-hd.rotation.x)*e;hd.rotation.y+=((ms=='think'?M.sin(T*.5)*.25:0)-hd.rotation.y)*e;
if(sipT>.9&&!sipF){SFX.sip();sipF=1}if(sipT<.3)sipF=0;
if(ty&&T>nk){nk=T+(M.random()<.15?R(.4,.9):R(.07,.2));SFX.key()}}
function extra(dt){FD.rotation.y+=((fro?1.9:0)-FD.rotation.y)*M.min(1,dt*5);
PL.forEach(l=>{const u=l.userData;l.rotation.x=M.sin(T*1.3+u.p)*.05*(.4+u.k);l.rotation.z=M.sin(T*.9+u.p*1.7)*.04*(.4+u.k)});
if(DR.visible){const n=NIGHT>.5;leds.forEach((l,i)=>{l.material.color.setHex(n?(i<2?0xff2222:0xffffff):0x2e8b3a);l.visible=n?M.sin(T*9+i*1.7)>-.2:true;l.scale.setScalar(n?1.6:.55)})}
aurT-=dt;if(aurT<=0){aurT=R(40,110);aurOn=M.random()<.5}const au=aM.uniforms;au.o.value+=((aurOn?NIGHT:0)-au.o.value)*M.min(1,dt*.4);au.t.value=T}
function loop(now){requestAnimationFrame(loop);const dt=M.min(.05,((now-last)||16)/1000);last=now;T+=dt;
clouds.forEach(g=>{g.position.x+=g.userData.v*dt;if(g.position.x>115)g.position.x=-115});
if(mode=='menu')menuF(dt);else if(mode!='pause'&&mode!='dead'){sim(dt);if(mode=='play')move(dt)}
lidG.rotation.x+=((lidOpen?-.3:1.55)-lidG.rotation.x)*M.min(1,dt*6);lidM.emissiveIntensity=lidOpen?.9:0;
const u=door.userData,df=u.t-u.o;u.o+=M.sign(df)*M.min(M.abs(df),dt*.8);door.position.x=u.o*2.05;tvM.emissive.setHSL((T*.1)%1,.8,.45);
env();extra(dt);rd.render(sc,cam)}
// ===== MENÚS Y GUARDADO =====
const ovs=id=>document.querySelectorAll('.ov').forEach(e=>e.classList.toggle('on',e.id==id));
const cont=()=>$('bc').style.display=localStorage.getItem('fc_save')?'':'none';
function save(q){try{localStorage.setItem('fc_save',JSON.stringify({S,px:seat?(seat=='bed'?-4.2:-3.2):px,pz:seat?(seat=='bed'?-3.3:4.6):pz,yaw},(k,v)=>k=='mesh'?undefined:v));if(!q)toast('💾 Partida guardada');cont()}catch(e){toast('No se pudo guardar')}}
function showDay(){SFX.susp();const d=$('day');d.textContent='Día '+S.day;d.style.opacity=1;setTimeout(()=>d.style.opacity=0,2200)}
function start(ld){initA();SFX.whoosh();$('flash').classList.add('on');setTimeout(()=>{clear();let d=null;try{d=ld&&JSON.parse(localStorage.getItem('fc_save'))}catch(e){}
seat=null;fro=0;if(d&&d.S){S=Object.assign(newS(),d.S);px=d.px;pz=d.pz;yaw=d.yaw;pitch=0;py=0;vy=0}else{S=newS();offers();sit('bed');autoUp=3.4}
S.boxes.forEach(mkB);S.placed.forEach(mkP);CH.visible=false;lidOpen=false;ovs('');$('hud').style.display='block';mode='play';$('flash').classList.remove('on');showDay()},900)}
function goMenu(){seat=null;fro=0;clear();S=newS();S.t=1140;dr=null;DR.visible=false;door.userData.t=0;busy=null;lapOpen=false;$('bw').style.display='none';CH.visible=true;lidOpen=true;$('hud').style.display='none';mode='menu';ovs('menu');cont()}
function pauseG(){if(mode=='play'){mode='pause';ovs('pause')}else if(mode=='pause'){mode='play';ovs('')}else if(mode=='ui')lapClose()}
$('bn').onclick=()=>start(0);$('bc').onclick=()=>start(1);$('bs').onclick=()=>{from='menu';ovs('set')};$('bb').onclick=()=>ovs(from);
$('pc').onclick=pauseG;$('pb').onclick=pauseG;$('ps').onclick=()=>save();$('pg').onclick=()=>{from='pause';ovs('set')};$('pm').onclick=()=>{save(1);goMenu()};
$('act').onclick=doAct;$('rb').onclick=()=>start(0);$('bj').onclick=()=>{jumpQ=1};$('bk').onclick=()=>{crT=!crT;$('bk').style.opacity=crT?1:.6};$('lx').onclick=lapClose;$('lw').onclick=e=>{const b=e.target.closest('[data-a]');if(b)act(b.dataset.a,+b.dataset.v,+b.dataset.o)};
$('rs').value=cfg.sens;$('rv').value=cfg.vol;$('rs').oninput=e=>{cfg.sens=+e.target.value;sv()};$('rv').oninput=e=>{cfg.vol=+e.target.value;if(mg)mg.gain.value=cfg.vol;sv()};
document.addEventListener('pointerdown',initA);document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('button'))SFX.click()});
// ===== CONTROLES =====
addEventListener('keydown',e=>{keys[e.code]=1;if(e.code=='KeyE')doAct();if(e.code=='Space'){jumpQ=1;e.preventDefault()}if(e.code=='Escape')pauseG()});addEventListener('keyup',e=>keys[e.code]=0);
const cv=rd.domElement;cv.addEventListener('click',()=>{if(mode=='play'&&!('ontouchstart' in window)&&cv.requestPointerLock)cv.requestPointerLock()});
addEventListener('mousemove',e=>{if(document.pointerLockElement&&mode=='play'){yaw-=e.movementX*.0022*cfg.sens;pitch=cl(pitch-e.movementY*.0022*cfg.sens,-1.4,1.4)}});
let tj=null,tl=null,j0=[0,0];const jb=$('jb'),jk=$('jk');
cv.addEventListener('touchstart',e=>{e.preventDefault();initA();for(const t of e.changedTouches){if(t.clientX<innerWidth/2&&tj==null){tj=t.identifier;j0=[t.clientX,t.clientY];jb.style.display='block';jb.style.left=t.clientX+'px';jb.style.top=t.clientY+'px'}else if(tl==null)tl={id:t.identifier,x:t.clientX,y:t.clientY}}},{passive:false});
cv.addEventListener('touchmove',e=>{e.preventDefault();for(const t of e.changedTouches){if(t.identifier==tj){jx=cl((t.clientX-j0[0])/50);jy=cl((t.clientY-j0[1])/50);jk.style.transform=`translate(${jx*30}px,${jy*30}px)`}else if(tl&&t.identifier==tl.id){yaw-=(t.clientX-tl.x)*.005*cfg.sens;pitch=cl(pitch-(t.clientY-tl.y)*.005*cfg.sens,-1.4,1.4);tl.x=t.clientX;tl.y=t.clientY}}},{passive:false});
const te=e=>{for(const t of e.changedTouches){if(t.identifier==tj){tj=null;jx=jy=0;jb.style.display='none';jk.style.transform=''}if(tl&&t.identifier==tl.id)tl=null}};cv.addEventListener('touchend',te);cv.addEventListener('touchcancel',te);
cont();requestAnimationFrame(loop);initA();setTimeout(()=>{$('logo').remove();SFX.boom()},3300);
  
