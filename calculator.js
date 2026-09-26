/* tool-indice-de-capacidade-para-o-trabalho · ELUCENIA · https://github.com/Elucenia/tool-indice-de-capacidade-para-o-trabalho
   Copyright (c) 2026 ELUCENIA · Felipe Guedes (fgxdev.com). Licensed under the Apache License 2.0: keep this notice and the NOTICE file, and mark your changes.
   Standalone integration. Package metadata and rights: README.md. */
(function(root){'use strict';
function freeze(value){if(value&&typeof value==='object'){for(const item of Object.values(value))freeze(item);Object.freeze(value);}return value;}
const TOOL=freeze({"id":"indice-de-capacidade-para-o-trabalho","title":"Índice de Capacidade para o Trabalho (ICT)","fields":[["i1","1. Capacidade para o trabalho atual, comparada com a melhor de toda a sua vida (0 a 10)","sel",{"opts":{"0":"0 (incapaz de trabalhar)","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","10":"10 (a melhor de toda a vida)"}}],["natureza","2. Natureza do trabalho","radio",{"opts":{"f":"Principalmente físico","m":"Principalmente mental","a":"Físico e mental"}}],["i2f","2a. Capacidade atual em relação às exigências <strong>físicas</strong> do trabalho","sel",{"opts":{"1":"Muito baixa","2":"Baixa","3":"Moderada","4":"Boa","5":"Muito boa"}}],["i2m","2b. Capacidade atual em relação às exigências <strong>mentais</strong> do trabalho","sel",{"opts":{"1":"Muito baixa","2":"Baixa","3":"Moderada","4":"Boa","5":"Muito boa"}}],["i3","3. Número de doenças atuais com diagnóstico médico (lista do questionário)","sel",{"opts":{"1":"5 ou mais doenças","2":"4 doenças","3":"3 doenças","4":"2 doenças","5":"1 doença","7":"Nenhuma"}}],["i4","4. Perda estimada para o trabalho por causa de doenças","sel",{"opts":{"1":"Estou totalmente incapacitado para trabalhar","2":"Por causa da doença, só consigo trabalhar em tempo parcial","3":"Frequentemente preciso diminuir o ritmo ou mudar o método","4":"Algumas vezes preciso diminuir o ritmo ou mudar o método","5":"Consigo fazer o trabalho, mas ele me causa alguns sintomas","6":"Nenhum impedimento (ou não tenho doença)"}}],["i5","5. Faltas ao trabalho por doença nos últimos 12 meses","sel",{"opts":{"1":"De 100 a 365 dias","2":"De 25 a 99 dias","3":"De 10 a 24 dias","4":"Até 9 dias","5":"Nenhuma"}}],["i6","6. Acredita que, do ponto de vista da saúde, conseguirá fazer seu trabalho atual daqui a 2 anos?","radio",{"opts":{"1":"É improvável","4":"Não estou muito certo","7":"Bastante provável"}}],["i7a","7a. Recentemente, tem conseguido apreciar suas atividades diárias?","sel",{"opts":{"0":"Nunca","1":"Raramente","2":"Às vezes","3":"Quase sempre","4":"Sempre"}}],["i7b","7b. Recentemente, tem se sentido ativo(a) e alerta?","sel",{"opts":{"0":"Nunca","1":"Raramente","2":"Às vezes","3":"Quase sempre","4":"Sempre"}}],["i7c","7c. Recentemente, tem se sentido cheio(a) de esperança para o futuro?","sel",{"opts":{"0":"Nunca","1":"Raramente","2":"Às vezes","3":"Quase sempre","4":"Sempre"}}]],"config":null,"reviewStatus":"needs-review","clinicalValidation":"not-performed"});
const window={};
/* ELUCENIA arithmetic registry. No DOM access, storage, telemetry or network requests. */
(function(root){
  'use strict';
  const CALC={fn:Object.create(null)};
  const round=(n,d=1)=>Math.round(n*Math.pow(10,d))/Math.pow(10,d);
  const yes=v=>v===true||v==='1'||v===1;
  CALC.h={
    r1:round,
    br:(n,d=1)=>round(n,d).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d}),
    band:(n,bands)=>{for(const b of bands)if(n<b[0])return b[1];return bands[bands.length-1][1];},
    sum:(values,weights)=>Object.entries(weights).reduce((n,[key,w])=>n+(yes(values[key])?w:0),0),yes
  };
  CALC.def=(id,fn)=>{if(CALC.fn[id])throw Error('Duplicate calculator '+id);CALC.fn[id]=fn;};
  CALC.score=(cfg,values)=>{
    let score=0;
    for(const[name,type,weight]of cfg.fields){const v=values[name];if(type==='chk'){if(yes(v))score+=weight;}else if(type==='radio'||type==='sel'){const n=parseFloat(v);if(!Number.isNaN(n))score+=n;}}
    score=round(score,2);let band=cfg.bands[0];for(const b of cfg.bands)if(score>=b[0])band=b;
    return{main:[String(score).replace('.',','),cfg.unit||(Math.abs(score)===1?'ponto':'pontos')],label:cfg.label,level:band[1],verdict:band[2],note:band[3]||'',raw:{score}};
  };
  CALC.run=(id,values,cfg)=>{if(cfg&&cfg.bands)return CALC.score(cfg,values);if(!CALC.fn[id])return{error:'Calculadora indisponível.'};return CALC.fn[id](values);};
  root.CALC=CALC;if(typeof module!=='undefined')module.exports=CALC;
})(typeof window!=='undefined'?window:globalThis);

(function(a){'use strict';
var e=a.h;
var o=e.br;
a.def("indice-de-capacidade-para-o-trabalho",function(a){var e=+a.i2f,r=+a.i2m,i="f"===a.natureza?[1.5,.5]:"m"===a.natureza?[.5,1.5]:[1,1],t=e*i[0]+r*i[1],n=+a.i7a+ +a.i7b+ +a.i7c,s=n<=3?1:n<=6?2:n<=9?3:4,d=[+a.i1,t,+a.i3,+a.i4,+a.i5,+a.i6,s],l=d.reduce(function(a,e){return a+e},0),m=l<28?["Capacidade para o trabalho baixa","Objetivo: restaurar a capacidade para o trabalho","high"]:l<37?["Capacidade para o trabalho moderada","Objetivo: melhorar a capacidade para o trabalho","mid"]:l<44?["Capacidade para o trabalho boa","Objetivo: apoiar a capacidade para o trabalho","low"]:["Capacidade para o trabalho ótima","Objetivo: manter a capacidade para o trabalho","low"];return{main:[o(l,l%1?1:0),"de 49"],label:"Índice de Capacidade para o Trabalho",level:m[2],verdict:m[0]+". "+m[1],rows:["1. Capacidade atual comparada com a melhor de toda a vida","2. Capacidade em relação às exigências do trabalho","3. Doenças com diagnóstico médico","4. Perda estimada para o trabalho por doenças","5. Faltas por doença nos últimos 12 meses","6. Prognóstico próprio para daqui a 2 anos","7. Recursos mentais"].map(function(a,e){return[a,o(d[e],d[e]%1?1:0)]}),raw:{score:l,i2:t,i7:s}}});
})(window.CALC);
function calculate(input){
 if(!input||typeof input!=='object'||Array.isArray(input))return {error:'Informe um objeto com os campos da ferramenta.',code:'INVALID_INPUT'};
 const values=Object.create(null);
 for(const[name,,kind,o={}] of TOOL.fields){
  const v=Object.hasOwn(input,name)?input[name]:undefined;
  if(kind==='chk'){if(v!==undefined&&v!==null&&![true,false,1,0,'1','0'].includes(v))return {error:'Campo booleano inválido: '+name,field:name,code:'INVALID_INPUT'};values[name]=v===true||v===1||v==='1';continue;}
  const empty=v==null||(typeof v==='string'&&!v.trim());
  if(empty){if(!o.opt)return {error:'Campo obrigatório: '+name,field:name,code:'REQUIRED_FIELD'};values[name]=kind==='num'?null:'';continue;}
  if(kind==='num'){
   if(!['number','string'].includes(typeof v)||(typeof v==='string'&&!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(v.trim()))||!Number.isFinite(Number(v)))return {error:'Número inválido: '+name,field:name,code:'INVALID_INPUT'};
   const n=Number(v);if((Number.isFinite(o.min)&&n<o.min)||(Number.isFinite(o.max)&&n>o.max))return {error:'Valor fora do intervalo: '+name,field:name,code:'OUT_OF_RANGE'};
   values[name]=n;
  }else{if(!Object.hasOwn(o.opts||{},String(v)))return {error:'Opção inválida: '+name,field:name,code:'INVALID_OPTION'};values[name]=String(v);}
 }
 try{const r=window.CALC.run(TOOL.id,values,TOOL.config);if(r.error)return {error:String(r.error).replace(/<[^>]*>/g,''),code:'FORMULA_DOMAIN'};
  if(!Array.isArray(r.main)||r.main.some(v=>typeof v==='number'&&!Number.isFinite(v))||/\b(?:NaN|Infinity)\b/.test(String(r.main[0])))return {error:'Resultado não finito ou indisponível.',code:'INVALID_RESULT'};
  return {id:TOOL.id,main:r.main,label:r.label||TOOL.title,raw:r.raw||{},clinicalValidation:'not-performed'};
 }catch{return {error:'Confira os valores e o domínio da fórmula.',code:'FORMULA_DOMAIN'};}
}
const api=Object.freeze({metadata:TOOL,calculate});if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.EluceniaTool=api;
})(typeof globalThis!=='undefined'?globalThis:this);
