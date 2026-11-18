// ===== CASA =====
const H=new THREE.Group();sc.add(H);const C=[];
const mat=(c,o)=>new THREE.MeshStandardMaterial({color:c,roughness:.8,...o});
const bx=(w,h,d,c,x,y,z,col,o)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,o));m.position.set(x,y,z);H.add(m);if(col)C.push({x,z,w,d,h:y+h/2});return m};
const sh=(g,c,x,y,z,o)=>{const m=new THREE.Mesh(g,mat(c,o));m.position.set(x,y,z);H.add(m);return m};
bx(16,.2,12,0x9c6b3c,0,-.1,0);bx(16,.2,12,0xf2efe6,0,3.7,0);bx(.3,3.6,12,0xe8d9c4,-8,1.8,0);bx(.3,3.6,12,0xcfe0e6,8,1.8,0);
bx(7,3.6,.3,0xe8d9c4,-4.5,1.8,6);bx(7,3.6,.3,0xe8d9c4,4.5,1.8,6);bx(2,1,.3,0xe8d9c4,0,3.1,6);
bx(16,3.6,.1,0x9fd8ff,0,1.8,-6,0,{transparent:true,opacity:.15,roughness:.1});for(let x=-8;x<=8;x+=4)bx(.25,3.6,.3,0x2b2b35,x,1.8,-6);
const door=bx(2,2.6,.12,0x4b5568,0,1.3,6);door.userData={o:0,t:0};
[[-8,0,.3,12],[8,0,.3,12],[0,-6,16,.3],[-4.5,6,7,.3],[4.5,6,7,.3]].forEach(([x,z,w,d])=>C.push({x,z,w,d,h:9}));const doorC={x:0,z:6,w:2,d:.3,h:9};C.push(doorC);
const setDoor=t=>{if(door.userData.t===t||(!t&&M.hypot(px,pz-6)<1.4))return;door.userData.t=t;doorC.h=t?0:9;SFX.door()};
bx(2,.02,.9,0x777788,0,.01,5.6);bx(6,.03,4,0xb03a6e,0,.015,0);bx(5,.04,3,0xf0c24b,0,.02,0);
bx(2.4,.6,3.6,0x5b3a29,-6,.3,-4,1);bx(2.2,.3,3.4,0xffffff,-6,.75,-4);bx(2.2,.1,2.4,0x3b82f6,-6,.95,-3.5);bx(1.6,.2,.7,0xfafafa,-6,1,-5.3);
bx(3,.6,.7,0x222222,5,.3,-5.4,1);const tvM=bx(2.6,1.5,.1,0x111111,5,1.45,-5.3,0,{emissive:0x4466ff,emissiveIntensity:.9}).material;
bx(3.2,.8,1.1,0xc0392b,5,.4,-2.6,1);bx(3.2,.9,.3,0xa93226,5,1.05,-2);
bx(3,.8,1.4,0x8d6e63,-4,.4,3,1);bx(.9,.04,.6,0x555566,-4,.82,3.05);bx(.7,.1,.7,0x333344,-4,.5,4.4,1);bx(.7,.8,.1,0x333344,-4,.9,4.75);
const lidG=new THREE.Group();lidG.position.set(-4,.84,2.75);H.add(lidG);const lidM=mat(0x222233,{emissive:0x2a8cff,emissiveIntensity:0});const lidS=new THREE.Mesh(new THREE.BoxGeometry(.9,.6,.04),lidM);lidS.position.y=.3;lidG.add(lidS);lidG.rotation.x=-.3;
const FD=new THREE.Group(),frI=new THREE.Group();FD.position.set(-6.62,1,-1.03);H.add(FD,frI);C.push({x:-7.2,z:-.5,w:1.2,d:1.1,h:2});
bx(.1,2,1.1,0xf5f5f5,-7.75,1,-.5);bx(1.2,2,.08,0xf5f5f5,-7.2,1,-1.01);bx(1.2,2,.08,0xf5f5f5,-7.2,1,.01);bx(1.2,.08,1.1,0xf5f5f5,-7.2,1.96,-.5);bx(1.2,.1,1.1,0xf5f5f5,-7.2,.05,-.5);
for(const y of[.55,1,1.45])bx(1.1,.03,1,0xbfe3f2,-7.2,y,-.5,0,{transparent:true,opacity:.5});bx(.05,.05,.9,0xffffff,-7.7,1.9,-.5,0,{emissive:0xffffff,emissiveIntensity:2});
const fdm=new THREE.Mesh(new THREE.BoxGeometry(.06,1.9,1.05),mat(0xf5f5f5));fdm.position.set(0,0,.52);FD.add(fdm);const fdh=new THREE.Mesh(new THREE.BoxGeometry(.05,.5,.05),mat(0x888888));fdh.position.set(.06,.2,.9);FD.add(fdh);
bx(1.3,1.8,1.3,0x2e7d32,7,.9,3.8,1);bx(.1,.4,1,0xffe066,6.33,1.5,3.8,0,{emissive:0xffcc00,emissiveIntensity:1});
bx(.5,2.4,3,0x6d4c41,-7.7,1.2,3.8,1);for(let i=0;i<12;i++)bx(.3,.4,.2,new THREE.Color().setHSL(i/12,.6,.5),-7.45,.5+(i%4)*.6,2.7+(i/4|0)*.9);
const PL=[];function plant(x,z,s=1){const g=new THREE.Group();g.position.set(x,.5,z);g.scale.setScalar(s);H.add(g);sh(new THREE.CylinderGeometry(.3,.22,.5,12),0x8d5524,x,.25,z);sh(new THREE.TorusGeometry(.3,.03,6,14),0x6d4018,x,.5,z).rotation.x=M.PI/2;
for(let i=0;i<16;i++){const t=i/16,l=new THREE.Group();l.rotation.y=i*2.4;l.userData={p:R(0,6),k:t};const lf=new THREE.Mesh(new THREE.SphereGeometry(.3,8,6),mat(new THREE.Color().setHSL(.3+R(-.03,.03),.55,.28+t*.15)));lf.scale.set(1,.08,.4);lf.position.set(.3+t*.15,.15+t*.55,0);lf.rotation.z=.5+t*.5;l.add(lf);g.add(l);PL.push(l)}}
for(const[x,z,k]of[[7.2,-5.2,1],[7.2,.5,1],[2,5.4,.9],[9.3,3,1.3],[-9.2,-3,1.3],[3.5,9.2,1.2]])plant(x,z,k);
const dk2=new THREE.Mesh(new THREE.CylinderGeometry(10.8,10.8,.1,48),mat(0x9c8a74));dk2.position.y=-.07;sc.add(dk2);
const post=new THREE.InstancedMesh(new THREE.CylinderGeometry(.05,.05,1,6),mat(0xe8e0d0),48),dm=new THREE.Object3D();
for(let i=0;i<48;i++){const a=i/48*M.PI*2;dm.position.set(M.cos(a)*10.2,.5,M.sin(a)*10.2);dm.updateMatrix();post.setMatrixAt(i,dm.matrix)}sc.add(post);
for(const y of[.95,.5]){const r=new THREE.Mesh(new THREE.TorusGeometry(10.2,.04,6,96),mat(0xe8e0d0));r.rotation.x=M.PI/2;r.position.y=y;sc.add(r)}

for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.9),mat(new THREE.Color().setHSL(i*.3,.7,.55)));m.position.set(7.83,1.9,-3+i*2.2);m.rotation.y=-M.PI/2;H.add(m)}
bx(2.5,1.3,.12,0x4a2f20,-6,.8,-5.85);bx(.5,.6,.5,0x6d4c41,-4.5,.3,-5.5,1);sh(new THREE.SphereGeometry(.12,10,8),0xffe9b0,-4.5,.75,-5.5,{emissive:0xffcc66,emissiveIntensity:1.5});
bx(.6,.45,.2,0xf1c40f,4,.85,-2.3);bx(.6,.45,.2,0x3498db,6,.85,-2.3);bx(2.8,1.7,.08,0x0b0b0b,5,1.45,-5.36);bx(.3,.8,.3,0x1a1a1a,3.2,.4,-5.4,1);bx(.3,.8,.3,0x1a1a1a,6.8,.4,-5.4,1);
for(let i=0;i<5;i++)bx(.15,.045,3,0xffffff,-2+i,.025,0);bx(.05,.12,12,0xffffff,-7.82,.06,0);bx(.05,.12,12,0xffffff,7.82,.06,0);
sh(new THREE.CylinderGeometry(.05,.05,.1,10),0xffffff,-3.1,.87,3.2);bx(.3,.02,.22,0x2c3e50,-4.9,.82,3.2);bx(1.2,3.4,.1,0xb23a48,-7.3,1.8,-5.7);bx(1.2,3.4,.1,0xb23a48,7.3,1.8,-5.7);
sh(new THREE.CylinderGeometry(.35,.35,.05,20),0xffffff,-7.8,2.6,-2.5).rotation.z=M.PI/2;
// personaje del lobby (rostro borroso)
const CH=new THREE.Group();CH.position.set(-4,0,4.4);H.add(CH);
const mk=(g,c,x,y,z,p=CH,o)=>{const m=new THREE.Mesh(g,mat(c,o));m.position.set(x,y,z);p.add(m);return m};
mk(new THREE.BoxGeometry(.5,.7,.3),0x3b7dd8,0,1,0);mk(new THREE.BoxGeometry(.45,.18,.6),0x2b2f45,0,.58,-.3);mk(new THREE.BoxGeometry(.45,.5,.2),0x2b2f45,0,.3,-.6);
const hd=new THREE.Group();hd.position.set(0,1.5,0);CH.add(hd);mk(new THREE.SphereGeometry(.17,16,12),0xddc2aa,0,0,0,hd,{transparent:true,opacity:.55});mk(new THREE.SphereGeometry(.24,16,12),0xddc2aa,0,0,0,hd,{transparent:true,opacity:.2});mk(new THREE.SphereGeometry(.18,12,8,0,M.PI*2,0,M.PI/2),0x2a2118,0,.02,0,hd);
const armL=mk(new THREE.BoxGeometry(.12,.12,.5),0x3b7dd8,-.28,1.12,-.3),armR=mk(new THREE.BoxGeometry(.12,.12,.5),0x3b7dd8,.28,1.12,-.3);mk(new THREE.CylinderGeometry(.05,.05,.1,10),0xffffff,0,.1,-.28,armR);
// dron
const DR=new THREE.Group();DR.visible=false;sc.add(DR);const rot=[],leds=[];
const dk=(g,c,x,y,z,o)=>{const m=new THREE.Mesh(g,mat(c,o));m.position.set(x,y,z);DR.add(m);return m};
dk(new THREE.SphereGeometry(.3,14,10),0x39414f,0,0,0).scale.set(1,.5,1.1);dk(new THREE.SphereGeometry(.09,10,8),0x111111,0,-.08,-.3);
[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{dk(new THREE.BoxGeometry(.7,.04,.05),0x2a303b,a*.3,0,b*.3).rotation.y=M.atan2(-b,a);dk(new THREE.CylinderGeometry(.07,.07,.1,10),0x555d6e,a*.5,.04,b*.5);
const rt=new THREE.Group();rt.position.set(a*.5,.12,b*.5);DR.add(rt);for(let k=0;k<2;k++){const bl=new THREE.Mesh(new THREE.BoxGeometry(.5,.01,.06),new THREE.MeshBasicMaterial({color:0x99aabb,transparent:true,opacity:.55}));bl.rotation.y=k*M.PI/2;rt.add(bl)}rot.push(rt);
const l=new THREE.Mesh(new THREE.SphereGeometry(.035,8,6),new THREE.MeshBasicMaterial({color:0x2e8b3a}));l.position.set(a*.5,-.02,b*.5);DR.add(l);leds.push(l);dk(new THREE.CylinderGeometry(.015,.015,.2,5),0x222222,a*.22,-.17,b*.22)});
const pk=dk(new THREE.BoxGeometry(.5,.4,.5),0xc89b5c,0,-.4,0);pk.add(new THREE.Mesh(new THREE.BoxGeometry(.1,.41,.52),mat(0xeeeeee)));
// auroras
const aM=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,uniforms:{t:{value:0},o:{value:0}},
vertexShader:'varying vec2 u;uniform float t;void main(){u=uv;vec3 p=position;p.z+=sin(p.x*.04+t)*10.;p.y+=sin(p.x*.07+t*.7)*4.;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}',
fragmentShader:'varying vec2 u;uniform float t,o;void main(){float a=o*smoothstep(0.,.2,u.y)*(1.-u.y)*(.55+.45*sin(u.x*30.+t*1.5));gl_FragColor=vec4(mix(vec3(.1,1.,.5),vec3(.6,.2,.9),u.y),a);}'});
for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(220,60,48,1),aM),an=i*2.1+.5;m.position.set(M.cos(an)*140,55,M.sin(an)*140);m.lookAt(0,40,0);sc.add(m)}
// lámparas colgantes
function pend(x,z){const g=new THREE.Group();g.position.set(x,0,z);H.add(g);mk(new THREE.CylinderGeometry(.015,.015,1,6),0x222222,0,3.2,0,g);mk(new THREE.ConeGeometry(.45,.4,18,1,true),0xf2c27a,0,2.6,0,g,{side:THREE.DoubleSide});
mk(new THREE.SphereGeometry(.1,10,8),0xfff1c0,0,2.55,0,g,{emissive:0xffd27a,emissiveIntensity:2});mk(new THREE.TorusGeometry(.45,.015,6,18),0x8a6a2a,0,2.4,0,g).rotation.x=M.PI/2}
[[-3,0],[4,2],[-4,3],[5,-3]].forEach(([x,z])=>pend(x,z));
// ===== LÓGICA =====
const hit=(x,z,y)=>{const a=x*x+z*z>104,b=px*px+pz*pz>104;if(a!=b&&y<.9)return true;return C.some(o=>y<o.h-.05&&M.abs(x-o.x)<o.w/2+.3&&M.abs(z-o.z)<o.d/2+.3)};
const gnd=(x,z,y)=>{let g=x*x+z*z<121?0:-99;for(const o of C)if(o.h<8&&o.h<=y+.3&&M.abs(x-o.x)<o.w/2+.3&&M.abs(z-o.z)<o.d/2+.3)g=M.max(g,o.h);return g};
                                                                 
