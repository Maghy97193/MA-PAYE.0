/* Daily facts are shared across months; premium qualification stays explicit. */
(function(root){
const round=n=>Math.round((n+Number.EPSILON)*100)/100;
const keys=['worked','absence','extra25','extra50','extra100','hc','meals'];
function number(v,label){if(v===''||v==null)return 0;const n=Number(String(v).replace(',','.'));if(!Number.isFinite(n)||n<0)throw Error(label+' : nombre positif attendu.');return n;}
function day(date){const d=new Date(date+'T12:00:00Z');if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(+d)||d.toISOString().slice(0,10)!==date)throw Error('Date invalide : '+date);return d;}
function iso(d){return d.toISOString().slice(0,10);}
function add(date,n){const d=day(date);d.setUTCDate(d.getUTCDate()+n);return iso(d);}
function dates(month){if(!/^\d{4}-\d{2}$/.test(month)||Number(month.slice(5))<1||Number(month.slice(5))>12)throw Error('Choisir un mois valide.');const first=month+'-01',last=iso(new Date(Date.UTC(Number(month.slice(0,4)),Number(month.slice(5)),0,12)));let start=add(first,-((day(first).getUTCDay()+6)%7)),end=add(last,6-((day(last).getUTCDay()+6)%7));let out=[];for(let d=start;d<=end;d=add(d,1))out.push(d);return out;}
function active(p,d){const end=p.actualEndDate||(p.contract==='CDD'?p.endDate:'');return(!p.startDate||d>=p.startDate)&&(!end||d<=end);}
function normalize(row={}){let r={};for(const k of keys)r[k]=round(number(row[k],k));if(r.worked+r.absence>24)throw Error('Travail et absence dépassent 24 h sur une journée.');if(r.extra25+r.extra50+r.extra100+r.hc>r.worked+.001)throw Error('Les heures majorées dépassent les heures travaillées.');if(r.meals>1||r.meals%1)throw Error('Paniers : 0 ou 1 par journée.');r.normal=round(r.worked-r.extra25-r.extra50-r.extra100-r.hc);return r;}
function summarize(month,p,rows){const total=()=>Object.fromEntries([...keys,'normal'].map(k=>[k,0]));const sum=total(),weeks=[],missing=[];for(const d of dates(month)){const week=add(d,-((day(d).getUTCDay()+6)%7));let w=weeks.find(x=>x.start===week);if(!w){w={start:week,end:add(week,6),all:total(),month:total()};weeks.push(w);}if(!active(p,d))continue;const row=rows[d];if(!row||row.worked===''||row.worked==null){missing.push(d);continue;}let n;try{n=normalize(row)}catch(e){throw Error(d+' : '+e.message)}for(const k of Object.keys(sum)){w.all[k]=round(w.all[k]+n[k]);if(d.startsWith(month)){w.month[k]=round(w.month[k]+n[k]);sum[k]=round(sum[k]+n[k]);}}}return{month,totals:sum,weeks,missing};}
function snapshot(month,p,rows){return JSON.stringify({month,person:{start:p.startDate,end:p.actualEndDate||p.endDate,contract:p.contract,workMode:p.workMode,weeklyHours:p.weeklyHours},rows:dates(month).map(d=>[d,rows[d]||null])});}
root.TimeTracking={round,keys,number,day,iso,add,dates,active,normalize,summarize,snapshot};if(typeof module!=='undefined')module.exports=root.TimeTracking;
})(typeof window==='undefined'?globalThis:window);
