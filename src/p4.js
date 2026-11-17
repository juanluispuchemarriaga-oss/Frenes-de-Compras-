if(lapOpen&&tab==1&&S.jobs.length){jt+=dt;if(jt>.5){jt=0;lap();SFX.rock()}}
as+=dt;if(as>30){as=0;save(1)}
hudT+=dt;if(hudT>.2){hudT=0;const hh=S.t/60|0,mi=S.t%60|0,dt2=new Date(Date.UTC(2031,2,13+S.day)).toLocaleDateString('es',{timeZone:'UTC',day:'numeric',month:'short',year:'numeric'});
$('st').textContent=`📅 ${dt2}  ⏰ ${hh}:${String(mi).padStart(2,'0')}\nDía ${S.day} · 💰 ${fmt(S.money)}\n🍗 ${S.hunger|0}%  💧 ${S.thirst|0}%  📦 ${S.orders.length}`;
const o=mode=='play'&&!busy?near():null,a=$('act');a.style.display=o?'block':'none';if(o)a.textContent='🖐 '+o.l}}
function move(dt){let mx=(keys.KeyD?1:0)-(keys.KeyA?1:0)+jx,mz=(keys.KeyS?1:0)-(keys.KeyW?1:0)+jy;const l=M.hypot(mx,mz);if(l>1){mx/=l;mz/=l}
const c=M.cos(yaw),s=M.sin(yaw),k=3.3*dt,vx=(mx*c+mz*s)*k,vz=(-mx*s+mz*c)*k;if(!hit(px+vx,pz))px+=vx;if(!hit(px,pz+vz))pz+=vz;
const mv=M.hypot(vx,vz);if(mv>.001){bob+=dt*9;walk+=mv;if(walk>.85){walk=0;SFX.step(M.abs(px)<3&&M.abs(pz)<2?1:M.abs(px)<1.5&&pz>4?2:0)}}
if(lidOpen&&!lapOpen&&M.hypot(px+4,pz-3)>3.4){lidOpen=false;SFX.lidc()}
cam.position.set(px,1.65+(mv>.001?M.sin(bob)*.03:0),pz);cam.rotation.set(pitch,yaw,0)}
function menuF(dt){S.t=(S.t+dt*4)%1440;cam.position.set(-1.3,1.55,3.9);cam.lookAt(-4,1.2,3.7);
armL.position.y=1.12+M.sin(T*19)*.02;const s=M.max(0,M.sin(T*.7));armR.position.y=1.12+s*.3;armR.rotation.x=-s*.8;hd.position.y=1.5+s*.02;
if(s>.9&&!sipF){SFX.sip();sipF=1}if(s<.2)sipF=0;if(T>nk){nk=T+R(.07,.22);SFX.key()}}
function loop(now){requestAnimationFrame(loop);const dt=M.min(.05,((now-last)||16)/1000);last=now;T+=dt;
clouds.forEach(g=>{g.position.x+=g.userData.v*dt;if(g.position.x>115)g.position.x=-115});
if(mode=='menu')menuF(dt);else if(mode!='pause'){sim(dt);if(mode=='play')move(dt)}
lidG.rotation.x+=((lidOpen?-.3:1.55)-lidG.rotation.x)*M.min(1,dt*6);lidM.emissiveIntensity=lidOpen?.9:0;
const u=door.userData,df=u.t-u.o;u.o+=M.sign(df)*M.min(M.abs(df),dt*.8);door.position.x=u.o*2.05;tvM.emissive.setHSL((T*.1)%1,.8,.45);
env();rd.render(sc,cam)}
// ===== MENÚS Y GUARDADO =====
const ovs=id=>document.querySelectorAll('.ov').forEach(e=>e.classList.toggle('on',e.id==id));
const cont=()=>$('bc').style.display=localStorage.getItem('fc_save')?'':'none';
function save(q){try{localStorage.setItem('fc_save',JSON.stringify({S,px,pz,yaw},(k,v)=>k=='mesh'?undefined:v));if(!q)toast('💾 Partida guardada');cont()}catch(e){toast('No se pudo guardar')}}
function showDay(){const d=$('day');d.textContent='Día '+S.day;d.style.opacity=1;setTimeout(()=>d.style.opacity=0,2200)}
function start(ld){initA();SFX.whoosh();$('flash').classList.add('on');setTimeout(()=>{clear();let d=null;try{d=ld&&JSON.parse(localStorage.getItem('fc_save'))}catch(e){}
if(d&&d.S){S=Object.assign(newS(),d.S);px=d.px;pz=d.pz;yaw=d.yaw}else{S=newS();offers();px=-4.2;pz=-3.3;yaw=-2.36}
pitch=0;S.boxes.forEach(mkB);S.placed.forEach(mkP);CH.visible=false;lidOpen=false;ovs('');$('hud').style.display='block';mode='play';$('flash').classList.remove('on');showDay()},900)}
function goMenu(){clear();S=newS();S.t=1140;dr=null;DR.visible=false;door.userData.t=0;busy=null;lapOpen=false;$('bw').style.display='none';CH.visible=true;lidOpen=true;$('hud').style.display='none';mode='menu';ovs('menu');cont()}
function pauseG(){if(mode=='play'){mode='pause';ovs('pause')}else if(mode=='pause'){mode='play';ovs('')}else if(mode=='ui')lapClose()}
$('bn').onclick=()=>start(0);$('bc').onclick=()=>start(1);$('bs').onclick=()=>{from='menu';ovs('set')};$('bb').onclick=()=>ovs(from);
$('pc').onclick=pauseG;$('pb').onclick=pauseG;$('ps').onclick=()=>save();$('pg').onclick=()=>{from='pause';ovs('set')};$('pm').onclick=()=>{save(1);goMenu()};
$('act').onclick=doAct;$('lx').onclick=lapClose;$('lw').onclick=e=>{const b=e.target.closest('[data-a]');if(b)act(b.dataset.a,+b.dataset.v,+b.dataset.o)};
$('rs').value=cfg.sens;$('rv').value=cfg.vol;$('rs').oninput=e=>{cfg.sens=+e.target.value;sv()};$('rv').oninput=e=>{cfg.vol=+e.target.value;if(mg)mg.gain.value=cfg.vol;sv()};
document.addEventListener('pointerdown',initA);document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('button'))SFX.click()});
// ===== CONTROLES =====
addEventListener('keydown',e=>{keys[e.code]=1;if(e.code=='KeyE')doAct();if(e.code=='Escape')pauseG()});addEventListener('keyup',e=>keys[e.code]=0);
const cv=rd.domElement;cv.addEventListener('click',()=>{if(mode=='play'&&!('ontouchstart' in window)&&cv.requestPointerLock)cv.requestPointerLock()});
addEventListener('mousemove',e=>{if(document.pointerLockElement&&mode=='play'){yaw-=e.movementX*.0022*cfg.sens;pitch=cl(pitch-e.movementY*.0022*cfg.sens,-1.4,1.4)}});
let tj=null,tl=null,j0=[0,0];const jb=$('jb'),jk=$('jk');
cv.addEventListener('touchstart',e=>{e.preventDefault();initA();for(const t of e.changedTouches){if(t.clientX<innerWidth/2&&tj==null){tj=t.identifier;j0=[t.clientX,t.clientY];jb.style.display='block';jb.style.left=t.clientX+'px';jb.style.top=t.clientY+'px'}else if(tl==null)tl={id:t.identifier,x:t.clientX,y:t.clientY}}},{passive:false});
cv.addEventListener('touchmove',e=>{e.preventDefault();for(const t of e.changedTouches){if(t.identifier==tj){jx=cl((t.clientX-j0[0])/50);jy=cl((t.clientY-j0[1])/50);jk.style.transform=`translate(${jx*30}px,${jy*30}px)`}else if(tl&&t.identifier==tl.id){yaw-=(t.clientX-tl.x)*.005*cfg.sens;pitch=cl(pitch-(t.clientY-tl.y)*.005*cfg.sens,-1.4,1.4);tl.x=t.clientX;tl.y=t.clientY}}},{passive:false});
const te=e=>{for(const t of e.changedTouches){if(t.identifier==tj){tj=null;jx=jy=0;jb.style.display='none';jk.style.transform=''}if(tl&&t.identifier==tl.id)tl=null}};cv.addEventListener('touchend',te);cv.addEventListener('touchcancel',te);
cont();requestAnimationFrame(loop);
