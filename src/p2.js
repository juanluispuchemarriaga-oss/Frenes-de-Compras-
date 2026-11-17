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
