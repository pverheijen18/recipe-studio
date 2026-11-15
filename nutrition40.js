'use strict';
// General illustrative reference values, not NEVO data. Missing nutrients are null.
const N40=(()=>{
const labels=['kcal','Eiwit','Koolhydraten','Vet','Suikers','Verzadigd vet','Enkelvoudig onverzadigd','Meervoudig onverzadigd','Vezels','Zout'];
const key=s=>RS31.key(s).replace(/\s*\(ter garnering\)$/,'').replace(/\s+naar smaak$/,'').trim();
const table=new Map();
function add(names,m,piece=0,density=0,el=0,tl=0){for(const n of names.split(';'))table.set(key(n),{m,piece,density,el,tl,source:'Algemene schatting (niet gevalideerd etiket)'})}
// carbohydrate convention: available carbohydrates, excluding fibre. Approximate values only.
add('runderstoofvlees;riblappen;runderlappen;stoofvlees rund;beef stew meat',[180,20,0,11,0,4.5,4.8,.4,0,.16]);
add('kipfilet;kipfilet rauw;chicken breast',[110,23,0,2,0,.6,.6,.4,0,.13]);
add('kippendijfilet;kipdijfilet',[145,19,0,8,0,2.2,3,1.7,0,.2]);
add('bloem;tarwebloem;flour',[364,10,73,1,.3,.16,.1,.4,2.7,.01],0,.53,8,2.7);
add('ui;uien;rode ui;rode uien',[40,1.1,7.6,.1,4.2,.04,.01,.02,1.7,.01],100);
add("paprika;paprika's;paprikas;rode paprika;rode paprika's",[31,1,3.9,.3,3.9,.03,.003,.16,2.1,.01],150);
add('knoflook;teentje knoflook;teentjes knoflook',[149,6.4,31,.5,1,.09,.01,.25,2.1,.04],3);
add('tomatenpuree',[82,4.3,15,.5,12,.1,.07,.2,4,.15],0,1.06,16,5.3);
add('runderbouillon;bouillon bereid;kippenbouillon;groentebouillon',[7,.7,.4,.3,null,null,null,null,0,null],0,1);
add('paprikapoeder',[282,14,20,13,10,2.1,1.7,7.8,35,.17],0,0,6.9,2.3);
add('karwijzaad;karwij',[333,20,12,15,1, .6,7.1,3.3,38,.04],0,0,6.7,2.2);
add('oregano;gedroogde oregano;oregano gedroogd',[265,9,26,4,4,1.6,.7,1.4,42,.06],0,0,3,1);
add('marjoraan;gedroogde marjoraan',[271,13,21,7,4,.5,.9,4.4,40,.19],0,0,3,1);
add('chilivlokken;chili flakes',[318,12,29,17,10,3.3,2.8,8,27,.08],0,0,5.4,1.8);
add('zwarte peper;peper',[251,10,38,3, .6,1.4,.7,.7,25,.05],0,0,6.9,2.3);
add('dille;verse dille',[43,3.5,5,1.1,null,.06,.8,.1,2.1,.15],0,0,1.5,.5);
add('zout;salt',[0,0,0,0,0,0,0,0,0,100],0,1.2,18,6);
add('water',[0,0,0,0,0,0,0,0,0,0],0,1);
add('neutrale olie;olie;bakolie',[884,0,0,100,0,null,null,null,0,0],0,.92,13.8,4.6);
add('olijfolie',[884,0,0,100,0,14,73,10,0,0],0,.92,13.8,4.6);
add('zonnebloemolie',[884,0,0,100,0,10,20,66,0,0],0,.92,13.8,4.6);
add('roomboter;boter',[717,.9,.1,81,.1,51,21,3,0,null],0,.91,14,4.7);
add('ei;eieren',[143,13,.7,9.5,.4,3.1,3.7,1.9,0,.35],50);
add('appel;appels',[52,.3,11.4,.2,10.4,.03,.01,.05,2.4,0],150);
add('banaan;bananen',[89,1.1,20,.3,12.2,.11,.03,.07,2.6,0],120);
add('kaneel',[247,4,27,1.2,2.2,.35,.25,.07,53,.03],0,0,7.8,2.6);
add('suiker;kristalsuiker',[387,0,100,0,100,0,0,0,0,0],0,.85,12.8,4.3);
add('rijstpapier;rijstvellen;rijstvel',[345,5,80,1,null,null,null,null,null,null],8);
add('aardappel;aardappelen;krieltjes',[77,2,15,.1,.8,.03,.003,.04,2.2,.02],100);
add('zalm;zalmfilet',[208,20,0,13,0,3.1,3.8,3.9,0,.15]);
add('spinazie;verse spinazie',[23,2.9,1.4,.4,.4,.06,.01,.16,2.2,.2]);
add('cottage cheese',[98,11,3.4,4.3,2.7,1.7,1.2,.1,0,null]);
add('rijst;witte rijst;basmatirijst;basmati rijst',[356,7,79,.7,.1,.2,.2,.2,1,.01],0,.82);
add('gekookte rijst;rijst gekookt',[130,2.7,28,.3,.1,.08,.09,.07,.4,0]);
add('pasta;spaghetti;penne;macaroni',[350,12,70,1.5,3,.3,.2,.6,3,.01]);
add('gekookte pasta;pasta gekookt',[158,5.8,29,.9,.6,.18,.12,.33,1.8,.01]);
const valid=x=>typeof x==='number'&&Number.isFinite(x)&&x>=0;
function clean(v){if(!v||!Array.isArray(v.m))return null;const m=labels.map((_,i)=>valid(v.m[i])&&v.m[i]<=(i===0?1000:100)?v.m[i]:null);if(m[4]!=null&&m[2]!=null&&m[4]>m[2]+.1)return null;if(m[3]!=null&&[5,6,7].reduce((a,i)=>a+(m[i]??0),0)>m[3]+.3)return null;return {m,piece:valid(v.piece)&&v.piece<=100000?v.piece:0,density:valid(v.density)&&v.density<=10?v.density:0,el:valid(v.el)&&v.el<=100?v.el:0,tl:valid(v.tl)&&v.tl<=100?v.tl:0,source:String(v.source||'Eigen invoer').slice(0,150)}}
function cleanMap(o){return Object.fromEntries(Object.entries(o&&typeof o==='object'&&!Array.isArray(o)?o:{}).slice(0,3000).filter(([k])=>!['__proto__','prototype','constructor'].includes(k)).map(([k,v])=>[key(k).slice(0,200),clean(v)]).filter(([k,v])=>k&&v))}
function food(name,products={},over={}){let k=key(name),alt=k.replace(/^(?:verse?|biologische?)\s+/,'').replace(/\s+(?:fijngehakt|gesneden|in blokjes|in ringen|geraspt|geperst)$/,'');for(const a of [k,alt]){if(Object.hasOwn(over,a))return clean(over[a]);if(Object.hasOwn(products,a))return clean(products[a]);if(table.has(a))return table.get(a)}const f=RS31.food(k);return f?{...f,m:[...f.m,null,null,null,null,null,null],source:'Oude algemene tabel; aanvullende waarden onbekend'}:null}
function grams(q,u,f){if(!valid(q)||!f)return null;u=RS3.norm(u);u=({eetlepel:'el',eetlepels:'el',tbsp:'el',theelepel:'tl',theelepels:'tl',tsp:'tl',kilogram:'kg',milliliter:'ml',liter:'l',stuk:'stuks',teen:'tenen',teentje:'tenen',teentjes:'tenen'})[u]||u;if(u==='el'&&f.el)return [q*f.el,true];if(u==='tl'&&f.tl)return [q*f.tl,true];return RS3.weight(q,u,f)}
function calc(ing,p,products={},over={},steps=[]){const totals=labels.map(()=>0),missing=labels.map(()=>[]),details=[];let known=0;for(const [q,u,n] of ing){let f=food(n,products,over),w=grams(q,u,f);if(q===0){known++;details.push({name:n,grams:0,source:'Expliciet 0'});continue}if(!w||!f){missing.forEach((a,i)=>{if(!f||f.m[i]!==0)a.push(n)});details.push({name:n,grams:null,source:!f?'Product onbekend':'Hoeveelheid onbekend'});continue}if(f.m.slice(0,4).every(valid))known++;f.m.forEach((x,i)=>{if(valid(x))totals[i]+=x*w[0]/100;else missing[i].push(n)});details.push({name:n,grams:w[0],estimated:w[1],source:f.source})}const fats=RS31.fats(ing,steps.join('\n')).filter(x=>!ing.some(v=>/olie/.test(x)&&/olie/.test(key(v[2]))||/boter/.test(x)&&/boter/.test(key(v[2]))));for(const f of fats)missing.forEach(a=>a.push('Mogelijk ontbrekend bakvet: '+f));const m=totals.map((x,i)=>ing.length&&!missing[i].length?x:null);return {total:m,partial:totals,missing,details,known,estimated:details.filter(d=>d.estimated).map(d=>d.name),m:m.map(x=>x==null||!(p>0)?null:x/p),unknown:[...new Set(missing.slice(0,4).flat())],auto:true}}
return {labels,key,food,clean,cleanMap,grams,calc};})();
